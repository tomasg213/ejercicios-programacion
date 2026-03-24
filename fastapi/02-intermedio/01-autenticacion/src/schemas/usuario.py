from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UsuarioBase(BaseModel):
    email: EmailStr
    nombre: str
    rol: str = "user"


class UsuarioCreate(BaseModel):
    email: EmailStr
    nombre: str
    password: str
    rol: str = "user"


class UsuarioResponse(BaseModel):
    email: EmailStr
    nombre: str
    rol: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str