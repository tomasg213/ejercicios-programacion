from sqlalchemy.ext.asyncio import create_async_engine, AsyncConnection
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from sqlalchemy import MetaData
from sqlalchemy.sql import text
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://app:secret@db:5432/app")

engine = create_async_engine(DATABASE_URL, poolclass=NullPool, echo=False)
async_session = sessionmaker(engine, class_=AsyncConnection, expire_on_commit=False)
metadata = MetaData()


async def connect():
    async with engine.begin() as conn:
        await conn.execute(text("""
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                name VARCHAR(100),
                avatar_url TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            );
            
            CREATE TABLE IF NOT EXISTS teams (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(100) NOT NULL,
                owner_id UUID REFERENCES users(id),
                created_at TIMESTAMP DEFAULT NOW()
            );
            
            CREATE TABLE IF NOT EXISTS team_members (
                team_id UUID REFERENCES teams(id),
                user_id UUID REFERENCES users(id),
                role VARCHAR(20) DEFAULT 'member',
                PRIMARY KEY (team_id, user_id)
            );
            
            CREATE TABLE IF NOT EXISTS boards (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                team_id UUID REFERENCES teams(id),
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
            
            CREATE TABLE IF NOT EXISTS columns (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                board_id UUID REFERENCES boards(id),
                name VARCHAR(50) NOT NULL,
                position INTEGER DEFAULT 0
            );
            
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                column_id UUID REFERENCES columns(id),
                title VARCHAR(255) NOT NULL,
                description TEXT,
                assignee_id UUID REFERENCES users(id),
                priority VARCHAR(20) DEFAULT 'medium',
                due_date TIMESTAMP,
                created_at TIMESTAMP DEFAULT NOW()
            );
        """))


async def disconnect():
    await engine.dispose()


async def get_db():
    async with async_session() as session:
        yield session
