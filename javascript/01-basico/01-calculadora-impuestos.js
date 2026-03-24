/**
 * Ejercicio 1: Calculadora de Impuestos
 * 
 * Trabajas en el departamento de facturación de una empresa.
 * Calcula el monto de impuestos según el tipo de producto.
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularImpuesto(tipo, precio) {
    let porcentaje;
    
    if (tipo === 'A') {
        porcentaje = 18;
    } else if (tipo === 'B') {
        porcentaje = 12;
    } else if (tipo === 'C') {
        porcentaje = 8;
    } else if (tipo === 'D') {
        porcentaje = 0;
    } else {
        return null;
    }
    
    const impuesto = precio * (porcentaje / 100);
    const precioFinal = precio + impuesto;
    
    return { porcentaje, impuesto, precioFinal };
}

function mostrarResultado(tipo, resultado) {
    console.log('---');
    console.log(`Producto tipo ${tipo} - Impuesto: ${resultado.porcentaje}%`);
    console.log(`Precio base: $${resultado.precio.toFixed(2)}`);
    console.log(`Impuesto: $${resultado.impuesto.toFixed(2)}`);
    console.log(`Precio final: $${resultado.precioFinal.toFixed(2)}`);
}

rl.question('Ingrese tipo de producto (A/B/C/D): ', (tipo) => {
    tipo = tipo.toUpperCase();
    
    if (!['A', 'B', 'C', 'D'].includes(tipo)) {
        console.log('Error: Tipo de producto inválido');
        rl.close();
        return;
    }
    
    rl.question('Ingrese precio base: $', (precioInput) => {
        const precio = parseFloat(precioInput);
        
        if (isNaN(precio) || precio <= 0) {
            console.log('Error: El precio debe ser un número positivo');
            rl.close();
            return;
        }
        
        const resultado = calcularImpuesto(tipo, precio);
        mostrarResultado(tipo, { ...resultado, precio });
        rl.close();
    });
});
