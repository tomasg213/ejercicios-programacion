//Escribe una función que imprima en la consola los números del 1 al 100.
//Para los múltiplos de 3, imprime "Fizz" en lugar del número.
//Para los múltiplos de 5, imprime "Buzz".
//Para los números que son múltiplos de tanto de 3 como de 5, imprime "FizzBuzz".


function fizzBuzz() {
    for (number = 1; number <= 100; number++)
        if (number % 3 == 0 && number % 5 == 0)
            console.log("FizzBuzz" + " " + number)
        else if (number % 3 == 0)
            console.log("Fizz" + " " + number)
        else if (number % 5 == 0)
            console.log("Buzz" + " " + number)
        else
            console.log(number)
}

fizzBuzz();
