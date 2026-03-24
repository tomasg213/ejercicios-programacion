# Ejercicio 4: Calculadora de Estadísticas de Ventas

## Caso Real
Trabajas en el departamento de ventas. Necesitas analizar un conjunto de ventas diarias.

## Requisitos
Dados los siguientes datos de ventas (en dollars):
`[150, 200, 175, 300, 250, 180, 220, 190, 210, 240, 160, 200]`

Calcular:
1. **Total de ventas**: Suma de todas las ventas
2. **Promedio**: Media de ventas
3. **Máximo y mínimo**: Venta más alta y más baja
4. **Ventas acima del promedio**: Cuántas superaron el promedio
5. **Ranking**: Ordenar de mayor a menor

## Ejemplo de Salida
```
=== Estadísticas de Ventas ===
Datos: [150, 200, 175, 300, 250, 180, 220, 190, 210, 240, 160, 200]

--- Resultados ---
Total de ventas: $2,675.00
Promedio: $223.96
Venta maxima: $300.00
Venta minima: $150.00
Ventas acima del promedio: 5

--- Ranking (mayor a menor) ---
1. $300.00
2. $250.00
3. $240.00
...
```

## Pistas
- `sum(lista)` para suma
- `len(lista)` para cantidad
- `max(lista)` y `min(lista)` para extremos
- `sorted(lista, reverse=True)` para ordenar
- F-string con `:,.2f` para formatear moneda

## Conceptos a Practicar
- Listas
- Funciones min, max, sum, len, sorted
- Slicing de listas
- Formateo de strings
- Comprensión de listas (opcional)
