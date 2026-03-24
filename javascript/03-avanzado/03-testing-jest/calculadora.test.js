/**
 * Tests unitarios y de integracion para calculadora de precios.
 */

const {
    calcularDescuento,
    aplicarImpuesto,
    calcularEnvio,
    calcularPrecioFinal,
    validarCodigoDescuento,
    IMPUESTOS
} = require('./calculadora');

describe('calcularDescuento', () => {
    test('aplica 10% para pedidos > $100', () => {
        expect(calcularDescuento(150)).toBe(15);
    });
    
    test('aplica 20% para pedidos > $500', () => {
        expect(calcularDescuento(600)).toBe(120);
    });
    
    test('no aplica descuento para pedidos <= $100', () => {
        expect(calcularDescuento(100)).toBe(0);
        expect(calcularDescuento(50)).toBe(0);
    });
    
    test('agrega 5% extra con codigo EXTRA5', () => {
        expect(calcularDescuento(200, 'EXTRA5')).toBe(30);
    });
    
    test('codigo invalido no afecta descuento', () => {
        expect(calcularDescuento(200, 'INVALIDO')).toBe(20);
    });
    
    test('codigo null no afecta descuento', () => {
        expect(calcularDescuento(200, null)).toBe(20);
    });
    
    test('descuento 25% + 5% = 25% para pedido grande con codigo', () => {
        expect(calcularDescuento(600, 'EXTRA5')).toBe(150);
    });
});

describe('aplicarImpuesto', () => {
    test('aplica 21% para Espana', () => {
        expect(aplicarImpuesto(100, 'ES')).toBe(21);
    });
    
    test('aplica 16% para Mexico', () => {
        expect(aplicarImpuesto(100, 'MX')).toBe(16);
    });
    
    test('aplica 0% para USA', () => {
        expect(aplicarImpuesto(100, 'US')).toBe(0);
    });
    
    test('zona invalida devuelve 0', () => {
        expect(aplicarImpuesto(100, 'XX')).toBe(0);
    });
    
    test('es case insensitive', () => {
        expect(aplicarImpuesto(100, 'es')).toBe(21);
        expect(aplicarImpuesto(100, 'Es')).toBe(21);
    });
});

describe('calcularEnvio', () => {
    test('envio gratis para pedidos > $200', () => {
        expect(calcularEnvio(5, 100, 201)).toBe(0);
    });
    
    test('calcula envio normal para pedidos <= $200', () => {
        const esperado = 5 + (2 * 0.5) + (100 * 0.01);
        expect(calcularEnvio(2, 100, 150)).toBe(esperado);
    });
    
    test('envio base es $5', () => {
        const resultado = calcularEnvio(0, 0, 100);
        expect(resultado).toBe(5);
    });
    
    test('peso influye en el costo', () => {
        const envioLeve = calcularEnvio(1, 0, 100);
        const envioPesado = calcularEnvio(10, 0, 100);
        expect(envioPesado).toBeGreaterThan(envioLeve);
    });
});

describe('validarCodigoDescuento', () => {
    test('codigos validos devuelve true', () => {
        expect(validarCodigoDescuento('EXTRA5')).toBe(true);
        expect(validarCodigoDescuento('BIENVENIDO')).toBe(true);
        expect(validarCodigoDescuento('NAVIDAD2024')).toBe(true);
    });
    
    test('codigos invalidos devuelve false', () => {
        expect(validarCodigoDescuento('INVALIDO')).toBe(false);
        expect(validarCodigoDescuento('')).toBe(false);
        expect(validarCodigoDescuento(null)).toBe(false);
    });
    
    test('es case insensitive', () => {
        expect(validarCodigoDescuento('extra5')).toBe(true);
        expect(validarCodigoDescuento('extra5'.toUpperCase())).toBe(true);
    });
});

describe('calcularPrecioFinal - Tests de Integracion', () => {
    test('calculo completo pedido basico', () => {
        const resultado = calcularPrecioFinal({
            subtotal: 150,
            zona: 'US',
            peso: 2,
            distancia: 100
        });
        
        expect(resultado.subtotal).toBe(150);
        expect(resultado.descuento).toBe(15);
        expect(resultado.subtotalConDescuento).toBe(135);
        expect(resultado.impuesto).toBe(0);
        expect(resultado.total).toBe(140);
    });
    
    test('calculo con impuesto espana', () => {
        const resultado = calcularPrecioFinal({
            subtotal: 100,
            zona: 'ES',
            peso: 1,
            distancia: 50
        });
        
        expect(resultado.subtotal).toBe(100);
        expect(resultado.descuento).toBe(0);
        expect(resultado.impuesto).toBe(21);
        expect(resultado.total).toBe(126);
    });
    
    test('calculo con descuento y envio gratis', () => {
        const resultado = calcularPrecioFinal({
            subtotal: 250,
            zona: 'MX',
            peso: 3,
            distancia: 200
        });
        
        expect(resultado.descuento).toBe(25);
        expect(resultado.subtotalConDescuento).toBe(225);
        expect(resultado.envio).toBe(0);
    });
    
    test('pedido pequeno con envio', () => {
        const resultado = calcularPrecioFinal({
            subtotal: 50,
            zona: 'US',
            peso: 1,
            distancia: 100
        });
        
        expect(resultado.descuento).toBe(0);
        expect(resultado.envio).toBe(6.5);
        expect(resultado.total).toBe(56.5);
    });
    
    test('pedido grande con todo', () => {
        const resultado = calcularPrecioFinal({
            subtotal: 600,
            codigo: 'EXTRA5',
            zona: 'ES',
            peso: 5,
            distancia: 300
        });
        
        expect(resultado.descuento).toBe(150);
        expect(resultado.subtotalConDescuento).toBe(450);
        expect(resultado.impuesto).toBe(94.5);
        expect(resultado.envio).toBe(0);
        expect(resultado.total).toBe(544.5);
    });
});

describe('calcularPrecioFinal - Validaciones', () => {
    test('lanza error para subtotal negativo', () => {
        expect(() => calcularPrecioFinal({ subtotal: -10 }))
            .toThrow('El subtotal no puede ser negativo');
    });
    
    test('lanza error para peso negativo', () => {
        expect(() => calcularPrecioFinal({ subtotal: 100, peso: -1 }))
            .toThrow('Peso y distancia deben ser positivos');
    });
    
    test('lanza error para distancia negativa', () => {
        expect(() => calcularPrecioFinal({ subtotal: 100, distancia: -50 }))
            .toThrow('Peso y distancia deben ser positivos');
    });
});

describe('Coverage Demo - Edge Cases', () => {
    test('pedido exactamente en limite de descuento', () => {
        expect(calcularDescuento(100)).toBe(0);
        expect(calcularDescuento(101)).toBe(10.1);
    });
    
    test('pedido exactamente en limite de envio gratis', () => {
        expect(calcularEnvio(5, 100, 200)).toBe(0);
        expect(calcularEnvio(5, 100, 199.99)).toBeGreaterThan(0);
    });
    
    test('zona con string vacio', () => {
        expect(aplicarImpuesto(100, '')).toBe(0);
    });
});
