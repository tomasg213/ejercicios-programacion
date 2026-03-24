from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, MessageCreate
from app.services import openai_service
from app.db import DB_PATH
import sqlite3
import uuid
import os

router = APIRouter()


def save_message(session_id: str, role: str, content: str, code_snippet: str = None):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO messages (session_id, role, content, code_snippet) VALUES (?, ?, ?, ?)",
        (session_id, role, content, code_snippet)
    )
    conn.commit()
    conn.close()


def get_history(session_id: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT role, content, code_snippet FROM messages WHERE session_id = ? ORDER BY timestamp",
        (session_id,)
    )
    messages = cursor.fetchall()
    conn.close()
    return [{"role": m[0], "content": m[1], "code_snippet": m[2]} for m in messages]


@router.post("/message")
async def chat_message(request: ChatRequest):
    session_id = request.session_id or str(uuid.uuid4())
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM sessions WHERE id = ?", (session_id,))
    if not cursor.fetchone():
        cursor.execute("INSERT INTO sessions (id) VALUES (?)", (session_id,))
        conn.commit()
    conn.close()
    
    user_message = request.message
    if request.code:
        user_message += f"\n\n```\n{request.code}\n```"
    
    save_message(session_id, "user", request.message, request.code)
    
    history = get_history(session_id)
    messages = [{"role": m["role"], "content": m["content"]} for m in history]
    messages.insert(0, {
        "role": "system",
        "content": "You are a helpful coding assistant. Help the user with programming questions, explain code, refactor, and generate tests."
    })
    
    try:
        response = await openai_service.chat(messages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    save_message(session_id, "assistant", response)
    
    return {"response": response, "session_id": session_id}


@router.get("/history/{session_id}")
async def get_chat_history(session_id: str):
    history = get_history(session_id)
    return {"messages": history}


@router.delete("/history/{session_id}")
async def clear_history(session_id: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM messages WHERE session_id = ?", (session_id,))
    conn.commit()
    conn.close()
    return {"message": "History cleared"}
