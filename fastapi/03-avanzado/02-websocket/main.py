from fastapi import FastAPI
from src.routes.websocket import router as websocket_router

app = FastAPI(title="API con WebSockets", version="1.0.0")

app.include_router(websocket_router)


@app.get("/")
def root():
    return {"message": "API con WebSockets"}