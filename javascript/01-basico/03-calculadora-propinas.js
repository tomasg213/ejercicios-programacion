/**
 * Ejercicio 3: Calculadora de Propinas
 * 
 * Sistema para restaurante - Cálculo automático de propinas.
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const NIVELES_SERVICIO = {
    1: { nombre: 'Excelente', porcentaje: 20 },
    2: { nombre: 'Bueno', porcentaje: 15 },
    3: { nombre: 'Regular', porcentaje: 10 },
    4: { nombre: 'Mal', porcentaje: 5 }
};

function calcularPropina(total, porcentaje) {
    return total * (porcentaje / 100);
}

function formatearMoneda(monto) {
    return '$' + monto.toFixed(2);
}

rl.question('Cuenta total: ', (cuentaInput) => {
    const cuenta = parseFloat(cuentaInput);
    
    if (isNaN(cuenta) || cuenta <= 0) {
        console.log('Error: Monto inválido');
        rl.close();
        return;
    }
    
    console.log('\nNivel de servicio:');
    console.log('1 =Excelente (20%)');
    console.log('2 =Bueno (15%)');
    console.log('3 =Regular (10%)');
    console.log('4 =Mal (5%)');
    
    rl.question('Seleccione nivel (1-4): ', (nivelInput) => {
        const nivel = parseInt(nivelInput);
        
        if (!NIVELES_SERVICIO[nivel]) {
            console.log('Error: Nivel de servicio inválido');
            rl.close();
            return;
        }
        
        rl.question('Numero de personas (1 para solo): ', (personasInput) => {
            const personas = parseInt(personasInput) || 1;
            
            const servicio = NIVELES_SERVICIO[nivel];
            const propina = calcularPropina(cuenta, servicio.porcentaje);
            const total = cuenta + propina;
            const porPersona = total / personas;
            
            console.log('\n=== Desglose ===');
            console.log(`Subtotal: ${formatearMoneda(cuenta)}`);
            console.log(`Propina (${servicio.porcentaje}% - ${servicio.nombre}): ${formatearMoneda(propina)}`);
            console.log(`Total: ${formatearMoneda(total)}`);
            
            if (personas > 1) {
                console.log(`\n--- Division entre ${personas} personas ---`);
                console.log(`Por persona: ${formatearMoneda(porPersona)}`);
            }
            
            rl.close();
        });
    });
});
