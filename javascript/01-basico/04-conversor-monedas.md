# Ejercicio 4: Conversor de Monedas

## Caso Real
Trabajas en una fintech y necesitas crear un conversor rápido para usuarios que viajan o hacen compras internacionales.

## Tasas de Cambio (base: USD)
| Moneda | Símbolo | Tasa |
|--------|---------|------|
| Dólar | USD | 1.00 |
| Euro | EUR | 0.92 |
| Libra | GBP | 0.79 |
| Yen | JPY | 149.50 |
| Peso Mexicano | MXN | 17.15 |
| Peso Argentino | ARS | 870.00 |

## Requisitos
1. Mostrar menú de monedas disponibles
2. Solicitar moneda de origen y destino
3. Solicitar monto a convertir
4. Mostrar resultado con formato correcto

## Ejemplo de Salida
```
=== Conversor de Monedas ===
1. USD - Dólar
2. EUR - Euro
3. GBP - Libra
4. JPY - Yen
5. MXN - Peso Mexicano
6. ARS - Peso Argentino

Moneda origen (1-6): 1
Moneda destino (1-6): 2
Monto a convertir: 100
---
100.00 USD = 92.00 EUR
```

## Pistas
- Usa un objeto para almacenar las tasas
- La fórmula: `monto / tasaOrigen * tasaDestino`
- `toFixed(2)` para el resultado

## Conceptos a Practicar
- Objetos
- Acceso a propiedades
- Funciones con parámetros
- Entrada/salida en consola
