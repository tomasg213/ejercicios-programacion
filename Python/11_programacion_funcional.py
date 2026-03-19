"""
Ejercicio 11: Programación Funcional en Python
=============================================

Python soporta paradigmas funcionales:
- First-class functions
- Higher-order functions
- map, filter, reduce
- Lambda expressions
- Partial application
"""

"""
DESAFÍO 1: map, filter, reduce
-------------------------------
Resuelve estos problemas SIN list comprehensions:
"""

from functools import reduce

def functional_transformations():
    numeros = list(range(1, 21))
    
    # Filtrar solo pares
    pares = list(filter(lambda x: x % 2 == 0, numeros))
    
    # Elevar al cuadrado
    cuadrados = list(map(lambda x: x**2, pares))
    
    # Sumar todos
    suma_total = reduce(lambda acc, x: acc + x, cuadrados, 0)
    
    return pares, cuadrados, suma_total


"""
DESAFÍO 2: Partial application
------------------------------
Crea una función parcialmente aplicada:
"""

from functools import partial

def power(base, exponent):
    return base ** exponent

# Crea una función "square" a partir de power


"""
DESAFÍO 3: Compose (composición de funciones)
----------------------------------------------
Implementa compose que encadene funciones de derecha a izquierda:
compose(f, g, h)(x) = f(g(h(x)))
"""

def compose(*funcs):
    """Compose múltiples funciones"""
    pass


"""
DESAFÍO 4: Currying
-------------------
Convierte una función normal a forma currificada:
"""

def currying(func):
    """Convierte f(a, b, c) a f(a)(b)(c)"""
    pass


"""
DESAFÍO 5: Pipeline operator
-----------------------------
Implementa | para pipe:
3 |> doble |> sumar(5) |> cuadrado  => (3*2 + 5)**2 = 121
"""

class Pipe:
    def __init__(self, value):
        self.value = value
    
    def __ror__(self, func):
        return func(self.value)


"""
DESAFÍO 6: Functools advanced
-----------------------------
Usa lru_cache, singledispatch, reduce para:
"""

from functools import lru_cache, singledispatch, reduce

# Cachear la función fibonacci
@lru_cache(maxsize=None)
def fib_cache(n):
    if n < 2:
        return n
    return fib_cache(n-1) + fib_cache(n-2)


# Dispatching por tipo
@singledispatch
def process(x):
    print(f"Tipo desconocido: {type(x)}")

@process.register(int)
def _(x):
    print(f"Entero: {x * 2}")

@process.register(str)
def _(x):
    print(f"String: {x.upper()}")


"""
AVANZADO: Monads en Python
--------------------------
Implementa Maybe monad para manejo seguro de None:
"""

class Maybe:
    def __init__(self, value):
        self._value = value
    
    @classmethod
    def unit(cls, value):
        return cls(value)
    
    def bind(self, func):
        if self._value is None:
            return self
        return Maybe(func(self._value))
    
    def __repr__(self):
        return f"Just({self._value})" if self._value else "Nothing"


def safe_divide(a, b):
    if b == 0:
        return Maybe(None)
    return Maybe(a / b)


"""
EJEMPLO: Encadenamiento seguro
------------------------------
result = Maybe(10) \
    .bind(lambda x: safe_divide(x, 2)) \
    .bind(lambda x: safe_divide(x, 0)) \
    .bind(lambda x: safe_divide(x, 5))
print(result)  # Nothing (por el division por cero)
"""


"""
PREGUNTAS DE REFLEXIÓN:
-----------------------
1. ¿Cuándo es preferible programación funcional sobre OOP?
2. ¿Qué ventajas tiene compose sobre anidamiento de funciones?
3. ¿Por qué se considera "pythonic" evitar lambda en código real?
"""
