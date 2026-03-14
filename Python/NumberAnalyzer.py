#Crea una función que reciba una lista de números enteros.
# La función debe devolver un diccionario con tres claves:
#"pares": La cantidad de números pares.
#"impares": La cantidad de números impares.
#"mayor": El número más alto de la lista.

numbers = [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50, 100, 200]

def number_analyzer(numbers):
    pares = 0
    impares = 0
    mayor = numbers[0]
    
    for number in numbers:
        if number % 2 == 0:
            pares += 1
        else:
            impares += 1
        if number > mayor:
            mayor = number
    return {"pares": pares,
            "impares": impares,
            "mayor": mayor}
resultado = number_analyzer(numbers)
print(resultado)