import asyncio
from datetime import datetime


class NotificationService:
    @staticmethod
    async def process_notification(notificacion: dict):
        await asyncio.sleep(2)
        print(f"Procesada notificación: {notificacion}")
        return {
            "status": "processed",
            "notificacion": notificacion,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    @staticmethod
    async def send_notification(notificacion: dict, manager):
        await manager.broadcast({
            "type": "notification",
            "content": notificacion,
            "timestamp": datetime.utcnow().isoformat()
        })