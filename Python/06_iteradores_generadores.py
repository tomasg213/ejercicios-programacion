"""
Ejercicio 06: Iteradores, Generadores y el Protocolo de Iteración
===============================================================

ITERADORES VS GENERADORES
-------------------------
- Iterador: objeto con __iter__() y __next__()
- Generador: función que usa yield (crea iteradores automáticamente)
"""

"""
DESAFÍO 1: Crear un iterador básico (sin generadores)
---------------------------------------------------
Implementa un iterador que devuelva números primos indefinidamente.
"""

class PrimosIterator:
    def __init__(self):
        pass
    
    def __iter__(self):
        return self
    
    def __next__(self):
        pass


"""
DESAFÍO 2: Generador con estado
--------------------------------
Crea un generador de Fibonacci que pueda "reseteerse"
"""

def fibonacci_generator():
    """Generador infinito de Fibonacci"""
    pass


"""
DESAFÍO 3: Generador pipeline
-----------------------------
Encadena estos generadores para procesar datos:
1. genera_numeros(): números del 1 al infinito
2. filtra_pares(): filtra solo pares
3. eleva_cuadrado(): eleva al cuadrado
4. toma_primeros(n): toma solo los primeros n

Usa next() y un pipeline estilo Unix.
"""

def genera_numeros():
    n = 1
    while True:
        yield n
        n += 1


"""
DESAFÍO 4: yield from (delegación a subgeneradores)
---------------------------------------------------
Implementa un aplanador usando yield from:
"""

def flatten_gen(nested):
    """Aplana una estructura anidada arbitrariamente"""
    pass


"""
DESAFÍO 5: Expresiones generadoras
-----------------------------------
Sin crear variables intermedias, calcula:
- Suma de cuadrados de números pares del 1 al 100
- Producto de raíces cuadradas (use reduce)
"""

from functools import reduce


"""
DESAFÍO 6: Iterables infinitos
-------------------------------
Crea:
- cycle(iterable): repite un iterable infinitamente
- count(start, step): generador tipo range infinito
- repeat(elem, n=None): repite elem n veces o infinitamente
"""

def cycle(iterable):
    """Repite un iterable infinitamente"""
    pass


def count(start=0, step=1):
    """Generador infinito de números"""
    pass


"""
AVANZADO: Implementar range() desde cero
-----------------------------------------
Crea tu propia clase Rango que se comporte como range()
"""

class MiRange:
    pass


"""
PREGUNTAS DE REFLEXIÓN:
-----------------------
1. ¿Cuándo un generador consume menos memoria que una lista?
2. ¿Puedes "rebobinar" un generador? ¿Por qué?
3. ¿Qué es la evaluación perezosa (lazy evaluation)?
"""
