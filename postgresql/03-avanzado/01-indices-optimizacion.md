# Ejercicio 1: Índices y Optimización

## Caso Real
Aprende a crear índices y optimizar consultas en PostgreSQL.

## Índices

### 1.1 Índice básico
```sql
-- Crear índice simple
CREATE INDEX idx_productos_categoria ON productos(categoria);

-- Índice compuesto
CREATE INDEX idx_pedidos_cliente_fecha ON pedidos(cliente_id, fecha_pedido);

-- Índice único
CREATE INDEX idx_clientes_email ON clientes(email);
```

### 1.2 Índice con condición WHERE
```sql
-- Índice parcial para pedidos completados
CREATE INDEX idx_pedidos_completados ON pedidos(fecha_pedido)
WHERE estado = 'completado';
```

### 1.3 Índice para búsqueda de texto
```sql
--GIN index para búsqueda de texto
CREATE INDEX idx_productos_nombre ON productos USING gin(to_tsvector('spanish', nombre));
```

## Optimización

### EXPLAIN ANALYZE
```sql
EXPLAIN ANALYZE
SELECT * FROM pedidos p
JOIN clientes c ON p.cliente_id = c.id
WHERE c.nombre LIKE '%García%';
```

### Optimizaciones
```sql
-- Evitar SELECT *
SELECT p.id, p.total, c.nombre
FROM pedidos p
JOIN clientes c ON p.cliente_id = c.id;

-- Usar EXISTS en lugar de IN
SELECT nombre FROM clientes c
WHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id);

-- Usar LIMIT apropiadamente
SELECT * FROM productos ORDER BY precio DESC LIMIT 10;
```

## Ejercicios
```sql
-- 1. Crear índice para búsquedas por email
CREATE INDEX idx_clientes_email ON clientes(email);

-- 2. Crear índice para búsquedas por fecha
CREATE INDEX idx_pedidos_fecha ON pedidos(fecha_pedido);

-- 3. Ver plan de ejecución
EXPLAIN SELECT * FROM productos WHERE categoria = 'Electrónica';

-- 4. Crear índice compuesto
CREATE INDEX idx_productos_cat_precio ON productos(categoria, precio);

-- 5. ANALYZE para actualizar estadísticas
ANALYZE productos;
```
