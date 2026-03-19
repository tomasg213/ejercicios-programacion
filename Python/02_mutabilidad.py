"""
Ejercicio 02: Mutabilidad y el problema del aliasing
====================================================

En Python:
- Objetos mutables: list, dict, set, bytearray, objetos personalizados
- Objetos inmutables: int, float, str, tuple, frozenset, bytes

¡El aliasing ocurre cuando dos variables apuntan al MISMO objeto!

DESAFÍO 1: Predice qué imprimirá esto antes de ejecutarlo
----------------------------------------------------------
"""

def quiz_mutabilidad():
    a = [1, 2, 3]
    b = a
    b.append(4)
    print(f"a = {a}")  # ?
    print(f"b = {b}")  # ?
    print(f"a is b: {a is b}")  # ?
    
    c = [1, 2, 3]
    d = c.copy()  # o c[:] o list(c)
    d.append(4)
    print(f"c = {c}")  # ?
    print(f"d = {d}")  # ?
    print(f"c is d: {c is d}")  # ?


"""
DESAFÍO 2: Función que modifica el argumento
-------------------------------------------
¿Por qué esta función tiene un comportamiento inesperado?
"""

def agregar_elemento_malo(lista, elemento=[]):  # ⚠️ ¡NO HACER ESTO!
    elemento.append(lista)
    return elemento

def agregar_elemento_bien(lista, elemento=None):  # ✅ Correcto
    if elemento is None:
        elemento = []
    elemento.append(lista)
    return elemento


"""
DESAFÍO 3: Intercambiar valores SIN variable temporal
-----------------------------------------------------
Usa desempacado de tuplas.
"""

def swap(a, b):
    """Intercambia a y b sin usar variable temporal"""
    pass


"""
EJERCICIO PRÁCTICO: Deep copy vs Shallow copy
----------------------------------------------
Dada esta estructura anidada, crea:
1. Una shallow copy
2. Una deep copy
3. Modifica la original y muestra las diferencias
"""

estructura = {
    "usuario": "ana",
    "scores": [10, 20, 30],
    "perfil": {
        "edad": 25,
        "direcciones": [{"ciudad": "Madrid"}]
    }
}


"""
PREGUNTAS DE REFLEXIÓN:
----------------------
1. ¿Por qué los argumentos mutables por defecto son problemáticos?
2. ¿Cuándo preferirías una shallow copy sobre una deep copy?
3. ¿Cómo harías una deep copy manual sin usar copy.deepcopy()?
"""
