# Ejercicio 1: Consultas Básicas

## Caso Real
Aprende SQL básico con PostgreSQL usando datos de empleados.

## Esquema
```sql
CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    departamento VARCHAR(50),
    salario DECIMAL(10,2),
    fecha_contratacion DATE
);
```

## Ejercicios

### 1.1 SELECT básico
```sql
-- Listar todos los empleados
SELECT * FROM empleados;

-- Seleccionar columnas específicas
SELECT nombre, salario FROM empleados;
```

### 1.2 WHERE
```sql
-- Filtrar por condición
SELECT * FROM empleados WHERE departamento = 'IT';

-- Múltiples condiciones
SELECT * FROM empleados WHERE salario > 50000 AND departamento = 'Ventas';
```

### 1.3 ORDER BY
```sql
-- Ordenar resultados
SELECT * FROM empleados ORDER BY salario DESC;
SELECT * FROM empleados ORDER BY fecha_contratacion ASC;
```

### 1.4 LIMIT y OFFSET
```sql
-- Limitar resultados
SELECT * FROM empleados LIMIT 10;
-- Paginación
SELECT * FROM empleados OFFSET 10 LIMIT 10;
```

## Datos de Prueba
```sql
INSERT INTO empleados (nombre, departamento, salario, fecha_contratacion) VALUES
('Ana García', 'IT', 75000, '2020-01-15'),
('Carlos López', 'Ventas', 65000, '2019-03-20'),
('María Rodríguez', 'RRHH', 55000, '2021-06-10'),
('Juan Martínez', 'IT', 80000, '2018-11-05'),
('Laura Sánchez', 'Marketing', 60000, '2022-02-28');
```

## Soluciones
```sql
-- 1. Todos los empleados
SELECT * FROM empleados;

-- 2. Empleados de IT
SELECT * FROM empleados WHERE departamento = 'IT';

-- 3. Salarios mayores a 60000
SELECT nombre, salario FROM empleados WHERE salario > 60000 ORDER BY salario DESC;

-- 4. empleados ordenados por fecha
SELECT * FROM empleados ORDER BY fecha_contratacion DESC LIMIT 3;
```
