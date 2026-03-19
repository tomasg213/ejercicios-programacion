/**
 * Ejercicio 06: Prototype y Herencia
 * ==================================
 * 
 * JavaScript usa herencia prototypal.
 * TODO objeto tiene un prototype, y los prototypes forman una cadena.
 */

/**
 * DESAFÍO 1: Prototype chain
 * Explora la cadena de prototypes
 */
const arr = [1, 2, 3];

console.log(arr.__proto__);           // Array.prototype
console.log(arr.__proto__.__proto__); // Object.prototype
console.log(arr.__proto__.__proto__.__proto__); // null

// Verificar herencia:
console.log(arr instanceof Array);     // true
console.log(arr instanceof Object);   // true
console.log(arr instanceof Function);  // false

/**
 * DESAFÍO 2: Crear objetos con Object.create
 */
const vehiculoBase = {
    describir() {
        return `Un ${this.tipo} de color ${this.color}`;
    },
    iniciar() {
        return `${this.marca} iniciando...`;
    }
};

const coche = Object.create(vehiculoBase);
coche.tipo = 'coche';
coche.color = 'rojo';
coche.marca = 'Toyota';

console.log(coche.describir());  // "Un coche de color rojo"
console.log(coche.iniciar());    // "Toyota iniciando..."
console.log(coche.hasOwnProperty('describir')); // false, está en prototype

/**
 * DESAFÍO 3: Constructor functions vs Classes
 * Son la misma cosa, classes es syntax sugar
 */

// Constructor function (antiguo)
function Animal(nombre) {
    this.nombre = nombre;
}

Animal.prototype.hablar = function() {
    return `${this.nombre} hace un sonido`;
};

// Class (moderno)
class Animal2 {
    constructor(nombre) {
        this.nombre = nombre;
    }
    
    hablar() {
        return `${this.nombre} hace un sonido`;
    }
}

// ¿Son equivalentes?
const a1 = new Animal('Max');
const a2 = new Animal2('Luna');
console.log(a1.hablar());
console.log(a2.hablar());

/**
 * DESAFÍO 4: Herencia con extends
 */
class Mascota extends Animal2 {
    constructor(nombre, tipo) {
        super(nombre); // Llama al constructor padre
        this.tipo = tipo;
    }
    
    hablar() {
        return super.hablar() + ` (${this.tipo})`;
    }
    
    static crearPerro(nombre) {
        return new Mascota(nombre, 'perro');
    }
}

const perro = new Mascota('Rex', 'perro');
console.log(perro.hablar());
console.log(Mascota.crearPerro('Fido') instanceof Mascota);

/**
 * DESAFÍO 5: Object.assign vs spread vs Object.create
 * ¿Cuál crea una copia real?
 */

const original = { a: 1, b: { c: 2 } };

// Object.assign - shallow copy
const copy1 = Object.assign({}, original);

// Spread - shallow copy
const copy2 = { ...original };

// Object.create - NO es copia, es herencia
const copy3 = Object.create(Object.getPrototypeOf(original));
Object.assign(copy3, original);

// Modificar el nested object:
copy1.b.c = 999;
console.log(original.b.c); // 999 ⚠️ Todos comparten la referencia

/**
 * AVANZADO: Mixins
 */
const volar = {
    volar() {
        return `${this.nombre} está volando`;
    }
};

const nadar = {
    nadar() {
        return `${this.nombre} está nadando`;
    }
};

class Pato {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

Object.assign(Pato.prototype, volar, nadar);

const pato = new Pato('Donald');
console.log(pato.volar());
console.log(pato.nadar());

/**
 * AVANZADO:Symbols en la cadena de herencia
 */
const iterable = {
    [Symbol.iterator]() {
        let step = 0;
        const maxSteps = 5;
        return {
            next() {
                step++;
                if (step <= maxSteps) {
                    return { value: step, done: false };
                }
                return { done: true };
            }
        };
    }
};

for (const num of iterable) {
    console.log(num);
}
