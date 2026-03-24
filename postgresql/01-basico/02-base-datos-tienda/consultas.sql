-- CONSULTAS SOBRE LA BASE DE DATOS TIENDA
-- ========================================

-- 1. Listar todos los clientes
SELECT * FROM clientes;

-- 2. Ver productos con nombre de categoría
SELECT p.nombre, p.precio, c.nombre as categoria
FROM productos p
JOIN categorias c ON p.categoria_id = c.id;

-- 3. Ver pedidos con nombre de cliente
SELECT pe.id, cl.nombre, pe.fecha_pedido, pe.estado, pe.total
FROM pedidos pe
JOIN clientes cl ON pe.cliente_id = cl.id;

-- 4. Detalle completo de un pedido
SELECT 
    dp.id,
    p.nombre as producto,
    dp.cantidad,
    dp.precio_unitario,
    dp.subtotal
FROM detalle_pedidos dp
JOIN productos p ON dp.producto_id = p.id
WHERE dp.pedido_id = 1;

-- 5. Pedidos por cliente
SELECT 
    cl.nombre,
    COUNT(pe.id) as num_pedidos,
    SUM(pe.total) as total_gastado
FROM clientes cl
LEFT JOIN pedidos pe ON cl.id = pe.cliente_id
GROUP BY cl.id, cl.nombre;

-- 6. Productos más vendidos
SELECT 
    p.nombre,
    SUM(dp.cantidad) as unidades_vendidas,
    SUM(dp.subtotal) as revenue
FROM productos p
JOIN detalle_pedidos dp ON p.id = dp.producto_id
GROUP BY p.id, p.nombre
ORDER BY unidades_vendidas DESC;

-- 7. Stock bajo (menos de 20 unidades)
SELECT nombre, stock FROM productos WHERE stock < 20;

-- 8. Productos sin ventas
SELECT p.nombre, p.stock
FROM productos p
LEFT JOIN detalle_pedidos dp ON p.id = dp.producto_id
WHERE dp.id IS NULL;

-- 9. Pedidos por estado
SELECT estado, COUNT(*) as cantidad FROM pedidos GROUP BY estado;

-- 10. Ticket promedio por método de pago
SELECT 
    metodo_pago,
    COUNT(*) as num_pedidos,
    AVG(total) as ticket_promedio
FROM pedidos
GROUP BY metodo_pago;
