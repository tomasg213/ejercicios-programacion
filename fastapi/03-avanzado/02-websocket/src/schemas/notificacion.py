from pydantic import BaseModel


class Notificacion(BaseModel):
    titulo: str
    mensaje: str
    tipo: str = "info"


class MensajeWebSocket(BaseModel):
    tipo: str
    contenido: dict
    timestamp: str
    room: str = "global"