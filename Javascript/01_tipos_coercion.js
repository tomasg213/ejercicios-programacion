/**
 * Ejercicio 01: Tipos de datos y coerción
 * =========================================
 * 
 * JavaScript tiene 7 tipos primitivos y 1 tipo complejo:
 * - Primitivos: string, number, bigint, boolean, undefined, symbol, null
 * - Complejo: object
 * 
 * ⚠️ JavaScript es dinámicamente tipado Y tiene coerción implícita
 */

// EJECUTA ESTO en la consola del navegador o Node.js:
console.log(typeof 42);                    // "number"
console.log(typeof "hola");                 // "string"
console.log(typeof true);                  // "boolean"
console.log(typeof undefined);             // "undefined"
console.log(typeof null);                  // "object" ⚠️ BUG histórico
console.log(typeof Symbol("x"));           // "symbol"
console.log(typeof {});                    // "object"
console.log(typeof []);                    // "object"
console.log(typeof function(){});          // "function"

/**
 * DESAFÍO 1: Coerción de tipos
 * Predice qué imprime cada línea ANTES de ejecutar:
 */
console.log(1 + "2");         // ?
console.log("2" + 1);         // ?
console.log(1 + 2 + "3");    // ?
console.log("1" + 2 + 3);    // ?
console.log(10 - "5");        // ?
console.log("10" - 5);        // ?
console.log("10" * "5");      // ?
console.log(true + 1);       // ?
console.log(false + 1);      // ?
console.log([] + []);        // ?
console.log([] + {});        // ?
console.log({} + []);        // ?

/**
 * DESAFÍO 2: Comparaciones estrictas vs abstractas
 * ¿Cuál es la diferencia entre == y ===?
 */
console.log(0 == false);     // ?
console.log(0 === false);    // ?
console.log("" == false);    // ?
console.log("" === false);   // ?
console.log(null == undefined);  // ?
console.log(null === undefined); // ?
console.log(NaN == NaN);     // ⚠️ Cuidado
console.log(NaN === NaN);    // ⚠️ Cuidado

/**
 * DESAFÍO 3: Implementa estas funciones SIN usar los operadores prohibidos
 */
function toNumber(value) {
    // Convierte a número SIN usar Number() ni parseInt()
    // Hint: usa el operador unario +
}

function toString(value) {
    // Convierte a string SIN usar String() ni toString()
    // Hint: usa concatenación con string vacío
}

function toBoolean(value) {
    // Convierte a boolean SIN usar Boolean()
    // Hint: usa !! (doble negación)
}

/**
 * DESAFÍO 4: Diferencia entre null y undefined
 */
let a;
const b = null;

console.log(a);  // ?
console.log(b);  // ?
console.log(typeof a);  // ?
console.log(typeof b);  // ?
console.log(a == b);    // ?
console.log(a === b);   // ?

/**
 * AVANZADO: Type coercion en condiciones
 * ¿Qué valores son "falsy" en JavaScript?
 */
const falsyValues = [
    false,
    0,
    -0,
    0n,
    "",
    null,
    undefined,
    NaN
];

/**
 * SABÍAS QUE:
 * - null es primitivo pero typeof dice "object"
 * - NaN es de tipo "number" pero no es igual a sí mismo
 * - 0.1 + 0.2 !== 0.3 en JavaScript (IEEE 754)
 */
console.log(0.1 + 0.2 === 0.3);  // false!
console.log(0.1 + 0.2 - 0.3 < 0.0001);  // true, aproximadamente
