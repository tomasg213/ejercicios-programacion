/**
 * Ejercicio 05: ES6+ Features avanzados
 * =======================================
 * 
 * Modern JavaScript tiene muchas características que simplifican el código.
 * Pero hay que entenderlas a fondo para usarlas bien.
 */

/**
 * DESAFÍO 1: Destructuring
 * Extrae valores de objetos y arrays de formas elegantes
 */
const usuario = {
    nombre: 'Carlos',
    edad: 28,
    direccion: {
        ciudad: 'Madrid',
        pais: 'España'
    },
    hobbies: ['programación', 'música', 'deportes']
};

// Destructuring básico
const { nombre, edad } = usuario;

// Destructuring con renombramiento
const { nombre: nombreCompleto, edad: anios } = usuario;

// Destructuring anidado
const { direccion: { ciudad, pais } } = usuario;

// Destructuring con valores por defecto
const { apodo = 'sin apodo' } = usuario;

// ¿Qué pasa aquí?
const { nombre: n } = undefined;  // ⚠️ TypeError!

// Solución con valores por defecto:
function greet({ nombre = 'Anónimo' } = {}) {
    console.log(`Hola, ${nombre}`);
}

/**
 * DESAFÍO 2: Spread y Rest operators
 */
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Spread para concatenar
const combinado = [...arr1, ...arr2];

// Spread para copiar (shallow)
const copia = [...arr1];

// Rest en parámetros
function sumar(...numeros) {
    return numeros.reduce((a, b) => a + b, 0);
}

// Rest en destructuring
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];
console.log(resto); // [3, 4, 5]

/**
 * DESAFÍO 3: Optional Chaining y Nullish Coalescing
 */
const empresa = {
    nombre: 'TechCorp',
    CEO: {
        nombre: 'Ana García',
        direccion: {
            calle: 'Gran Vía 1',
            ciudad: 'Madrid'
        }
    },
    empleados: 150
};

// SIN optional chaining (peligroso):
try {
    console.log(empresa.CEO.direccion.ciudad);
    console.log(empresa.CEO.direccion.codigoPostal.texto); // ⚠️ TypeError
} catch (e) {
    console.log('Error sin optional chaining');
}

// CON optional chaining:
console.log(empresa.CEO?.direccion?.ciudad);
console.log(empresa.CEO?.direccion?.codigoPostal?.texto); // undefined (sin error)

// Nullish coalescing (??)
const valor = null;
console.log(valor ?? 'default');      // 'default'
console.log(0 ?? 'default');        // 0 ⚠️ Diferencia con ||
console.log('' ?? 'default');       // '' ⚠️ Diferencia con ||
console.log(false ?? 'default');    // false ⚠️ Diferencia con ||

/**
 * DESAFÍO 4: Template Literals avanzados
 */
const nombre2 = 'Carlos';
const edad2 = 28;

// Templates básicos
const saludo = `Hola, ${nombre2}. Tienes ${edad2} años.`;

// Templates anidados
const createGreeting = (name) => `¡Bienvenido, ${name}!`;
const createPersonalized = (greeting, name) => `${greeting.toUpperCase()} ${name}`;

// Tagged templates
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        return acc + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
    }, '');
}

const html = highlight`Hola ${nombre2}, tienes ${edad2} años.`;
// "Hola <mark>Carlos</mark>, tienes <mark>28</mark> años."

/**
 * DESAFÍO 5: Symbols y su uso
 */
const simbolo1 = Symbol('descripcion');
const simbolo2 = Symbol('descripcion');

console.log(simbolo1 === simbolo2);  // false ⚠️
console.log(typeof simbolo1);         // 'symbol'

// Symbols como keys de objetos
const obj = {
    [simbolo1]: 'valor1',
    [simbolo2]: 'valor2',
    regular: 'valor3'
};

console.log(Object.keys(obj));        // ['regular']
console.log(Object.getOwnPropertySymbols(obj)); // [simbolo1, simbolo2]

// Symbol Well-known
const iterator = Symbol.iterator;
console.log([1, 2, 3][iterator]);  // Función para iterar

/**
 * AVANZADO: WeakMap, WeakSet, WeakRef
 */
// WeakMap: claves que son objetos y pueden ser garbage collected
let objClave = { id: 1 };
const weakMap = new WeakMap();
weakMap.set(objClave, 'datos');

objClave = null; // El objeto puede ser recolectado por el GC

// WeakSet: similar pero para sets
let objeto = { nombre: 'test' };
const weakSet = new WeakSet();
weakSet.add(objeto);
console.log(weakSet.has(objeto)); // true
objeto = null; // Puede ser garbage collected
