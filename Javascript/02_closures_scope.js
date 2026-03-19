/**
 * Ejercicio 02: Closures y Scope
 * ==============================
 * 
 * Un closure es una función que recuerda su entorno lexical.
 * Se crea cuando una función interna accede a variables de la función externa.
 */

/**
 * DESAFÍO 1: Predice qué imprime
 */
function crearContador() {
    let count = 0;
    
    return {
        incrementar: function() {
            count++;
            return count;
        },
        obtener: function() {
            return count;
        }
    };
}

const contador1 = crearContador();
console.log(contador1.incrementar());  // ?
console.log(contador1.incrementar());  // ?
console.log(contador1.obtener());      // ?

const contador2 = crearContador();
console.log(contador2.incrementar());  // ¿Diferente?

/**
 * DESAFÍO 2: Loop con closures
 * ⚠️ Este es un error muy común
 */
function crearfunciones() {
    const funciones = [];
    
    for (var i = 0; i < 3; i++) {
        funciones.push(function() {
            console.log(i);
        });
    }
    
    return funciones;
}

const funcs = crearfunciones();
funcs[0]();  // ?
funcs[1]();  // ?
funcs[2]();  // ?

// CORRECCIÓN: ¿Cómo lo harías con let? ¿Y con IIFE?

/**
 * DESAFÍO 3: Implementa una función que cree "calculadoras"
 * Cada calculadora debe tener:
 * - suma(n)
 * - resta(n)
 * - multiplica(n)
 * - divide(n)
 * - reset()
 * - Obtener el valor actual
 */
function crearCalculadora(valorInicial = 0) {
    // Tu código aquí
}

/**
 * DESAFÍO 4: Private state con closures
 * Crea una clase "Banco" donde el saldo solo se pueda modificar
 * a través de métodos específicos
 */
const Banco = (function() {
    // Variables privadas
    let saldo = 0;
    
    return {
        depositar: function(cantidad) {
            if (cantidad > 0) {
                saldo += cantidad;
                return true;
            }
            return false;
        },
        retirar: function(cantidad) {
            if (cantidad > 0 && cantidad <= saldo) {
                saldo -= cantidad;
                return true;
            }
            return false;
        },
        getSaldo: function() {
            return saldo;
        }
    };
})();

/**
 * DESAFÍO 5: Memorización con closures
 * Implementa una función memoize que guarde resultados previos
 */
function memoize(fn) {
    // Tu código aquí
}

// Uso:
const fibonacci = memoize(function(n) {
    console.log(`Calculando fib(${n})...`);
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(5));  // Calcula
console.log(fibonacci(5));  // Usa cache, no calcula

/**
 * AVANZADO: Currying con closures
 */
function curry(fn) {
    // Transforma f(a, b, c) en f(a)(b)(c)
}

const sumar = curry(function(a, b, c) {
    return a + b + c;
});

console.log(sumar(1)(2)(3));  // 6
console.log(sumar(1, 2)(3)); // 6
console.log(sumar(1)(2, 3)); // 6
