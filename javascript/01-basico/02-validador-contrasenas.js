/**
 * Ejercicio 2: Validador de Contraseñas
 * 
 * Equipo de seguridad - Validación de registro de usuarios.
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function validarContrasena(password) {
    const requisitos = [];
    const fallidos = [];
    
    if (password.length >= 8) {
        requisitos.push(`✓ Mínimo 8 caracteres (${password.length})`);
    } else {
        fallidos.push('mínimo 8 caracteres');
        requisitos.push(`✗ Mínimo 8 caracteres (${password.length})`);
    }
    
    if (/[A-Z]/.test(password)) {
        requisitos.push('✓ Al menos 1 mayúscula');
    } else {
        fallidos.push('mayúsculas');
        requisitos.push('✗ Al menos 1 mayúscula');
    }
    
    if (/[a-z]/.test(password)) {
        requisitos.push('✓ Al menos 1 minúscula');
    } else {
        fallidos.push('minúsculas');
        requisitos.push('✗ Al menos 1 minúscula');
    }
    
    if (/[0-9]/.test(password)) {
        requisitos.push('✓ Al menos 1 número');
    } else {
        fallidos.push('números');
        requisitos.push('✗ Al menos 1 número');
    }
    
    if (/[!@#$%^&*]/.test(password)) {
        requisitos.push('✓ Al menos 1 carácter especial');
    } else {
        fallidos.push('carácter especial');
        requisitos.push('✗ Al menos 1 carácter especial');
    }
    
    return { requisitos, fallidos, esValida: fallidos.length === 0 };
}

rl.question('Ingrese contraseña: ', (password) => {
    const resultado = validarContrasena(password);
    
    console.log('---');
    console.log('Verificación de contraseña:');
    resultado.requisitos.forEach(req => console.log(req));
    
    console.log('---');
    console.log(`Estado: ${resultado.esValida ? 'VÁLIDA ✓' : 'INVÁLIDA ✗'}`);
    
    if (!resultado.esValida) {
        console.log(`Razón: Faltan ${resultado.fallidos.join(', ')}`);
    }
    
    rl.close();
});
