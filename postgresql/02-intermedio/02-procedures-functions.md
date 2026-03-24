# Ejercicio 2: Procedures y Functions

## Caso Real
Crea funciones y procedimientos almacenados en PostgreSQL.

## Funciones

### Función que calcula descuento
```sql
CREATE OR REPLACE FUNCTION calcular_descuento(precio DECIMAL, porcentaje DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
    RETURN precio - (precio * porcentaje / 100);
END;
$$ LANGUAGE plpgsql;

-- Uso
SELECT nombre, precio, calcular_descuento(precio, 10) AS precio_descuento
FROM productos;
```

### Función con RETURN TABLE
```sql
CREATE OR REPLACE FUNCTION obtener_cliente_pedidos(cliente_id INTEGER)
RETURNS TABLE(
    pedido_id INTEGER,
    fecha TIMESTAMP,
    total DECIMAL,
    estado VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id, p.fecha_pedido, p.total, p.estado
    FROM pedidos p
    WHERE p.cliente_id = obtener_cliente_pedidos.cliente_id;
END;
$$ LANGUAGE plpgsql;
```

## Procedimientos

### Procedimiento para crear pedido
```sql
CREATE OR REPLACE PROCEDURE crear_pedido(
    p_cliente_id INTEGER,
    p_total DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO pedidos (cliente_id, total)
    VALUES (p_cliente_id, p_total);
END;
$$;

-- Llamar al procedimiento
CALL crear_pedido(1, 199.99);
```

### Procedimiento con transacciones
```sql
CREATE OR REPLACE PROCEDURE actualizar_stock(
    p_producto_id INTEGER,
    p_cantidad INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE productos 
    SET stock = stock + p_cantidad 
    WHERE id = p_producto_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Producto no encontrado';
    END IF;
END;
$$;
```

## Triggers

### Trigger para actualizar stock automáticamente
```sql
CREATE OR REPLACE FUNCTION actualizar_stock_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cantidad > 0 THEN
        UPDATE productos 
        SET stock = stock - NEW.cantidad 
        WHERE id = NEW.producto_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_stock
AFTER INSERT ON detalle_pedidos
FOR EACH ROW
EXECUTE FUNCTION actualizar_stock_trigger();
```
