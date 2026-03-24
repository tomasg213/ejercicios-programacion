from fastapi import APIRouter
from ..services.async_service import AsyncService
from ..repositories.mensaje import mensaje_repo

router = APIRouter(prefix="/stats", tags=["estadísticas"])


@router.get("/mensajes", response_model=dict)
async def obtener_estadisticas():
    await AsyncService.simulate_delay()
    stats = mensaje_repo.get_stats()
    return {"success": True, "data": stats}