//Crea una funcion que pueda definir si una palabra, frase o numero es palindromo
//es decir, se lee igual al derecho y al reves
//Ejemplo: "oro", "ana", "Amor a Roma", "Reconocer"

function palindromo() {

    let palabra = "oro";
    let palabraFinal = "";
    
    for (let i = palabra.length - 1; i >= 0; i--) {
       palabraFinal += palabra[i];
    }
    console.log(palabra + " = " + palabraFinal);

    switch (palabra === palabraFinal) {
  case true:
    console.log(palabra + " Es palíndromo");
    break;
  case false:
    console.log(palabra + " No es palíndromo");
    break;
}
}

palindromo();