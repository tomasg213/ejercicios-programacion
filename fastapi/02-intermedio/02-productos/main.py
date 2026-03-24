from fastapi import FastAPI
from src.routes.productos import router as productos_router

app = FastAPI(title="API de Productos", version="1.0.0")

app.include_router(productos_router)


@app.get("/")
def root():
    return {"message": "API de Productos"}