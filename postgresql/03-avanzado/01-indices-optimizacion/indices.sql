-- ÍNDICES Y OPTIMIZACIÓN
-- PostgreSQL Performance
-- ========================

-- ============================================
-- CREACIÓN DE ÍNDICES
-- ============================================

-- Índice simple en columna
CREATE INDEX idx_productos_precio ON productos(precio);

-- Índice compuesto
CREATE INDEX idx_pedidos_cliente_fecha ON pedidos(cliente_id, fecha_pedido);

-- Índice único
CREATE UNIQUE INDEX idx_clientes_email ON clientes(email);

-- Índice parcial (solo para filas que cumplen condición)
CREATE INDEX idx_pedidos_pendientes ON pedidos(fecha_pedido)
WHERE estado = 'pendiente';

-- Índice GIN para texto (búsquedas completas)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_productos_nombre_trgm ON productos USING gin (nombre gin_trgm_ops);

-- Índice para búsqueda de texto en español
CREATE INDEX idx_productos_nombre_fts ON productos USING gin (to_tsvector('spanish', nombre));

-- ============================================
-- ANÁLISIS DE CONSULTAS CON EXPLAIN
-- ============================================

-- Sin índice: Seq Scan (escaneo secuencial)
EXPLAIN SELECT * FROM productos WHERE categoria = 'Electrónica';

-- Con índice: Index Scan o Index Only Scan
CREATE INDEX idx_productos_categoria ON productos(categoria);
EXPLAIN SELECT * FROM productos WHERE categoria = 'Electrónica';

-- EXPLAIN ANALYZE (ejecuta y muestra tiempo real)
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT p.nombre, p.precio, c.nombre as categoria
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
WHERE p.precio > 100;

-- ============================================
-- CONSULTAS LENTAS - IDENTIFICACIÓN
-- ============================================

-- Habilitar tracking de consultas lentas
ALTER SYSTEM SET log_min_duration_statement = 1000; -- 1 segundo
SELECT pg_reload_conf();

-- Ver consultas en ejecución
SELECT pid, now() - query_start as duracion, state, query
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duracion DESC;

-- Matar consulta lenta
-- SELECT pg_terminate_backend(pid);

-- Ver estadísticas de uso de índices
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan;

-- ============================================
-- OPTIMIZACIÓN DE CONSULTAS
-- ============================================

-- Optimización 1: Usar EXISTS en lugar de IN para subconsultas
-- LENTO:
SELECT * FROM clientes WHERE id IN (SELECT cliente_id FROM pedidos);

-- RÁPIDO:
SELECT * FROM clientes c WHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id);

-- Optimización 2: JOIN vs subconsulta
-- LENTO (subconsulta correlacionada):
SELECT p.nombre,
    (SELECT SUM(dp.cantidad) FROM detalle_pedidos dp WHERE dp.producto_id = p.id) as total_vendido
FROM productos p;

-- RÁPIDO (JOIN):
SELECT p.nombre, COALESCE(SUM(dp.cantidad), 0) as total_vendido
FROM productos p
LEFT JOIN detalle_pedidos dp ON p.id = dp.producto_id
GROUP BY p.id, p.nombre;

-- Optimización 3: CTE (Common Table Expression)
WITH ventas_por_producto AS (
    SELECT producto_id, SUM(cantidad) as total
    FROM detalle_pedidos
    GROUP BY producto_id
)
SELECT p.nombre, v.total
FROM productos p
JOIN ventas_por_producto v ON p.id = v.producto_id
ORDER BY v.total DESC;

-- ============================================
-- VACUUM Y ANALYZE
-- ============================================

-- Limpiar tabla y actualizar estadísticas
VACUUM ANALYZE productos;

-- Ver tamaño de tablas e índices
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||indexrelname)) as index_size
FROM pg_stat_user_indexes
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================
-- PARTITIONING (Tablas particionadas)
-- ============================================

-- Crear tabla particionada por fecha
CREATE TABLE ventas (
    id SERIAL,
    fecha DATE NOT NULL,
    producto_id INTEGER,
    cantidad INTEGER,
    precio DECIMAL
) PARTITION BY RANGE (fecha);

-- Crear particiones por mes
CREATE TABLE ventas_2024_01 PARTITION OF ventas
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE ventas_2024_02 PARTITION OF ventas
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

CREATE TABLE ventas_2024_03 PARTITION OF ventas
    FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');

-- Insertar datos (se distribuyen automáticamente)
INSERT INTO ventas (fecha, producto_id, cantidad, precio)
SELECT '2024-01-15', 1, 5, 100.00;

-- ============================================
-- EJERCICIOS PRÁCTICOS
-- ============================================

-- Ejercicio 1: Crear índice para optimizar esta consulta
-- SELECT * FROM pedidos WHERE cliente_id = 1 AND fecha_pedido > '2024-01-01';
CREATE INDEX idx_pedidos_cliente_fecha ON pedidos(cliente_id, fecha_pedido);

-- Ejercicio 2: Analizar y optimizar la siguiente consulta
EXPLAIN (ANALYZE, BUFFERS)
SELECT c.nombre, COUNT(p.id) as num_pedidos
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre
HAVING COUNT(p.id) > 1;

-- Ejercicio 3: Crear índice para búsqueda de texto
CREATE INDEX idx_productos_busqueda ON productos USING gin (to_tsvector('spanish', nombre || ' ' || COALESCE(descripcion, '')));
