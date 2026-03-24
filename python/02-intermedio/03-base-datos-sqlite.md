# Ejercicio 3: Base de Datos SQLite - Sistema de Empleados

## Caso Real
Trabajas en RRHH. Necesitas una base de datos para gestionar la información de empleados de la empresa.

## Esquema de Base de Datos

### Tabla: empleados
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER PRIMARY KEY | Identificador único |
| nombre | TEXT NOT NULL | Nombre completo |
| email | TEXT UNIQUE | Email corporativo |
| departamento | TEXT | Área de trabajo |
| salario | REAL | Salario mensual |
| fecha_contratacion | TEXT | Fecha (YYYY-MM-DD) |
| activo | INTEGER | 1=activo, 0=inactivo |

### Tabla: departamentos
| Columna | Tipo |
|---------|------|
| id | INTEGER PRIMARY KEY |
| nombre | TEXT UNIQUE |
| presupuesto | REAL |

## Requisitos
1. Crear base de datos `empresa.db`
2. Crear tablas con esquema definido
3. CRUD completo de empleados
4. Consultas con JOIN
5. Reportes (total salarios, empleados por departamento)
6. Backup simple (exportar a JSON)

## Estructura
```
proyecto/
├── database.py
├── models.py
├── main.py
└── empresa.db
```

## Ejemplo de Salida
```
=== Sistema de Gestion de Empleados ===

Base de datos: empresa.db

--- Empleados por Departamento ---
Ingenieria: 3 empleados (Total: $45,000)
Ventas: 2 empleados (Total: $22,000)

--- Empleado con Mayor Salario ---
Juan Perez - Ingenieria - $25,000
```

## Pistas
- `sqlite3.connect('archivo.db')` para conectar
- `cursor.execute("SQL")` para ejecutar queries
- Usa transacciones: `conn.commit()`
- `cursor.fetchall()` para obtener resultados
- Context manager `with` para conexiones

## Conceptos a Practicar
- SQLite
- SQL (CREATE, INSERT, SELECT, UPDATE, DELETE)
- JOINs
- Transacciones
- Python DB-API
