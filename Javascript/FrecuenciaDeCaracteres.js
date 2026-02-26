//Escribe una función que reciba un string y devuelva un objeto donde las
//  claves sean cada carácter del string y los valores sean la cantidad de veces que aparece ese carácter.
//  Debes ignorar los espacios y tratar las mayúsculas y minúsculas por igual.

//Ejemplo:
//contarCaracteres("Hola mundo") ➞ { h: 1, o: 2, l: 1, a: 1, m: 1, u: 1, n: 1, d: 1 }

function contarCaracteres(string) {
    const contador = {};

    // Convertimos a minúsculas y quitamos los espacios
    const textoLimpio = string.toLowerCase().replace(/\s+/g, '');

    // 2. Recorremos cada carácter del string
  for (let char of textoLimpio) {
    // Si el carácter ya existe, sumamos 1; si no, lo inicializamos en 1
    contador[char] = (contador[char] || 0) + 1;
  }

  return contador;
}

console.log(contarCaracteres("Hola mundo"));