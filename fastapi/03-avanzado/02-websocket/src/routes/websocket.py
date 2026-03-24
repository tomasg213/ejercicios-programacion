from fastapi import APIRouter, WebSocket, WebSocketDisconnect, BackgroundTasks
from datetime import datetime
import json
from ..managers.connection import manager
from ..schemas.notificacion import Notificacion
from ..services.notification import NotificationService

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            await manager.broadcast({
                "type": "message",
                "content": message,
                "timestamp": datetime.utcnow().isoformat()
            })
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({
            "type": "disconnect",
            "content": "Cliente desconectado",
            "timestamp": datetime.utcnow().isoformat()
        })


@router.post("/notificar", status_code=202)
async def notificar(notificacion: Notificacion, background_tasks: BackgroundTasks):
    background_tasks.add_task(NotificationService.process_notification, notificacion.model_dump())
    
    await manager.broadcast({
        "type": "notification",
        "content": notificacion.model_dump(),
        "timestamp": datetime.utcnow().isoformat()
    })
    
    return {"success": True, "message": "Notificación enviada"}


@router.get("/conexiones")
async def obtener_conexiones():
    return {"active_connections": manager.count}