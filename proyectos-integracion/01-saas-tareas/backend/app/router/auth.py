from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db import get_db
from app.models.schemas import UserCreate, UserLogin, UserResponse, Token, TokenRefresh
from app.auth import hash_password, verify_password, create_access_token, create_refresh_token, decode_token

router = APIRouter()


@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(text("SELECT id FROM users WHERE email = :email"), {"email": user.email})
    if result.fetchone():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    password_hash = hash_password(user.password)
    result = await db.execute(
        text("""INSERT INTO users (email, password_hash, name) VALUES (:email, :password_hash, :name) 
                RETURNING id, email, name, avatar_url, created_at"""),
        {"email": user.email, "password_hash": password_hash, "name": user.name}
    )
    await db.commit()
    row = result.fetchone()
    return {"id": row[0], "email": row[1], "name": row[2], "avatar_url": row[3], "created_at": row[4]}


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(text("SELECT id, email, password_hash FROM users WHERE email = :email"), {"email": credentials.email})
    row = result.fetchone()
    if not row or not verify_password(credentials.password, row[2]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user_id = str(row[0])
    access_token = create_access_token({"sub": user_id})
    refresh_token = create_refresh_token({"sub": user_id})
    return {"access_token": access_token, "refresh_token": refresh_token}


@router.post("/refresh", response_model=Token)
async def refresh_token(token_data: TokenRefresh, db: AsyncSession = Depends(get_db)):
    try:
        payload = decode_token(token_data.refresh_token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user_id = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    access_token = create_access_token({"sub": user_id})
    new_refresh = create_refresh_token({"sub": user_id})
    return {"access_token": access_token, "refresh_token": new_refresh}


@router.post("/logout")
async def logout():
    return {"message": "Logged out"}
