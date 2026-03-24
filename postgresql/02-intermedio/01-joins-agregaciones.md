# Ejercicio 1: JOINs y Agregaciones

## Caso Real
Consultas avanzadas con JOINs y funciones de agregación.

## Esquema
Usar la base de datos tienda del ejercicio anterior.

## Ejercicios

### 1.1 INNER JOIN
```sql
-- Pedidos con información del cliente
SELECT 
    p.id AS pedido_id,
    c.nombre AS cliente,
    p.fecha_pedido,
    p.total
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id;
```

### 1.2 LEFT JOIN
```sql
-- Todos los clientes con sus pedidos (incluir los que no tienen pedidos)
SELECT 
    c.nombre,
    COUNT(p.id) AS numero_pedidos,
    COALESCE(SUM(p.total), 0) AS total_gastado
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre;
```

### 1.3 GROUP BY con HAVING
```sql
-- Clientes que han gastado más de $500
SELECT 
    c.nombre,
    SUM(p.total) AS total_gastado
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre
HAVING SUM(p.total) > 500
ORDER BY total_gastado DESC;
```

### 1.4 Subconsultas
```sql
-- Productos cuyo precio está por encima del promedio
SELECT nombre, precio
FROM productos
WHERE precio > (SELECT AVG(precio) FROM productos);

-- Clientes que han hecho más de un pedido
SELECT c.nombre, COUNT(p.id) AS pedidos
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre
HAVING COUNT(p.id) > 1;
```

### 1.5 Funciones de Agregación
```sql
-- Estadísticas de ventas
SELECT 
    COUNT(*) AS total_pedidos,
    SUM(total) AS ingresos_totales,
    AVG(total) AS promedio_pedido,
    MIN(total) AS pedido_minimo,
    MAX(total) AS pedido_maximo
FROM pedidos
WHERE estado = 'completado';
```

## Soluciones
```sql
-- Ejercicio 1: JOIN con detalles
SELECT 
    p.id,
    c.nombre || ' (' || c.email || ')' AS cliente_info,
    pr.nombre AS producto,
    dp.cantidad,
    dp.precio_unitario,
    dp.cantidad * dp.precio_unitario AS subtotal
FROM detalle_pedidos dp
JOIN pedidos p ON dp.pedido_id = p.id
JOIN clientes c ON p.cliente_id = c.id
JOIN productos pr ON dp.producto_id = pr.id;

-- Ejercicio 2: Agregación por categoría
SELECT 
    categoria,
    COUNT(*) AS productos,
    AVG(precio) AS precio_promedio,
    SUM(stock) AS stock_total
FROM productos
GROUP BY categoria;

-- Ejercicio 3: Top 3 clientes
SELECT 
    c.nombre,
    COUNT(p.id) AS pedidos,
    SUM(p.total) AS total
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id
ORDER BY total DESC
LIMIT 3;
```
