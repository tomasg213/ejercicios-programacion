"""
Ejercicio 08: Manejo de Errores y Excepciones
============================================

EXCEPCIONES COMO FLUJO DE CONTROL
---------------------------------
En Python, las excepciones NO son solo para errores. Son parte del flujo normal.
"""

"""
DESAFÍO 1: Exception Hierarchy
------------------------------
Ejecuta esto y observa la jerarquía:
"""

def explorar_excepciones():
    print("Base:", BaseException.__bases__)
    print("Exception:", Exception.__bases__)
    
    builtins_exceptions = [name for name in dir(__builtins__) 
                          if 'Error' in name or 'Exception' in name]
    print("\nExcepciones comunes:", builtins_exceptions[:15])


"""
DESAFÍO 2: Captura específica vs genérica
------------------------------------------
¿Qué está mal en este código?
"""

def capturar_mal():
    try:
        resultado = 10 / 0
    except Exception:
        print("Ocurrió un error")


"""
DESAFÍO 3: El bloque else
-------------------------
Explica cuándo se ejecuta else en un try/except/else/finally
"""

def try_else_finally():
    try:
        x = [1, 2, 3]
        y = x[5]  # IndexError
    except IndexError:
        print("IndexError capturado")
    else:
        print("else: se ejecuta si NO hubo excepción")
    finally:
        print("finally: siempre se ejecuta")
    
    return "Flujo completado"


"""
DESAFÍO 4: Crear excepciones personalizadas
-------------------------------------------
Implementa un sistema de validación con excepciones propias:
"""

class ValidationError(Exception):
    """Error de validación base"""
    pass

class InvalidEmailError(ValidationError):
    pass

class InvalidAgeError(ValidationError):
    pass


def validate_user(name, email, age):
    """Valida datos de usuario, lanza excepciones apropiadas"""
    pass


"""
DESAFÍO 5: traceback y re-raise
--------------------------------
Captura una excepción, regístrala, y vuelve a lanzarla:
"""

import traceback

def log_and_reraise():
    """Captura, registra, y vuelve a lanzar"""
    pass


"""
DESAFÍO 6: Suppress exceptions (contextlib)
--------------------------------------------
Usa suppress para ignorar selectivamente:
"""

from contextlib import suppress

def suppress_specific():
    """Solo suprime FileNotFoundError"""
    pass


"""
AVANZADO: Excepciones encadenadas
----------------------------------
¿Para qué sirve __cause__ y __context__?
"""

def chained_exception():
    try:
        try:
            raise ValueError("Error interno")
        except ValueError as e:
            raise TypeError("Error externo") from e
    except TypeError as te:
        print(f"Exception: {te}")
        print(f"Causa explícita: {te.__cause__}")
        print(f"Contexto implícito: {te.__context__}")


"""
PREGUNTAS DE REFLEXIÓN:
-----------------------
1. ¿Cuándo usar excepciones vs return codes/None?
2. ¿Por qué no捕获 BaseException?
3. ¿Qué es el "antipattern EAFP" vs "LBYL"?
"""
