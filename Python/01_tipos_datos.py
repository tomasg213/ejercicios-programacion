"""
Ejercicio 01: Tipos de datos y operaciones básicas
===================================================

En Python todo es un objeto. Cada valor tiene un tipo que determina:
- Qué operaciones puedes realizar
- Cómo se almacena en memoria
- Su comportamiento

1.1 Ejecuta esto en tu terminal:
    python3 -c "print(type(42), type(3.14), type('hola'), type(True))"

1.2 ¿Qué diferencias hay entre estos tipos?
    - int vs float
    - str vs bytes
    - list vs tuple vs range
    - set vs frozenset
    - dict vs collections.defaultdict

DESAFÍO:
--------
Sin usar strings, convierte el número 12345 a "12345" usando solo operaciones
aritméticas. Intenta también la operación inversa.
"""

def numero_a_string(numero: int) -> str:
    """Convierte un número positivo a string SIN usar str() ni format()"""
    pass

def string_a_numero(cadena: str) -> int:
    """Convierte un string de dígitos a número SIN usar int()"""
    pass


"""
SABÍAS QUE:
-----------
- Python usa big integers arbitrarios: 2**10000 tiene miles de dígitos
- Los floats usan IEEE 754 (precisión limitada)
- Prueba: 0.1 + 0.2 == 0.3  (¡sorpresa!)
"""

if __name__ == "__main__":
    print(f"0.1 + 0.2 = {0.1 + 0.2}")
    print(f"0.1 + 0.2 == 0.3: {0.1 + 0.2 == 0.3}")
