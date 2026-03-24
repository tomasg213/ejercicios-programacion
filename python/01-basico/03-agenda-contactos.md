# Ejercicio 3: Agenda de Contactos

## Caso Real
Trabajas en una startup pequeña. Necesitas una agenda simple para gestionar los contactos de clientes.

## Estructura de Contacto
Cada contacto tiene:
- Nombre
- Teléfono
- Email (opcional)
- Categoría (Cliente, Proveedor, Empleado)

## Requisitos
1. Agregar nuevos contactos
2. Buscar contactos por nombre
3. Listar todos los contactos
4. Eliminar contactos por nombre

## Ejemplo de Salida
```
=== Agenda de Contactos ===
1. Agregar contacto
2. Buscar contacto
3. Listar todos
4. Eliminar contacto
5. Salir

Opción: 1

Nombre: Juan Pérez
Teléfono: +34 612 345 678
Email (opcional): juan@email.com
Categoría (Cliente/Proveedor/Empleado): Cliente

Contacto agregado: Juan Pérez

---

Opción: 3

=== Lista de Contactos (2) ===
1. Juan Pérez | +34 612 345 678 | juan@email.com | Cliente
2. María López | +34 623 456 789 | - | Proveedor
```

## Pistas
- Usa un diccionario o lista de diccionarios
- Usa un while True para el menú
- Usa match/case (Python 3.10+) o if/elif para el menú

## Conceptos a Practicar
- Listas y diccionarios
- Funciones
- Bucles (while, for)
- Menús interactivos
- Manejo de datos simples
