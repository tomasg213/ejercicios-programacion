from typing import Optional
from pydantic import BaseModel, Field


class TareaBase(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=100)
    descripcion: Optional[str] = None
    prioridad: str = "media"


class TareaCreate(TareaBase):
    pass


class TareaUpdate(BaseModel):
    titulo: Optional[str] = Field(None, min_length=1, max_length=100)
    descripcion: Optional[str] = None
    completada: Optional[bool] = None
    prioridad: Optional[str] = None


class Tarea(TareaBase):
    id: int
    completada: bool = False

    class Config:
        from_attributes = True