from typing import Optional
from pydantic import BaseModel, Field


class Operacion(BaseModel):
    operando1: float
    operando2: Optional[float] = None


class OperacionResponse(BaseModel):
    resultado: float