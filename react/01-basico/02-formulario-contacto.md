# Ejercicio 2: Formulario de Contacto

## Caso Real
Trabajas en el equipo de frontend de una empresa. Necesitas crear un formulario de contacto con validación que envíe los datos a una API simulada.

## Requisitos
1. Campos: nombre, email, teléfono, mensaje
2. Validación en tiempo real
3. Estados de carga, éxito y error
4. Mostrar errores específicos por campo
5. Reset del formulario después de envío exitoso

## Reglas de Validación
- **Nombre**: mínimo 2 caracteres
- **Email**: formato válido (regex)
- **Teléfono**: 9-15 dígitos
- **Mensaje**: mínimo 10 caracteres

## Ejemplo de Salida
```
=== Formulario de Contacto ===

Nombre: [Juan          ] (✓)
Email:  [juan@          ] (✗) Error: Email inválido
Teléfono: [612345678    ] (✓)
Mensaje: [              ]
         [              ]

[Enviar] [Limpiar]

--- Estado: Enviando...
--- Estado: ✓ Mensaje enviado correctamente
```

## Estructura de Archivos
```
02-formulario-contacto/
├── src/
│   ├── components/
│   │   ├── CampoFormulario.jsx
│   │   ├── Validacion.js
│   │   └── Formulario.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Pistas
- Usa `useState` para el estado del formulario
- Crea funciones de validación separadas
- Usa el evento `onChange` para validación en tiempo real
- Simula API con `setTimeout`

## Conceptos a Practicar
- Formularios controlados
- Validación de formularios
- Estados múltiples (loading, success, error)
- Conditional rendering

## Desafío Extra
- Agrega debounce a la validación
- Implementa "guardar como borrador" en localStorage
- Añade validación de teléfono con libphonenumber
