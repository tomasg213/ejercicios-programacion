/**
 * Ejercicio 07: Módulos (ES Modules)
 * ==================================
 * 
 * JavaScript moderno usa módulos para organizar código.
 * Hay dos sistemas principales: CommonJS (Node) y ES Modules (navegador/moderno).
 */

/**
 * DESAFÍO 1: Exportar e importar
 * 
 * Archivo: math.js
 * -----------------
 */
// export const PI = 3.14159;
// export function sumar(a, b) { return a + b; }
// export default class Calculadora { ... }
//
// Importar:
import { PI, sumar } from './math.js';
import Calculadora from './math.js';
// Importar todo como objeto:
import * as math from './math.js';

/**
 * DESAFÍO 2: Named vs Default exports
 * 
 * named exports: export const x = 1;
 * default export: export default function() {}
 * 
 * Puedes tener múltiples named exports pero solo UN default export por archivo.
 */

/**
 * DESAFÍO 3: Re-exportar
 */
// mathUtils.js
// export { sumar, restar } from './operaciones.js';
// export { default as Calculadora } from './calculadora.js';

/**
 * DESAFÍO 4: Dynamic imports
 * Carga módulos dinámicamente bajo demanda
 */
async function cargarModulo() {
    // El módulo no se carga hasta que se ejecuta esta línea
    const modulo = await import('./moduloPesado.js');
    modulo.funcionarPesada();
}

/**
 * DESAFÍO 5: Module singleton con IIFE
 * Asegura que una instancia se comparta en toda la aplicación
 */
const database = (function() {
    let instancia = null;
    
    function crearInstancia() {
        return {
            query: (sql) => console.log(`Ejecutando: ${sql}`),
            connect: () => console.log('Conectado')
        };
    }
    
    return {
        getInstancia: function() {
            if (!instancia) {
                instancia = crearInstancia();
            }
            return instancia;
        }
    };
})();

// Uso:
const db1 = database.getInstancia();
const db2 = database.getInstancia();
console.log(db1 === db2); // true

/**
 * AVANZADO: Circular dependencies
 * ⚠️ Cuidado con esto
 */
// a.js
// import { b } from './b.js';
// export const a = 'soy a';
// console.log(b);

// b.js
// import { a } from './a.js';  // a aún no está definido!
// export const b = 'soy b';
// console.log(a);

// Solución: usar export después de definir
