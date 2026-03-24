# Ejercicio 3: Testing con Jest

## Caso Real
Trabajas en aseguramiento de calidad. Necesitas crear tests unitarios y de integración para una función de calculadora de precios de e-commerce.

## Funcionalidades a Testear
1. **Calcular precio total** con descuento
2. **Aplicar impuesto** según zona geográfica
3. **Calcular envío** basado en peso y distancia
4. **Validar código de descuento**
5. **Calcular precio final** (descuento + impuesto + envío)

## Reglas de Negocio
```javascript
// Descuentos
- 10% para pedidos > $100
- 20% para pedidos > $500
- 5% extra por código "EXTRA5"

// Impuestos
- España: 21%
- México: 16%
- USA: 0% (sin impuesto federal en algunos estados)

// Envío
- $5 base + $0.50 por kg
- Gratis para pedidos > $200
```

## Requisitos
1. Instalar Jest: `npm install --save-dev jest`
2. Crear archivo de tests `calculadora.test.js`
3. Tests unitarios para cada función
4. Tests de integración para flujo completo
5. Mocks para dependencias externas
6. Coverage mínimo del 80%

## Estructura
```
proyecto/
├── calculadora.js
├── calculadora.test.js
└── package.json
```

## Ejecutar Tests
```bash
npm test
npm test -- --coverage
npm test -- --watch
```

## Ejemplo de Test
```javascript
describe('calcularDescuento', () => {
    test('aplica 10% para pedidos > $100', () => {
        expect(calcularDescuento(150)).toBe(15);
    });
    
    test('no aplica descuento para pedidos <= $100', () => {
        expect(calcularDescuento(50)).toBe(0);
    });
});
```

## Conceptos a Practicar
- Jest framework
- describe() y test()
- beforeEach() y afterEach()
- toBe(), toEqual(), toThrow()
-Mocks con jest.fn()
- Coverage reports
