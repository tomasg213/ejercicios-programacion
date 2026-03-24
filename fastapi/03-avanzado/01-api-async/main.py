from fastapi import FastAPI
from src.routes.mensajes import router as mensajes_router
from src.routes.stats import router as stats_router

app = FastAPI(title="API Async Completa", version="1.0.0")

app.include_router(mensajes_router)
app.include_router(stats_router)


@app.get("/")
async def root():
    return {"message": "API Async Completa", "version": "1.0.0"}