from fastapi import APIRouter, HTTPException
from typing import Optional
from ..schemas.tarea import Tarea, TareaCreate, TareaUpdate
from ..models.tarea import tarea_repo

router = APIRouter(prefix="/tareas", tags=["tareas"])


@router.get("", response_model=dict)
def listar_tareas(completada: Optional[bool] = None, prioridad: Optional[str] = None):
    tareas = tarea_repo.get_all(completada, prioridad)
    return {"success": True, "data": tareas}


@router.get("/{id}", response_model=dict)
def obtener_tarea(id: int):
    tarea = tarea_repo.get_by_id(id)
    if not tarea:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"success": True, "data": tarea}


@router.post("", response_model=dict, status_code=201)
def crear_tarea(tarea: TareaCreate):
    nueva_tarea = tarea_repo.create(tarea)
    return {"success": True, "data": nueva_tarea}


@router.put("/{id}", response_model=dict)
def actualizar_tarea(id: int, tarea: TareaUpdate):
    tarea_actualizada = tarea_repo.update(id, tarea)
    if not tarea_actualizada:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"success": True, "data": tarea_actualizada}


@router.delete("/{id}", response_model=dict)
def eliminar_tarea(id: int):
    if not tarea_repo.delete(id):
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"success": True, "message": "Tarea eliminada"}