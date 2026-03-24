# Ejercicio 3: Calculadora de Propinas

## Caso Real
Trabajas en un restaurante y necesitas un sistema que calcule automáticamente las propinas según el nivel de servicio.

## Especificaciones
- **Servicio excelente**: 20% de propina
- **Buen servicio**: 15% de propina
- **Servicio regular**: 10% de propina
- **Mal servicio**: 5% de propina

Además, el restaurante permite dividir la cuenta entre varios comensales.

## Requisitos
1. Solicitar el monto total de la cuenta
2. Solicitar el nivel de servicio (1-4)
3. (Opcional) Solicitar número de personas para dividir
4. Mostrar desglose completo

## Ejemplo de Salida
```
=== Calculadora de Propinas ===
Cuenta total: $150.00
Nivel de servicio (1=excelente, 2=bueno, 3=regular, 4=mal): 1
Número de personas (1 para solo): 3
---
Subtotal: $150.00
Propina (20%): $30.00
Total: $180.00
---
Por persona: $60.00
```

## Pistas
- Crea constantes para los porcentajes
- Usa un objeto o switch para el nivel de servicio
- Calcula la división al final

## Conceptos a Practicar
- Constantes
- Operador switch
- Funciones
- Math.round() para decimales
