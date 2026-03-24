# Ejercicio 1: Calculadora de Impuestos

## Caso Real
Trabajas en el departamento de facturación de una empresa. Necesitas un programa que calcule el monto de impuestos según el tipo de producto.

## Especificaciones
- **Productos tipo A**: 18% de impuesto
- **Productos tipo B**: 12% de impuesto
- **Productos tipo C**: 8% de impuesto
- **Productos tipo D**: Exentos (0%)

## Requisitos
1. Solicitar el tipo de producto (A, B, C o D)
2. Solicitar el precio base del producto
3. Mostrar el precio final con impuesto incluido
4. Validar que el tipo sea válido y el precio sea positivo

## Ejemplo de Salida
```
Ingrese tipo de producto (A/B/C/D): A
Ingrese precio base: 100
---
Producto tipo A - Impuesto: 18%
Precio base: $100.00
Impuesto: $18.00
Precio final: $118.00
```

## Pistas
- Usa `if/else if/else` para las condiciones
- Usa `toFixed(2)` para formatear moneda
- Usa `parseFloat()` para convertir strings a números

## Conceptos a Practicar
- Variables y tipos de datos
- Operadores aritméticos
- Condicionales if/else
- Conversión de tipos
