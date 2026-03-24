from fastapi import FastAPI
from src.routes.auth import router as auth_router

app = FastAPI(title="API con Autenticación", version="1.0.0")

app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "API con Autenticación", "version": "1.0.0"}