from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime


class MensajeBase(BaseModel):
    remitente: str
    destinatario: str
    contenido: str
    leido: bool = False


class MensajeCreate(MensajeBase):
    pass


class Mensaje(MensajeBase):
    id: int
    timestamp: Optional[datetime] = None

    class Config:
        from_attributes = True