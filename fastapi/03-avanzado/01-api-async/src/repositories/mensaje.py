from typing import Optional, List
from datetime import datetime
from .schemas.mensaje import Mensaje, MensajeCreate


class MensajeRepository:
    def __init__(self):
        self.db: List[Mensaje] = []
        self.next_id = 1

    def get_all(self, skip: int = 0, limit: int = 10, 
                destinatario: str = None, leido: bool = None) -> tuple[List[Mensaje], int]:
        result = self.db.copy()
        
        if destinatario:
            result = [m for m in result if m.destinatario == destinatario]
        if leido is not None:
            result = [m for m in result if m.leido == leido]
        
        total = len(result)
        paginated = result[skip:skip + limit]
        
        return paginated, total

    def get_by_id(self, id: int) -> Optional[Mensaje]:
        for mensaje in self.db:
            if mensaje.id == id:
                return mensaje
        return None

    def create(self, mensaje_data: MensajeCreate) -> Mensaje:
        mensaje = Mensaje(id=self.next_id, **mensaje_data.model_dump(), timestamp=datetime.utcnow())
        self.db.append(mensaje)
        self.next_id += 1
        return mensaje

    def mark_as_read(self, id: int) -> Optional[Mensaje]:
        mensaje = self.get_by_id(id)
        if mensaje:
            mensaje.leido = True
        return mensaje

    def get_conversation(self, username: str) -> List[Mensaje]:
        conversation = [m for m in self.db if m.remitente == username or m.destinatario == username]
        conversation.sort(key=lambda x: x.timestamp or datetime.min)
        return conversation

    def get_stats(self) -> dict:
        total = len(self.db)
        leidos = len([m for m in self.db if m.leido])
        sin_leer = total - leidos
        return {
            "total": total,
            "leidos": leidos,
            "sin_leer": sin_leer,
            "porcentaje_leido": round((leidos / total * 100) if total > 0 else 0, 2)
        }


mensaje_repo = MensajeRepository()