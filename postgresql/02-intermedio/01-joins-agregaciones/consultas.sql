-- EJERCICIO 2: Base de Datos Tienda - Completo
-- ==============================================

-- PRÁCTICA 1: Schema completo con más tablas

-- Tabla categorías (nueva)
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Agregar foreign key a productos
ALTER TABLE productos ADD COLUMN categoria_id INTEGER REFERENCES categorias(id);

-- Insertar categorías
INSERT INTO categorias (nombre, descripcion) VALUES
    ('Electrónica', 'Dispositivos y accesorios electrónicos'),
    ('Accesorios', 'Periféricos y complementos'),
    ('Audio', 'Auriculares, altavoces y sonido');

-- Actualizar productos con categorías
UPDATE productos SET categoria_id = 1 WHERE categoria = 'Electrónica';
UPDATE productos SET categoria_id = 2 WHERE categoria = 'Accesorios';
UPDATE productos SET categoria_id = 3 WHERE categoria = 'Audio';

-- PRÁCTICA 2: JOINs avanzados

-- 2.1 INNER JOIN - Productos con categoría
SELECT p.nombre, p.precio, c.nombre as categoria
FROM productos p
INNER JOIN categorias c ON p.categoria_id = c.id;

-- 2.2 LEFT JOIN - Todos los clientes y sus pedidos
SELECT c.nombre, p.id as pedido_id, p.total
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
ORDER BY c.nombre;

-- 2.3 RIGHT JOIN - Todos los pedidos aunque no tengan cliente
SELECT c.nombre, p.id, p.total
FROM clientes c
RIGHT JOIN pedidos p ON c.id = p.cliente_id;

-- 2.4 Múltiples JOINs
SELECT 
    c.nombre as cliente,
    p.id as pedido,
    pr.nombre as producto,
    dp.cantidad
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
JOIN detalle_pedidos dp ON p.id = dp.pedido_id
JOIN productos pr ON dp.producto_id = pr.id
ORDER BY c.nombre, p.id;

-- PRÁCTICA 3: GROUP BY y agregaciones

-- 3.1 Contar productos por categoría
SELECT c.nombre, COUNT(p.id) as num_productos
FROM categorias c
LEFT JOIN productos p ON c.id = p.categoria_id
GROUP BY c.id, c.nombre;

-- 3.2 Sumar ventas por cliente
SELECT 
    c.nombre,
    COUNT(p.id) as num_pedidos,
    COALESCE(SUM(p.total), 0) as total_gastado,
    COALESCE(AVG(p.total), 0) as ticket_promedio
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre;

-- 3.3 Productos con más ventas
SELECT 
    pr.nombre,
    SUM(dp.cantidad) as unidades_vendidas,
    SUM(dp.precio_unitario * dp.cantidad) as revenue
FROM productos pr
JOIN detalle_pedidos dp ON pr.id = dp.producto_id
GROUP BY pr.id, pr.nombre
ORDER BY unidades_vendidas DESC
LIMIT 5;

-- 3.4 Ventas por día
SELECT 
    DATE(fecha_pedido) as dia,
    COUNT(*) as num_pedidos,
    SUM(total) as total_ventas
FROM pedidos
GROUP BY DATE(fecha_pedido)
ORDER BY dia DESC;

-- PRÁCTICA 4: Subconsultas

-- 4.1 Clientes que han gastado más del promedio
SELECT c.nombre, SUM(p.total) as total
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre
HAVING SUM(p.total) > (SELECT AVG(total) FROM pedidos);

-- 4.2 Producto más caro por categoría
SELECT p.nombre, p.precio, c.nombre as categoria
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
WHERE p.precio = (
    SELECT MAX(p2.precio) 
    FROM productos p2 
    WHERE p2.categoria_id = p.categoria_id
);

-- 4.3 Clientes sin pedidos
SELECT nombre FROM clientes
WHERE id NOT IN (SELECT cliente_id FROM pedidos WHERE cliente_id IS NOT NULL);

-- 4.4 Productos cuyo precio está por encima del promedio de su categoría
SELECT p.nombre, p.precio, c.nombre, AVG(p.precio) OVER (PARTITION BY c.id) as promedio_categoria
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
WHERE p.precio > (
    SELECT AVG(p2.precio) 
    FROM productos p2 
    WHERE p2.categoria_id = p.categoria_id
);
