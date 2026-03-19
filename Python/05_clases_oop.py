"""
Ejercicio 05: Clases y Programación Orientada a Objetos
=======================================================

PYTHON ES UN LENGUAJE "DUCK TYPING"
-----------------------------------
"Si camina como pato y hace cuac como pato, entonces es un pato"

Esto significa que no importa la clase, sino los métodos que tenga el objeto.
"""

"""
DESAFÍO 1: Protocolos y Duck Typing
-----------------------------------
Crea una función que funcione con CUALQUIER objeto que tenga area().
"""

class Circulo:
    def __init__(self, radio):
        self.radio = radio
    
    def area(self):
        return 3.14159 * self.radio ** 2


class Rectangulo:
    def __init__(self, ancho, alto):
        self.ancho = ancho
        self.alto = alto
    
    def area(self):
        return self.ancho * self.alto


def imprimir_areas(objetos):
    """Imprime el área de cualquier objeto con método area()"""
    pass


"""
DESAFÍO 2: Properties y encapsulamiento
---------------------------------------
Implementa una clase Persona donde:
- nombre sea de solo lectura después de creación
- edad no pueda ser negativa
- email se valide al asignar
"""

class Persona:
    def __init__(self, nombre, edad, email):
        pass
    
    @property
    def nombre(self):
        return self._nombre
    
    # Implementa los demás properties...


"""
DESAFÍO 3: Métodos de clase y métodos estáticos
-----------------------------------------------
Explica la diferencia y crea una clase Calculadora con:
- Un método estático: suma(a, b)
- Un método de clase: desde_string("10,20")
"""

class Calculadora:
    pass


"""
DESAFÍO 4: Herencia múltiple y MRO (Method Resolution Order)
-------------------------------------------------------------
¿Qué es el MRO? Predice el orden de resolución:
"""

class A:
    def procesar(self):
        return "A"

class B(A):
    def procesar(self):
        return "B"

class C(A):
    def procesar(self):
        return "C"

class D(B, C):
    pass

d = D()
print(d.procesar())  # ¿Qué imprime?

# Verifica tu respuesta:
print(D.__mro__)


"""
DESAFÍO 5: Abstract Base Classes (ABC)
---------------------------------------
Crea un sistema de formas donde:
- FiguraGeometrica sea abstracta
- Circulo y Cuadrado hereden de ella
- FiguraFactory cree figuras por nombre
"""

from abc import ABC, abstractmethod


"""
DESAFÍO 6: Data Classes (Python 3.7+)
-------------------------------------
¿ Cuándo usar data classes vs clases normales?
Crea una data class para representar una Card (palo, valor).
"""

from dataclasses import dataclass


"""
AVANZADO: __slots__ para optimización de memoria
------------------------------------------------
Compara memoria de clase normal vs con __slots__
"""

class SinSlots:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

class ConSlots:
    __slots__ = ['nombre', 'edad']
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad


"""
PREGUNTAS DE REFLEXIÓN:
-----------------------
1. ¿Cuándo usar herencia vs composición?
2. ¿Qué problemas resuelve el patrón ABC?
3. ¿Qué son los "dunder methods" y para qué sirven?
"""
