/**
 * Ejercicio 03: Arrays y métodos funcionales
 * ===========================================
 * 
 * Los arrays en JavaScript son versátiles pero tienen trampas.
 * Los métodos funcionales son elegantes pero hay que entenderlos.
 */

/**
 * DESAFÍO 1: map, filter, reduce - Sin ellos, ¿podrías?
 * Implementa versiones básicas de estos métodos
 */
Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

Array.prototype.myFilter = function(callback) {
    // Tu código aquí
};

Array.prototype.myReduce = function(callback, initialValue) {
    // Tu código aquí
};

// Uso:
const numeros = [1, 2, 3, 4, 5];

console.log(numeros.myMap(x => x * 2));        // [2, 4, 6, 8, 10]
console.log(numeros.myFilter(x => x % 2 === 0)); // [2, 4]
console.log(numeros.myReduce((acc, x) => acc + x, 0)); // 15

/**
 * DESAFÍO 2: Chaining de métodos
 * Resuelve esto usando encadenamiento:
 */
const estudiantes = [
    { nombre: 'Ana', edad: 20, curso: 'Matemáticas', nota: 8.5 },
    { nombre: 'Bob', edad: 22, curso: 'Física', nota: 9.2 },
    { nombre: 'Carlos', edad: 19, curso: 'Matemáticas', nota: 7.0 },
    { nombre: 'Diana', edad: 21, curso: 'Física', nota: 8.8 },
    { nombre: 'Eva', edad: 20, curso: 'Química', nota: 6.5 }
];

// Obtén los nombres de los estudiantes de Matemáticas con nota >= 7.5
// sorted por nota descendente

/**
 * DESAFÍO 3:flat y flatMap
 * Sin usar flat(), flatteniza arrays anidados
 */
const anidado = [1, [2, 3], [[4, 5]], [[[6, 7]]]];

function flatten(arr, depth = Infinity) {
    // Tu código aquí
}

console.log(flatten(anidado)); // [1, 2, 3, 4, 5, 6, 7]
console.log(flatten([1, [2, [3, [4]]]], 2)); // [1, 2, 3, [4]]

/**
 * DESAFÍO 4:find, findIndex, some, every
 */
const productos = [
    { id: 1, nombre: 'Laptop', precio: 999, enStock: true },
    { id: 2, nombre: 'Mouse', precio: 29, enStock: false },
    { id: 3, nombre: 'Teclado', precio: 79, enStock: true }
];

// Encuentra el primer producto en stock
const enStock = productos.find(p => p.enStock);

// Verifica si ALGÚN producto cuesta más de 500
const algunoCaro = /* tu código */;

// Verifica si TODOS los productos están en stock
const todosEnStock = /* tu código */;

/**
 * DESAFÍO 5: Mutación vs Inmutabilidad
 * ⚠️ CUIDADO: Algunos métodos MUTAN el array original
 */

// Estos MUTAN:
const a = [1, 2, 3];
a.push(4);        // Muta a
a.sort();         // Muta a

// Estos NO MUTAN (retornan nuevo array):
const b = [1, 2, 3].map(x => x * 2);  // Nuevo array
const c = [1, 2, 3].filter(x => x > 1); // Nuevo array
const d = [1, 2, 3].slice().sort();     // .slice() hace copia

// DESAFÍO: Ordena sin mutar
const numerosDesordenados = [3, 1, 4, 1, 5, 9, 2, 6];
const ordenada = numerosDesordenados /* sin mutar */;
console.log(numerosDesordenados); // ¿Sigue igual?

/**
 * AVANZADO: groupBy
 * Implementa un groupBy que funcione así:
 */
const students = [
    { name: 'Ana', course: 'Math' },
    { name: 'Bob', course: 'Science' },
    { name: 'Carlos', course: 'Math' }
];

function groupBy(array, key) {
    // Tu código aquí
}

console.log(groupBy(students, 'course'));
// { Math: [...], Science: [...] }
