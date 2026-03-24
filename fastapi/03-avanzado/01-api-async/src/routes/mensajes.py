from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from .schemas.mensaje import MensajeCreate
from .repositories.mensaje import mensaje_repo
from .services.async_service import AsyncService

router = APIRouter(prefix="/mensajes", tags=["mensajes"])


@router.get("", response_model=dict)
async def listar_mensajes(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    destinatario: Optional[str] = None,
    leido: Optional[bool] = None
):
    await AsyncService.simulate_delay()
    
    mensajes, total = mensaje_repo.get_all(skip, limit, destinatario, leido)
    
    return {
        "success": True,
        "data": mensajes,
        "pagination": {
            "total": total,
            "skip": skip,
            "limit": limit,
            "has_more": skip + limit < total
        }
    }


@router.post("", response_model=dict, status_code=201)
async def crear_mensaje(mensaje: MensajeCreate):
    await AsyncService.simulate_delay()
    nuevo_mensaje = mensaje_repo.create(mensaje)
    return {"success": True, "data": nuevo_mensaje}


@router.get("/{id}", response_model=dict)
async def obtener_mensaje(id: int):
    await AsyncService.simulate_delay()
    mensaje = mensaje_repo.get_by_id(id)
    if not mensaje:
        raise HTTPException(status_code=404, detail="Mensaje no encontrado")
    return {"success": True, "data": mensaje}


@router.put("/{id}/leer", response_model=dict)
async def marcar_leido(id: int):
    await AsyncService.simulate_delay()
    mensaje = mensaje_repo.mark_as_read(id)
    if not mensaje:
        raise HTTPException(status_code=404, detail="Mensaje no encontrado")
    return {"success": True, "data": mensaje}


@router.get("/usuario/{username}", response_model=dict)
async def obtener_conversacion(username: str):
    await AsyncService.simulate_delay()
    conversacion = mensaje_repo.get_conversation(username)
    return {"success": True, "data": conversacion, "total": len(conversacion)}