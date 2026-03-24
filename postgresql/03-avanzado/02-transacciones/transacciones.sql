-- TRANSACCIONES Y CONCURRENCIA
-- PostgreSQL ACID
-- ====================

-- ============================================
-- CONCEPTOS BÁSICOS DE TRANSACCIONES
-- ============================================

-- Transacción simple
BEGIN;
    UPDATE productos SET stock = stock - 1 WHERE id = 1;
    INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario)
    VALUES (1, 1, 1, 99.99);
COMMIT;

-- Transacción con ROLLBACK
BEGIN;
    UPDATE productos SET precio = precio * 1.10 WHERE id = 1;
    -- Algo sale mal
    ROLLBACK;

-- ============================================
-- NIVELES DE AISLAMIENTO
-- ============================================

-- Read Uncommitted (poco usado en PostgreSQL)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- Read Committed (default)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Repeatable Read
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Serializable (el más restrictivo)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Verificar nivel actual
SHOW transaction_isolation;

-- ============================================
-- SAVEPOINTS
-- ============================================

BEGIN;
    INSERT INTO clientes (nombre, email) VALUES ('Test', 'test@email.com');
    
    SAVEPOINT primer_savepoint;
    
    INSERT INTO pedidos (cliente_id, total) VALUES (currval('clientes_id_seq'), 100);
    
    ROLLBACK TO SAVEPOINT primer_savepoint;
    
    -- Continuar con otras operaciones
    INSERT INTO pedidos (cliente_id, total) VALUES (currval('clientes_id_seq'), 200);
    
COMMIT;

-- ============================================
-- LOCKING (Bloqueos)
-- ============================================

-- Bloqueo explícito de tabla
LOCK TABLE clientes IN SHARE MODE;

-- Bloqueo de fila
SELECT * FROM productos WHERE id = 1 FOR UPDATE;

-- Bloqueo compartido (otros pueden leer pero no modificar)
SELECT * FROM productos WHERE id = 1 FOR SHARE;

-- Ver bloqueos activos
SELECT 
    l.locktype,
    l.relation::regclass,
    l.mode,
    l.granted,
    a.usename,
    a.query
FROM pg_locks l
JOIN pg_stat_activity a ON l.pid = a.pid
WHERE NOT l.granted;

-- Matar proceso bloqueante
-- SELECT pg_cancel_backend(pid);
-- SELECT pg_terminate_backend(pid);

-- ============================================
-- CONCURRENCIA CON UPDATE
-- ============================================

-- Problema: Dos transacciones leen y modifican el mismo valor
-- Transacción 1: Lee stock = 10
-- Transacción 2: Lee stock = 10
-- Transacción 1: Actualiza stock = 9
-- Transacción 2: Actualiza stock = 9 (debería ser 8!)

-- Solución: SELECT FOR UPDATE
BEGIN;
    SELECT stock FROM productos WHERE id = 1 FOR UPDATE;
    -- Ahora el stock está bloqueado
    UPDATE productos SET stock = stock - 1 WHERE id = 1;
COMMIT;

-- Solución alternativa: UPDATE atómico
UPDATE productos 
SET stock = stock - 1 
WHERE id = 1 AND stock >= 1
RETURNING *;

-- ============================================
-- TRANSACCIONES ANIDADAS EN APLICACIÓN
-- ============================================

-- Ejemplo con Python (pseudo-código)
-- with psycopg2.connect() as conn:
--     with conn.transaction():
--         cursor.execute("UPDATE productos SET stock = stock - %s WHERE id = %s", (cantidad, producto_id))
--         with conn.transaction():
--             cursor.execute("INSERT INTO pedidos (...) VALUES (...)")
--             cursor.execute("INSERT INTO detalle_pedidos (...) VALUES (...)")

-- ============================================
-- MANEJO DE CONFLICTOS
-- ============================================

-- Retry logic para transacciones serializables
-- psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT
-- try:
--     cursor.execute("BEGIN ISOLATION LEVEL SERIALIZABLE")
--     cursor.execute("UPDATE...")
--     cursor.execute("COMMIT")
-- except psycopg2.errors.SerializationFailure:
--     cursor.execute("ROLLBACK")
--     # Reintentar transacción

