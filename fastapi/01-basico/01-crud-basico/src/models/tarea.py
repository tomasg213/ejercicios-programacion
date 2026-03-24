from typing import Dict
from .schemas.tarea import Tarea, TareaCreate, TareaUpdate


class TareaRepository:
    def __init__(self):
        self.db: Dict[int, Tarea] = {}
        self.next_id = 1

    def get_all(self, completada: bool = None, prioridad: str = None):
        result = list(self.db.values())
        if completada is not None:
            result = [t for t in result if t.completada == completada]
        if prioridad:
            result = [t for t in result if t.prioridad == prioridad]
        return result

    def get_by_id(self, id: int):
        return self.db.get(id)

    def create(self, tarea_data: TareaCreate) -> Tarea:
        tarea = Tarea(id=self.next_id, **tarea_data.model_dump())
        self.db[self.next_id] = tarea
        self.next_id += 1
        return tarea

    def update(self, id: int, tarea_data: TareaUpdate) -> Tarea:
        existing = self.db.get(id)
        if not existing:
            return None
        
        update_data = tarea_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(existing, key, value)
        return existing

    def delete(self, id: int) -> bool:
        if id in self.db:
            del self.db[id]
            return True
        return False


tarea_repo = TareaRepository()