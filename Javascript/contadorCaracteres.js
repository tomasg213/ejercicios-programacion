//Crea una función que reciba una cadena de texto y devuelva un objeto con el conteo de cada letra.

function contarCaracteres(string) {
    const contador = {};

        const textoLimpio = string.toLowerCase().replace(/\s+/g, '');
for (let char of textoLimpio) {
    // Si el carácter ya existe, sumamos 1; si no, lo inicializamos en 1
    contador[char] = (contador[char] || 0) + 1;
  }

  return contador;
}

console.log(contarCaracteres("Tangamandapiano"));