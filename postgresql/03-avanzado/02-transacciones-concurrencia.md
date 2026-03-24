# Ejercicio 2: Transacciones y Concurrencia

## Caso Real
Manejo de transacciones y control de concurrencia en PostgreSQL.

## Transacciones

### 1.1 BEGIN, COMMIT, ROLLBACK
```sql
BEGIN;
    UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;
    UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;
COMMIT;
```

### 1.2 SAVEPOINT
```sql
BEGIN;
    INSERT INTO productos (nombre, precio) VALUES ('Producto A', 50);
    SAVEPOINT sp1;
    INSERT INTO productos (nombre, precio) VALUES ('Producto B', 75);
    ROLLBACK TO SAVEPOINT sp1;
COMMIT;
```

## Aislamiento

### Niveles de aislamiento
```sql
-- Set transaction isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

### Problemas de concurrencia

#### Lectura sucia (Dirty Read)
```sql
-- Transaction 1
BEGIN;
UPDATE productos SET precio = 999 WHERE id = 1;

-- Transaction 2 (lee el valor no comprometido)
SELECT precio FROM productos WHERE id = 1; -- 999 (no confirmado)

-- Transaction 1
ROLLBACK; -- Deshace el cambio
```

#### Lectura no repetible
```sql
-- Transaction 1
BEGIN;
SELECT SUM(total) FROM pedidos; -- 1000

-- Transaction 2
BEGIN;
INSERT INTO pedidos (cliente_id, total) VALUES (1, 500);
COMMIT;

-- Transaction 1
SELECT SUM(total) FROM pedidos; -- 1500 (diferente!)
COMMIT;
```

## Bloqueos

### Bloqueo de tabla
```sql
-- Bloqueo exclusivo
LOCK TABLE productos IN EXCLUSIVE MODE;

-- Bloqueo de fila
SELECT * FROM productos WHERE id = 1 FOR UPDATE;
```

### Manejo de deadlocks
```sql
-- Ver bloqueos activos
SELECT * FROM pg_locks WHERE NOT granted;

-- Ver transacciones bloqueadas
SELECT 
    blocked_locks.pid AS blocked_pid,
    blocked_activity.usename AS blocked_user,
    blocking_locks.pid AS blocking_pid,
    blocking_activity.usename AS blocking_user,
    blocked_activity.query AS blocked_query,
    blocking_activity.query AS blocking_query
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_locks blocking_locks 
    ON blocked_locks.relation = blocking_locks.relation
JOIN pg_catalog.pg_stat_activity blocked_activity 
    ON blocked_locks.pid = blocked_activity.pid
JOIN pg_catalog.pg_stat_activity blocking_activity 
    ON blocking_locks.pid = blocking_activity.pid
WHERE NOT blocked_locks.granted;
```

## Ejercicios Prácticos
```sql
-- 1. Transferencia entre cuentas (transacción atómica)
BEGIN;
    UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1;
    UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;
COMMIT;

-- 2. Insertar pedido con validación de stock (con control de errores)
DO $$
BEGIN
    UPDATE productos SET stock = stock - 1 WHERE id = 1 AND stock > 0;
    IF FOUND THEN
        INSERT INTO pedidos (cliente_id, total) VALUES (1, 299.99);
    ELSE
        RAISE EXCEPTION 'Stock insuficiente';
    END IF;
END $$;

-- 3. Serializable transaction para reportes
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT categoria, COUNT(*), SUM(stock) FROM productos GROUP BY categoria;
COMMIT;
```
