//Crea una función que reciba una cadena de texto (string) y devuelva la misma cadena pero invertida.
//Regla: No puedes usar el método incorporado array.reverse().

//Ejemplo:
//invertirCadena("javascript") ➞ "tpircsavaj"


//declaro la palabra que quiero utilizar como una variable
let word = "Javascript";

function reverseWord() {
    //creo el campo en el que ira el resultado
    let result = "";
    //creo el bucle que hara que la ultima letra pase a ser la primera
    for (let i = word.length - 1; i >= 0; i--) {
        result += word[i];
    }
    return result;
}

console.log(word + " = " + reverseWord());