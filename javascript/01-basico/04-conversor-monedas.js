/**
 * Ejercicio 4: Conversor de Monedas
 * 
 * Fintech - Conversor para usuarios internacionales.
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const MONEDAS = {
    1: { codigo: 'USD', nombre: 'Dolar', tasa: 1.00 },
    2: { codigo: 'EUR', nombre: 'Euro', tasa: 0.92 },
    3: { codigo: 'GBP', nombre: 'Libra', tasa: 0.79 },
    4: { codigo: 'JPY', nombre: 'Yen', tasa: 149.50 },
    5: { codigo: 'MXN', nombre: 'Peso Mexicano', tasa: 17.15 },
    6: { codigo: 'ARS', nombre: 'Peso Argentino', tasa: 870.00 }
};

function mostrarMenu() {
    console.log('\n=== Conversor de Monedas ===');
    for (const [num, moneda] of Object.entries(MONEDAS)) {
        console.log(`${num}. ${moneda.codigo} - ${moneda.nombre}`);
    }
}

function convertir(monto, tasaOrigen, tasaDestino) {
    const montoUSD = monto / tasaOrigen;
    return montoUSD * tasaDestino;
}

mostrarMenu();

rl.question('\nMoneda origen (1-6): ', (origenInput) => {
    const origen = parseInt(origenInput);
    
    if (!MONEDAS[origen]) {
        console.log('Error: Moneda de origen inválida');
        rl.close();
        return;
    }
    
    rl.question('Moneda destino (1-6): ', (destinoInput) => {
        const destino = parseInt(destinoInput);
        
        if (!MONEDAS[destino]) {
            console.log('Error: Moneda de destino inválida');
            rl.close();
            return;
        }
        
        rl.question('Monto a convertir: ', (montoInput) => {
            const monto = parseFloat(montoInput);
            
            if (isNaN(monto) || monto <= 0) {
                console.log('Error: Monto inválido');
                rl.close();
                return;
            }
            
            const resultado = convertir(
                monto,
                MONEDAS[origen].tasa,
                MONEDAS[destino].tasa
            );
            
            console.log('\n--- Resultado ---');
            console.log(`${monto.toFixed(2)} ${MONEDAS[origen].codigo} = ${resultado.toFixed(2)} ${MONEDAS[destino].codigo}`);
            
            rl.close();
        });
    });
});
