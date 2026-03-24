/**
 * Ejercicio 3: Testing con Jest
 * 
 * QA - Tests unitarios y de integracion para calculadora de precios.
 */

const IMPUESTOS = {
    'ES': 0.21,
    'MX': 0.16,
    'US': 0.0
};

const ENVIO_BASE = 5;
const ENVIO_POR_KG = 0.5;

function calcularDescuento(subtotal, codigo = null) {
    let porcentaje = 0;
    
    if (subtotal > 500) {
        porcentaje = 0.20;
    } else if (subtotal > 100) {
        porcentaje = 0.10;
    }
    
    if (codigo === 'EXTRA5') {
        porcentaje += 0.05;
    }
    
    return subtotal * porcentaje;
}

function aplicarImpuesto(monto, zona) {
    const tasa = IMPUESTOS[zona.toUpperCase()] ?? 0;
    return monto * tasa;
}

function calcularEnvio(peso, distancia, subtotal) {
    if (subtotal > 200) {
        return 0;
    }
    
    const pesoCosto = peso * ENVIO_POR_KG;
    const distanciaCosto = distancia * 0.01;
    
    return ENVIO_BASE + pesoCosto + distanciaCosto;
}

function calcularPrecioFinal({ subtotal, codigo = null, zona = 'US', peso = 1, distancia = 100 }) {
    if (subtotal < 0) {
        throw new Error('El subtotal no puede ser negativo');
    }
    
    if (peso < 0 || distancia < 0) {
        throw new Error('Peso y distancia deben ser positivos');
    }
    
    const descuento = calcularDescuento(subtotal, codigo);
    const subtotalConDescuento = subtotal - descuento;
    
    const impuesto = aplicarImpuesto(subtotalConDescuento, zona);
    
    const envio = calcularEnvio(peso, distancia, subtotalConDescuento);
    
    return {
        subtotal,
        descuento,
        subtotalConDescuento,
        impuesto,
        envio,
        total: subtotalConDescuento + impuesto + envio
    };
}

function validarCodigoDescuento(codigo) {
    const codigosValidos = ['EXTRA5', 'BIENVENIDO', 'NAVIDAD2024'];
    return codigosValidos.includes(codigo?.toUpperCase());
}

module.exports = {
    calcularDescuento,
    aplicarImpuesto,
    calcularEnvio,
    calcularPrecioFinal,
    validarCodigoDescuento,
    IMPUESTOS
};
