from fastapi import FastAPI
from src.routes import tareas_router

app = FastAPI(title="API de Tareas", version="1.0.0")

app.include_router(tareas_router)


@app.get("/")
def root():
    return {"message": "API de Tareas", "version": "1.0.0"}