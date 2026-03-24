from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from pydantic import BaseModel
from uuid import UUID
from app.db import get_db
from app.router.tasks import get_current_user
from openai import AsyncOpenAI
import os

router = APIRouter()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class SuggestionRequest(BaseModel):
    board_id: UUID
    context: str = ""


class SummaryRequest(BaseModel):
    board_id: UUID


@router.post("/suggest-tasks")
async def suggest_tasks(request: SuggestionRequest, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    result = await db.execute(
        text("""SELECT t.title, t.description, c.name as column_name FROM tasks t 
                JOIN columns c ON t.column_id = c.id WHERE c.board_id = :board_id"""),
        {"board_id": str(request.board_id)}
    )
    tasks = result.fetchall()
    
    task_list = "\n".join([f"- {t[0]}: {t[1]} ({t[2]})" for t in tasks]) if tasks else "No hay tareas"
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Eres un asistente de gestión de proyectos. Basándote en las tareas existentes, sugiere nuevas tareas que podrían ser útiles para completar el proyecto."},
                {"role": "user", "content": f"Tareas actuales:\n{task_list}\n\nContexto adicional: {request.context}\n\nSugiere 3-5 tareas nuevas:"}
            ],
            max_tokens=500
        )
        suggestions = response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI error: {str(e)}")
    
    return {"suggestions": suggestions}


@router.post("/summarize-board")
async def summarize_board(request: SummaryRequest, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    result = await db.execute(
        text("""SELECT t.title, t.description, t.priority, t.due_date, c.name as column_name, u.name as assignee
                FROM tasks t JOIN columns c ON t.column_id = c.id
                LEFT JOIN users u ON t.assignee_id = u.id WHERE c.board_id = :board_id"""),
        {"board_id": str(request.board_id)}
    )
    tasks = result.fetchall()
    
    task_list = "\n".join([f"- {t[0]} ({t[4] or 'Sin asignar'}): {t[1] or 'Sin descripción'} - Prioridad: {t[2]}" for t in tasks]) if tasks else "No hay tareas"
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Eres un asistente de gestión de proyectos. Resume el progreso del tablero y sugiere próximos pasos."},
                {"role": "user", "content": f"Estado actual del tablero:\n{task_list}\n\nGenera un resumen ejecutivo:"}
            ],
            max_tokens=500
        )
        summary = response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI error: {str(e)}")
    
    return {"summary": summary}
