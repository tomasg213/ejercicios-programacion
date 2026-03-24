from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from app.db import get_db
from app.router.tasks import get_current_user

router = APIRouter()


class TeamCreate(BaseModel):
    name: str


class TeamMemberAdd(BaseModel):
    user_email: str
    role: str = "member"


@router.get("/")
async def list_teams(db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    result = await db.execute(
        text("""SELECT t.id, t.name, t.created_at, u.name as owner 
                FROM teams t JOIN users u ON t.owner_id = u.id
                JOIN team_members tm ON t.id = tm.team_id WHERE tm.user_id = :user_id"""),
        {"user_id": user["id"]}
    )
    return [{"id": r[0], "name": r[1], "created_at": r[2], "owner": r[3]} for r in result.fetchall()]


@router.post("/")
async def create_team(team: TeamCreate, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    result = await db.execute(
        text("""INSERT INTO teams (name, owner_id) VALUES (:name, :owner_id) 
                RETURNING id, name, created_at"""),
        {"name": team.name, "owner_id": user["id"]}
    )
    await db.commit()
    row = result.fetchone()
    team_id = row[0]
    await db.execute(
        text("INSERT INTO team_members (team_id, user_id, role) VALUES (:team_id, :user_id, 'owner')"),
        {"team_id": team_id, "user_id": user["id"]}
    )
    await db.commit()
    return {"id": team_id, "name": row[1], "created_at": row[2]}


@router.get("/{team_id}/members")
async def get_members(team_id: str, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    result = await db.execute(
        text("""SELECT u.id, u.email, u.name, tm.role FROM users u 
                JOIN team_members tm ON u.id = tm.user_id WHERE tm.team_id = :team_id"""),
        {"team_id": team_id}
    )
    return [{"id": r[0], "email": r[1], "name": r[2], "role": r[3]} for r in result.fetchall()]


@router.post("/{team_id}/members")
async def add_member(team_id: str, member: TeamMemberAdd, db: AsyncSession = Depends(get_db), user: dict = Depends(get_current_user)):
    result = await db.execute(text("SELECT id FROM users WHERE email = :email"), {"email": member.user_email})
    row = result.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    user_id = row[0]
    await db.execute(
        text("INSERT INTO team_members (team_id, user_id, role) VALUES (:team_id, :user_id, :role)"),
        {"team_id": team_id, "user_id": user_id, "role": member.role}
    )
    await db.commit()
    return {"message": "Member added"}
