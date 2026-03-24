-- Base de datos para ejercicio de consultas básicas
CREATE DATABASE tienda_db;

\c tienda_db;

-- Tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO productos (nombre, categoria, precio, stock) VALUES
    ('Laptop HP', 'Electrónica', 899.99, 15),
    ('Mouse Inalámbrico', 'Electrónica', 29.99, 50),
    ('Teclado Mecánico', 'Electrónica', 79.99, 30),
    ('Monitor 24"', 'Electrónica', 199.99, 20),
    ('Silla Gamer', 'Muebles', 249.99, 10),
    ('Escritorio', 'Muebles', 179.99, 8),
    ('Audífonos', 'Electrónica', 59.99, 45),
    ('Webcam HD', 'Electrónica', 49.99, 25),
    ('Lámpara LED', 'Oficina', 34.99, 60),
    ('Organizador', 'Oficina', 19.99, 40);
