from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from app.db import get_db
from app.auth import decode_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()
security = HTTPBearer()


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: AsyncSession = Depends(get_db)):
    try:
        payload = decode_token(credentials.credentials)
        user_id = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    result = await db.execute(text("SELECT id, email, name FROM users WHERE id = :id"), {"id": user_id})
    row = result.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": row[0], "email": row[1], "name": row[2]}


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    column_id: UUID
    priority: str = "medium"
    assignee_id: Optional[UUID] = None
    due_date: Optional[str] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    assignee_id: Optional[UUID] = None
    due_date: Optional[str] = None


class TaskMove(BaseModel):
    column_id: UUID
    position: int = 0


@router.get("/")
async def list_tasks(board_id: Optional[UUID] = None, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    query = """
        SELECT t.id, t.title, t.description, t.priority, t.due_date, t.created_at,
               c.id as column_id, c.name as column_name, u.name as assignee
        FROM tasks t
        JOIN columns c ON t.column_id = c.id
        LEFT JOIN users u ON t.assignee_id = u.id
    """
    if board_id:
        query += f" WHERE c.board_id = :board_id"
    result = await db.execute(text(query), {"board_id": str(board_id) if board_id else None})
    return [{"id": r[0], "title": r[1], "description": r[2], "priority": r[3], "due_date": r[4], 
             "created_at": r[5], "column_id": r[6], "column_name": r[7], "assignee": r[8]} for r in result.fetchall()]


@router.post("/")
async def create_task(task: TaskCreate, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    result = await db.execute(
        text("""INSERT INTO tasks (title, description, column_id, priority, assignee_id, due_date) 
                VALUES (:title, :description, :column_id, :priority, :assignee_id, :due_date)
                RETURNING id, title, description, priority, created_at"""),
        {"title": task.title, "description": task.description, "column_id": str(task.column_id),
         "priority": task.priority, "assignee_id": str(task.assignee_id) if task.assignee_id else None, "due_date": task.due_date}
    )
    await db.commit()
    row = result.fetchone()
    return {"id": row[0], "title": row[1], "description": row[2], "priority": row[3], "created_at": row[4]}


@router.put("/{task_id}")
async def update_task(task_id: str, task: TaskUpdate, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    updates = {}
    if task.title: updates["title"] = task.title
    if task.description is not None: updates["description"] = task.description
    if task.priority: updates["priority"] = task.priority
    if task.assignee_id: updates["assignee_id"] = str(task.assignee_id)
    if task.due_date is not None: updates["due_date"] = task.due_date
    
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    set_clause = ", ".join([f"{k} = :{k}" for k in updates.keys()])
    updates["id"] = task_id
    await db.execute(text(f"UPDATE tasks SET {set_clause} WHERE id = :id"), updates)
    await db.commit()
    return {"message": "Task updated"}


@router.delete("/{task_id}")
async def delete_task(task_id: str, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    await db.execute(text("DELETE FROM tasks WHERE id = :id"), {"id": task_id})
    await db.commit()
    return {"message": "Task deleted"}


@router.patch("/{task_id}/move")
async def move_task(task_id: str, move: TaskMove, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    await db.execute(
        text("UPDATE tasks SET column_id = :column_id WHERE id = :id"),
        {"column_id": str(move.column_id), "id": task_id}
    )
    await db.commit()
    return {"message": "Task moved"}
