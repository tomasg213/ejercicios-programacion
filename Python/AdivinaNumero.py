#El programa genera un número secreto (puedes fijarlo en 7 por ahora).
#El usuario debe intentar adivinarlo.
#Reto: Si el usuario falla, dile si el número secreto es "más alto" o "más bajo" que su respuesta.
#Usa un bucle while para que el juego no termine hasta que acierte.

import random

numero = random.randint(1,500)

respuesta = int(input("Introduce un numero: "))

while respuesta != numero:
     if respuesta < numero:
      print("El numero que buscas es mayor")
     else:
      print("El numero que buscas es menor")

     respuesta = int(input("Inténtalo de nuevo: "))
print("Felicidades, encontraste el numero")
