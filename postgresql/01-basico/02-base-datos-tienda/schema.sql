-- Esquema base de datos tienda
-- PostgreSQL 01-basico: Base de Datos Tienda

-- Crear tabla clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_registro DATE DEFAULT CURRENT_DATE
);

-- Crear tabla productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    categoria VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendiente',
    total DECIMAL(10,2)
);

-- Crear tabla detalle_pedidos
CREATE TABLE detalle_pedidos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id),
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL
);

-- Insertar clientes
INSERT INTO clientes (nombre, email, telefono, direccion) VALUES
('Ana García', 'ana@email.com', '555-0101', 'Calle Principal 123'),
('Carlos López', 'carlos@email.com', '555-0102', 'Avenida Central 456'),
('María Rodríguez', 'maria@email.com', '555-0103', 'Plaza Mayor 789');

-- Insertar productos
INSERT INTO productos (nombre, descripcion, precio, stock, categoria) VALUES
('Laptop Pro', 'Laptop 15 pulgadas', 1299.99, 10, 'Electrónica'),
('Mouse Inalámbrico', 'Mouse wireless', 49.99, 50, 'Accesorios'),
('Teclado Mecánico', 'Teclado RGB', 149.99, 30, 'Accesorios'),
('Monitor 4K', 'Monitor 27 pulgadas', 499.99, 15, 'Electrónica'),
('Auriculares', 'Noise cancelling', 299.99, 25, 'Audio');

-- Insertar pedidos
INSERT INTO pedidos (cliente_id, estado, total) VALUES
(1, 'completado', 1349.98),
(2, 'pendiente', 299.99),
(1, 'enviado', 199.98);

-- Insertar detalle de pedidos
INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 1299.99),
(1, 2, 1, 49.99),
(2, 5, 1, 299.99),
(3, 2, 2, 49.99),
(3, 3, 1, 149.99);

-- Consultas de práctica

-- 1. Listar todos los clientes
SELECT * FROM clientes;

-- 2. Productos con stock mayor a 20
SELECT nombre, precio, stock FROM productos WHERE stock > 20;

-- 3. Pedidos con su cliente
SELECT p.id, c.nombre, p.fecha_pedido, p.total 
FROM pedidos p 
JOIN clientes c ON p.cliente_id = c.id;

-- 4. Total de ventas por cliente
SELECT c.nombre, SUM(p.total) as total_gastado
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre;

-- 5. Productos más vendidos
SELECT pr.nombre, SUM(dp.cantidad) as cantidad_vendida
FROM detalle_pedidos dp
JOIN productos pr ON dp.producto_id = pr.id
GROUP BY pr.id, pr.nombre
ORDER BY cantidad_vendida DESC;
