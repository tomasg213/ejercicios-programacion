# Ejercicio 1: Calculadora de Presupuesto Personal

## Caso Real
Trabajas en finanzas personales. Crea una herramienta para calcular si un presupuesto está equilibrado.

## Reglas de Salud Financiera
- **Gastos esenciales** (alquiler, comida, servicios): máximo 50% del ingreso
- **Entretenimiento y gastos varios**: máximo 30% del ingreso
- **Ahorro**: mínimo 20% del ingreso

## Requisitos
1. Solicitar el ingreso mensual bruto
2. Solicitar gastos esenciales
3. Solicitar gastos de entretenimiento
4. Calcular el balance y dar recomendaciones

## Ejemplo de Salida
```
=== Calculadora de Presupuesto ===
Ingreso mensual: $3000

Gastos esenciales (alquiler, comida): $1400
Gastos entretenimiento: $600

=== Análisis ===
Ingreso: $3000.00
Total gastos: $2000.00
Ahorro: $1000.00 (33.33%)

Estado: SALUDABLE ✓
- Gastos esenciales: 46.67% (límite: 50%)
- Entretenimiento: 20.00% (límite: 30%)
- Ahorro: 33.33% (mínimo: 20%)

Recomendación: ¡Buen trabajo! Estás ahorrando bien.
```

## Pistas
- Usa input() para entrada de datos
- Convierte a float con float()
- Usa f-strings para formatear
- Calcula porcentajes: (gasto / ingreso) * 100

## Conceptos a Practicar
- Variables y tipos
- input() y print()
- Aritmética básica
- Condicionales if/elif/else
- F-strings