-- ============================================
-- PROCEDIMIENTO TRANSFERENCIA BANCARIA
-- ============================================

CREATE OR REPLACE PROCEDURE transferencia(
    p_cuenta_origen INTEGER,
    p_cuenta_destino INTEGER,
    p_monto DECIMAL
) AS $$
BEGIN
    -- Verificar saldo suficiente
    IF (SELECT saldo FROM cuentas WHERE id = p_cuenta_origen) < p_monto THEN
        RAISE EXCEPTION 'Saldo insuficiente';
    END IF;
    
    -- Iniciar transacción implícita
    BEGIN
        -- Debitar origen
        UPDATE cuentas SET saldo = saldo - p_monto WHERE id = p_cuenta_origen;
        
        -- Creditar destino
        UPDATE cuentas SET saldo = saldo + p_monto WHERE id = p_cuenta_destino;
        
        -- Registrar transacción
        INSERT INTO transacciones (cuenta_origen, cuenta_destino, monto)
        VALUES (p_cuenta_origen, p_cuenta_destino, p_monto);
        
        RAISE NOTICE 'Transferencia exitosa: % -> % : %', p_cuenta_origen, p_cuenta_destino, p_monto;
        
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Transferencia fallida: %', SQLERRM;
        RAISE; -- Re-lanza el error
    END;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- EJERCICIOS PRÁCTICOS
-- ============================================

-- Ejercicio 1: Crear tabla de inventario y hacer update seguro
CREATE TABLE inventario (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    version INTEGER DEFAULT 1
);

-- Función para actualizar con control de versiones (optimistic locking)
CREATE OR REPLACE FUNCTION actualizar_inventario(
    p_producto_id INTEGER,
    p_cantidad INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    filas_afectadas INTEGER;
BEGIN
    UPDATE inventario
    SET cantidad = cantidad - p_cantidad,
        version = version + 1
    WHERE producto_id = p_producto_id
      AND cantidad >= p_cantidad
      AND version = (SELECT version FROM inventario WHERE producto_id = p_producto_id);
    
    GET DIAGNOSTICS filas_afectadas = ROW_COUNT;
    
    RETURN filas_afectadas > 0;
END;
$$ LANGUAGE plpgsql;

-- Ejercicio 2: Transacción para pedido atómico
CREATE OR REPLACE FUNCTION crear_pedido_atomico(
    p_cliente_id INTEGER,
    p_productos JSONB
) RETURNS INTEGER AS $$
DECLARE
    v_pedido_id INTEGER;
    v_item JSONB;
BEGIN
    -- Crear pedido
    INSERT INTO pedidos (cliente_id, estado, total)
    VALUES (p_cliente_id, 'completado', 0)
    RETURNING id INTO v_pedido_id;
    
    -- Procesar productos
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_productos)
    LOOP
        -- Decrementar stock (debe haber stock disponible)
        UPDATE productos
        SET stock = stock - (v_item->>'cantidad')::INTEGER
        WHERE id = (v_item->>'producto_id')::INTEGER
          AND stock >= (v_item->>'cantidad')::INTEGER;
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Stock insuficiente para producto %', (v_item->>'producto_id')::INTEGER;
        END IF;
        
        -- Crear detalle
        INSERT INTO detalle_pedidos (
            pedido_id, producto_id, cantidad, 
            precio_unitario, subtotal
        )
        SELECT 
            v_pedido_id,
            (v_item->>'producto_id')::INTEGER,
            (v_item->>'cantidad')::INTEGER,
            precio,
            precio * (v_item->>'cantidad')::INTEGER
        FROM productos
        WHERE id = (v_item->>'producto_id')::INTEGER;
    END LOOP;
    
    -- Calcular total
    UPDATE pedidos
    SET total = (
        SELECT SUM(subtotal) FROM detalle_pedidos WHERE pedido_id = v_pedido_id
    )
    WHERE id = v_pedido_id;
    
    RETURN v_pedido_id;
END;
$$ LANGUAGE plpgsql;
