"""
Ejercicio 07: Context Managers y el Protocolo with
=================================================

¿POR QUÉ EXISTEN LOS CONTEXT MANAGERS?
--------------------------------------
Garantizan que los recursos se limpian correctamente, incluso si hay errores.
Python ofrece dos formas: clases con __enter__/__exit__ y @contextmanager.
"""

"""
DESAFÍO 1: Context manager con clase
------------------------------------
Implementa un Timer que mida el tiempo de ejecución:
"""

import time

class Timer:
    def __enter__(self):
        pass
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        pass


with Timer() as t:
    time.sleep(0.5)
    print(f"Tiempo transcurrido: {t.elapsed:.4f}s")


"""
DESAFÍO 2: Context manager con @contextmanager
----------------------------------------------
Implementa un archivo temporal que se elimine al salir:
"""

from contextlib import contextmanager
import tempfile
import os


@contextmanager
def temporary_file(mode='w+', encoding='utf-8'):
    """Crea archivo temporal, lo elimina al salir"""
    pass


"""
DESAFÍO 3: Nested contexts y redirect_stdout
---------------------------------------------
Usa redirect_stdout para capturar la salida de una función:
"""

from contextlib import redirect_stdout
from io import StringIO


def capture_output(func, *args):
    """Captura stdout de una función"""
    pass


"""
DESAFÍO 4: Gestor de transacciones
-----------------------------------
Implementa un sistema de transacciones que:
- Hace rollback automático si hay excepción
- Solo hace commit si todo va bien
"""

class Transaction:
    def __init__(self):
        self.operations = []
    
    def add_operation(self, op):
        pass
    
    def commit(self):
        pass
    
    def rollback(self):
        pass
    
    def __enter__(self):
        pass
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        pass


"""
AVANZADO: Implementar @contextmanager que soporte argumentos
----------------------------------------------------------
Crea @retry(max_attempts, delay) que reintente una función:
"""

from contextlib import contextmanager
import time


@contextmanager
def retry(max_attempts=3, delay=1):
    """Reintenta el bloque de código si falla"""
    pass


"""
PREGUNTA: ¿Puedes crear un context manager asíncrono?
---------------------------------------------------
Hint: __aenter__ y __aexit__
"""
