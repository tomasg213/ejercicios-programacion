"""
Ejercicio 03: Comprensiones de listas, sets y dicts
==================================================

Las comprehensions son una forma concisa de crear colecciones.
Pero... ¿sabías que puedes anidarlas y usarlas para mucho más?

COMPRENSIONES BÁSICAS
---------------------
"""

def basic_comprehensions():
    squares = [x**2 for x in range(10)]
    even_squares = [x**2 for x in range(10) if x % 2 == 0]
    square_dict = {x: x**2 for x in range(5)}
    unique_squares = {x**2 for x in [-2, -1, 0, 1, 2, 2]}
    return squares, even_squares, square_dict, unique_squares


"""
DESAFÍO 1: Comprensión con múltiples condiciones
-----------------------------------------------
Crea una lista de números del 1 al 100 que sean:
- Divisibles por 3 O 5
- PERO NO divisibles por 15
"""

def fizzbuzz_comprension():
    pass


"""
DESAFÍO 2: Flatten de lista anidada
------------------------------------
Sin usar sum() ni list comprehension anidada tradicional,
flatteniza esta lista:
"""

nested = [[1, 2, 3], [4, [5, 6]], [7, 8], [9]]

def flatten_v1(nested):
    """Tu implementación"""
    pass


"""
DESAFÍO 3: Generator expression vs List comprehension
------------------------------------------------------
Explica la diferencia de memoria entre:
"""

def memoria_comparacion():
    # ¿Cuánta memoria usa cada uno?
    lista_cuadrados = [x**2 for x in range(1000000)]  # Lista completa
    gen_cuadrados = (x**2 for x in range(1000000))     # Generador
    
    import sys
    print(f"Lista: {sys.getsizeof(lista_cuadrados)} bytes")
    print(f"Generador: {sys.getsizeof(gen_cuadrados)} bytes")
    
    return lista_cuadrados, gen_cuadrados


"""
DESAFÍO 4: Dict comprehension con transformación de valores
-----------------------------------------------------------
Dado un diccionario de precios, crea uno nuevo con:
- IVA del 21% incluido
- Redondeado a 2 decimales
- Solo productos con precio > 10
"""

precios = {
    "pan": 1.20,
    "leche": 0.95,
    "carne": 12.50,
    "huevos": 2.30,
    "agua": 0.50
}


"""
DESAFÍO 5: Crear un contador de frecuencia
------------------------------------------
Usa un dict comprehension para contar occurrences de cada palabra.
"""

texto = "python java python javascript java c python java python"

def contador_palabras(texto):
    pass


"""
AVANZADO: Nested comprehension para matriz identidad
----------------------------------------------------
Crea una matriz identidad 5x5 usando UNA sola expresión.
"""

def matriz_identidad(n=5):
    """[[1,0,0,0,0], [0,1,0,0,0], ...]"""
    pass


"""
PREGUNTA: ¿Cuándo NO deberías usar comprehensions?
-------------------------------------------------
Hint: Piensa en legibilidad y expresiones muy complejas.
"""
