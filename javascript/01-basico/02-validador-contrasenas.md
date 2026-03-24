# Ejercicio 2: Validador de Contraseñas

## Caso Real
Trabajas en el equipo de seguridad de una aplicación web. Necesitas implementar la validación de contraseñas para el registro de usuarios.

## Especificaciones
La contraseña debe cumplir TODOS estos requisitos:
- Mínimo 8 caracteres
- Al menos 1 letra mayúscula
- Al menos 1 letra minúscula
- Al menos 1 número
- Al menos 1 carácter especial (!@#$%^&*)

## Requisitos
1. Solicitar una contraseña al usuario
2. Verificar cada requisito individualmente
3. Mostrar cuáles requisitos cumple y cuáles no
4. Indicar si la contraseña es válida o no

## Ejemplo de Salida
```
Ingrese contraseña: Hola123
---
Verificación de contraseña:
✓ Mínimo 8 caracteres (8)
✗ Al menos 1 mayúscula
✓ Al menos 1 minúscula
✓ Al menos 1 número
✗ Al menos 1 carácter especial
---
Estado: INVÁLIDA
Razón: Faltan mayúsculas, carácter especial
```

## Pistas
- `string.length` para longitud
- `string.match(/[A-Z]/)` para buscar mayúsculas
- `string.match(/[0-9]/)` para buscar números
- `string.includes()` también funciona para caracteres

## Conceptos a Practicar
- Métodos de strings
- Expresiones regulares básicas
- Operadores lógicos (&&)
- Arrays y su método `.push()`
