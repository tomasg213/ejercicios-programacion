from fastapi import APIRouter, HTTPException
from ..schemas.operacion import Operacion
from ..services.calculadora import CalculadoraService

router = APIRouter(prefix="/calculadora", tags=["calculadora"])


@router.post("/suma")
def suma(op: Operacion):
    return {"resultado": CalculadoraService.suma(op)}


@router.post("/resta")
def resta(op: Operacion):
    return {"resultado": CalculadoraService.resta(op)}


@router.post("/multiplicacion")
def multiplicacion(op: Operacion):
    return {"resultado": CalculadoraService.multiplicacion(op)}


@router.post("/division")
def division(op: Operacion):
    try:
        return {"resultado": CalculadoraService.division(op)}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/potencia")
def potencia(op: Operacion):
    return {"resultado": CalculadoraService.potencia(op)}


@router.post("/raiz")
def raiz(op: Operacion):
    try:
        return {"resultado": CalculadoraService.raiz(op)}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/calcular")
def calcular(operacion: str, op: Operacion):
    try:
        resultado = CalculadoraService.calcular(operacion, op)
        return {"operacion": operacion, "operandos": op.model_dump(), "resultado": resultado}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))