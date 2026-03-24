# Ejercicio 2: Validador de Email

## Caso Real
Trabajas en el desarrollo de un sistema de registro. Necesitas validar que los emails tengan formato correcto antes de guardarlos.

## Reglas de Validación
Un email válido debe:
1. Contener exactamente un @
2. Tener contenido antes del @
3. Tener contenido después del @ (dominio)
4. El dominio debe tener al menos un punto (ej: gmail.com)
5. No debe tener espacios

## Requisitos
1. Solicitar un email al usuario
2. Validar según todas las reglas
3. Indicar si es válido o no
4. Mostrar qué regla específica falla (si aplica)

## Ejemplo de Salida
```
=== Validador de Email ===
Ingrese email: usuario@ejemplo.com

Email: usuario@ejemplo.com
Estado: VÁLIDO ✓

---
Otro ejemplo:
Ingrese email: usuario@@ejemplo.com

Email: usuario@@ejemplo.com
Estado: INVÁLIDO ✗
Razón: Tiene más de un @
```

## Pistas
- `email.count('@')` cuenta los @
- `email.split('@')` separa por @
- `email.strip()` elimina espacios
- `email.find(' ')` busca espacios

## Conceptos a Practicar
- Métodos de strings
- Condicionales múltiples
- Operadores lógicos (and, or, not)
- Early return pattern
