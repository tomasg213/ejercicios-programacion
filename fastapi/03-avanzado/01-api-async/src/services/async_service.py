import asyncio


class AsyncService:
    @staticmethod
    async def simulate_delay(seconds: float = 0.5):
        await asyncio.sleep(seconds)
        return True
    
    @staticmethod
    async def fetch_external_data(url: str) -> dict:
        await asyncio.sleep(0.3)
        return {"data": f"External data from {url}", "status": "success"}
    
    @staticmethod
    async def process_in_background(task_id: str) -> dict:
        await asyncio.sleep(1)
        return {"task_id": task_id, "status": "completed"}