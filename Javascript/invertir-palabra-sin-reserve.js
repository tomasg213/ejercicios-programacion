//Crea una función que reciba una cadena de texto (string) y devuelva la misma cadena pero invertida.
//Regla: No puedes usar el método incorporado array.reverse().

//Ejemplo:
//invertirCadena("javascript") ➞ "tpircsavaj"

let word = "Javascript";

function reverseWord() {
    let result = "";
    for (let i = word.length - 1; i >= 0; i--) {
        result += word[i];
    }
    return result;
}

console.log(word + " = " + reverseWord());