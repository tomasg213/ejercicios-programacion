from typing import Optional
from ..schemas.operacion import Operacion


class CalculadoraService:
    @staticmethod
    def suma(op: Operacion) -> float:
        return op.operando1 + (op.operando2 or 0)

    @staticmethod
    def resta(op: Operacion) -> float:
        return op.operando1 - (op.operando2 or 0)

    @staticmethod
    def multiplicacion(op: Operacion) -> float:
        return op.operando1 * (op.operando2 or 1)

    @staticmethod
    def division(op: Operacion) -> Optional[float]:
        if op.operando2 == 0:
            raise ValueError("No se puede dividir por cero")
        return op.operando1 / op.operando2

    @staticmethod
    def potencia(op: Operacion) -> float:
        return op.operando1 ** (op.operando2 or 2)

    @staticmethod
    def raiz(op: Operacion) -> Optional[float]:
        if op.operando1 < 0:
            raise ValueError("No se puede calcular raíz de número negativo")
        return op.operando1 ** 0.5

    @staticmethod
    def calcular(operacion: str, op: Operacion) -> float:
        operations = {
            "suma": CalculadoraService.suma,
            "resta": CalculadoraService.resta,
            "multiplicacion": CalculadoraService.multiplicacion,
            "division": CalculadoraService.division,
            "potencia": CalculadoraService.potencia,
            "raiz": CalculadoraService.raiz,
        }
        
        if operacion not in operations:
            raise ValueError("Operación no válida")
        
        return operations[operacion](op)