/**
 * Ejercicio 08: Programación Funcional
 * =====================================
 * 
 * JavaScript soporta paradigma funcional:
 * - Funciones como first-class citizens
 * - Higher-order functions
 * - Inmutabilidad
 */

/**
 * DESAFÍO 1: Compose y Pipe
 * compose: f(g(h(x))) = compose(f, g, h)(x)
 * pipe: h(g(f(x))) = pipe(f, g, h)(x)
 */
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

// Ejemplo:
const doble = x => x * 2;
const masUno = x => x + 1;
const cuadrado = x => x * x;

const operacion = pipe(doble, masUno, cuadrado);
console.log(operacion(3)); // (3 * 2 + 1)² = 49

/**
 * DESAFÍO 2: Currying
 * Transforma f(a, b, c) en f(a)(b)(c)
 */
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...args2) {
            return curried.apply(this, args.concat(args2));
        };
    };
}

const curriedSum = curry((a, b, c) => a + b + c);
console.log(curriedSum(1)(2)(3));    // 6
console.log(curriedSum(1, 2)(3));    // 6
console.log(curriedSum(1)(2, 3));    // 6

/**
 * DESAFÍO 3: Functor (map en contextos)
 * Un Functor es cualquier cosa que pueda mapearse
 */
const Identity = (value) => ({
    map: fn => Identity(fn(value)),
    valueOf: () => value,
    toString: () => `Identity(${value})`
});

const ids = Identity(5)
    .map(x => x * 2)
    .map(x => x + 1);
console.log(ids); // Identity(11)

/**
 * DESAFÍO 4: Maybe monad (manejo seguro de null)
 */
const Maybe = (value) => ({
    map: fn => value !== null && value !== undefined 
        ? Maybe(fn(value)) 
        : Maybe(null),
    flatMap: fn => value !== null && value !== undefined 
        ? fn(value) 
        : Maybe(null),
    getOrElse: (defaultValue) => 
        value !== null && value !== undefined ? value : defaultValue,
    isNothing: () => value === null || value === undefined
});

const resultado = Maybe(5)
    .map(x => x * 2)
    .map(x => {
        throw new Error('Oops'); // Simula error
    })
    .map(x => x + 1)
    .getOrElse(0);

console.log(resultado); // 0 (fallback por el error)

/**
 * DESAFÍO 5: Lens (acceso inmutable a estructuras anidadas)
 */
const lens = (getter, setter) => ({
    get: (obj) => getter(obj),
    set: (obj, value) => setter(obj, value),
    over: (obj, fn) => setter(obj, fn(getter(obj)))
});

const nameLens = lens(
    obj => obj.name,
    (obj, value) => ({ ...obj, name: value })
);

const addressLens = lens(
    obj => obj.address,
    (obj, value) => ({ ...obj, address: value })
);

const streetLens = lens(
    obj => obj.street,
    (obj, value) => ({ ...obj, street: value })
);

const user = { name: 'Ana', address: { street: 'Calle 1' } };

console.log(nameLens.get(user));                    // 'Ana'
const updated = nameLens.set(user, 'María');        // { name: 'María', address: ... }
const transformed = nameLens.over(user, s => s.toUpperCase()); // { name: 'ANA', ... }

/**
 * AVANZADO: Applicative Functors
 */
const liftA2 = (fn, f1, f2) => f1.map(fn).ap(f2);

const Maybe2 = (value) => ({
    map: fn => Maybe2(value !== null && value !== undefined ? fn(value) : null),
    ap: other => Maybe2(value !== null && value !== undefined ? other.value : null),
    getOrElse: (def) => value !== null && value !== undefined ? value : def
});

Maybe2(x => y => x + y)
    .ap(Maybe2(2))
    .ap(Maybe2(3))
    .getOrElse(0); // 5
