"""
Ejercicio 04: Funciones - Scope, Closures y Decoradores
=======================================================

FUNCIONES COMO CIUDADANOS DE PRIMERA CLASE
------------------------------------------
En Python, las funciones son objetos. Puedes:
- Asignarlas a variables
- Pasarlas como argumentos
- Devolverlas desde otras funciones
"""

def aplicar_funcion(fn, valor):
    """Ejemplo: pasando función como argumento"""
    return fn(valor)


"""
DESAFÍO 1: Entender el scope (LEGB)
------------------------------------
Predice qué valor imprimirá cada print antes de ejecutar:
"""

x = "global"

def nivel_externo():
    x = "externo"
    
    def nivel_interno():
        x = "interno"
        print(x)  # 1: ?
    
    nivel_interno()
    print(x)  # 2: ?

print(x)  # 3: ?


"""
DESAFÍO 2: Closure - Función que recuerda su entorno
----------------------------------------------------
Completa esta función factory para que cada contador sea independiente.
"""

def contador_factory(inicio=0):
    """Crea contadores independientes"""
    pass


"""
DESAFÍO 3: Decorador sin argumentos
-----------------------------------
Implementa un decorador @registrar que imprima:
"Ejecutando [nombre_funcion]" antes y después.
"""

def registrar(funcion):
    """Decorador que registra ejecuciones"""
    pass


@registrar
def saludar(nombre):
    print(f"Hola, {nombre}!")


"""
DESAFÍO 4: Decorador con argumentos
------------------------------------
Crea un decorador @repetir(n) que ejecute la función n veces.
"""

def repetir(veces):
    """Decorador que repite la función n veces"""
    pass


@repetir(3)
def decir_buenos_dias():
    print("¡Buenos días!")


"""
DESAFÍO 5: Decorador para caching/memozation
---------------------------------------------
Implementa un decorador @memoize que guarde resultados previos.
"""

def memoize(funcion):
    """Cache de resultados para funciones con argumentos hashables"""
    pass


@memoize
def fibonacci_lento(n):
    print(f"Calculando fib({n})...")
    if n < 2:
        return n
    return fibonacci_lento(n-1) + fibonacci_lento(n-2)


"""
AVANZADO: Decorador de timing
-----------------------------
Mide el tiempo de ejecución de cualquier función.
"""

import time

def tiempo_ejecucion(funcion):
    """Muestra cuánto tardó la función"""
    pass


"""
PREGUNTAS DE REFLEXIÓN:
-----------------------
1. ¿Cuál es la diferencia entre *args y **kwargs?
2. ¿Cuándo usarías closures en lugar de clases?
3. ¿Cómo encadenas múltiples decoradores? ¿En qué orden se aplican?
"""
