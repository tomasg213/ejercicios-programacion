from fastapi import FastAPI
from src.routes.operaciones import router as calculadora_router

app = FastAPI(title="Calculadora API", version="1.0.0")

app.include_router(calculadora_router)


@app.get("/")
def root():
    return {"message": "Calculadora API", "operaciones": ["suma", "resta", "multiplicacion", "division", "potencia", "raiz"]}