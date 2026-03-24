-- DATOS DE EJEMPLO
-- =================

-- Insertar clientes
INSERT INTO clientes (nombre, email, telefono, direccion, ciudad) VALUES
    ('Juan Pérez', 'juan@email.com', '555-1234', 'Calle Principal 123', 'Madrid'),
    ('María García', 'maria@email.com', '555-5678', 'Av. Central 456', 'Barcelona'),
    ('Carlos López', 'carlos@email.com', '555-9012', 'Plaza Mayor 789', 'Valencia'),
    ('Ana Martínez', 'ana@email.com', '555-3456', 'C/ Gran Vía 321', 'Sevilla'),
    ('Pedro Sánchez', 'pedro@email.com', '555-7890', 'Paseo Marítimo 654', 'Málaga');

-- Insertar categorías
INSERT INTO categorias (nombre, descripcion) VALUES
    ('Electrónica', 'Dispositivos electrónicos y accesorios'),
    ('Muebles', 'Mobiliario para hogar y oficina'),
    ('Ropa', 'Vestimenta y accesorios de moda'),
    ('Deportes', 'Equipos y accesorios deportivos'),
    ('Libros', 'Literatura y materiales de lectura');

-- Insertar productos
INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES
    ('Laptop HP 15"', 'Portátil con 8GB RAM, 256GB SSD', 599.99, 15, 1),
    ('Mouse Inalámbrico', 'Ratón wireless con receptor USB', 24.99, 50, 1),
    ('Teclado Mecánico', 'Teclado RGB para gaming', 89.99, 30, 1),
    ('Monitor 24" LED', 'Pantalla Full HD 1920x1080', 149.99, 20, 1),
    ('Auriculares Bluetooth', 'Audio inalámbrico con micrófono', 49.99, 40, 1),
    ('Silla Gamer', 'Silla ergonómica para gaming', 249.99, 10, 2),
    ('Escritorio Regulable', 'Mesa de trabajo altura ajustable', 329.99, 8, 2),
    ('Estantería Modular', 'Mueble de almacenamiento 5 niveles', 79.99, 25, 2),
    ('Camiseta Deportiva', 'Camiseta técnica para running', 29.99, 100, 3),
    ('Zapatillas Running', 'Calzado ligero para corredores', 89.99, 35, 3),
    ('Pelota de Fútbol', 'Balón oficial tamaño 5', 24.99, 50, 4),
    ('Raqueta de Tenis', 'Raqueta profesional de grafito', 129.99, 15, 4),
    ('Novela Bestseller', 'Éxito de ventas 2024', 19.99, 80, 5),
    ('Manual de Programación', 'Guía completa de Python', 34.99, 30, 5);

-- Insertar pedidos
INSERT INTO pedidos (cliente_id, fecha_pedido, estado, total, metodo_pago) VALUES
    (1, '2024-01-15 10:30:00', 'completado', 669.98, 'tarjeta'),
    (2, '2024-01-16 14:20:00', 'completado', 174.98, 'paypal'),
    (1, '2024-01-18 09:15:00', 'enviado', 49.99, 'tarjeta'),
    (3, '2024-01-19 16:45:00', 'pendiente', 359.98, 'transferencia'),
    (4, '2024-01-20 11:00:00', 'completado', 89.99, 'tarjeta');

-- Insertar detalles de pedidos
INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES
    (1, 1, 1, 599.99, 599.99),
    (1, 2, 2, 24.99, 49.98),
    (2, 3, 1, 89.99, 89.99),
    (2, 4, 1, 149.99, 149.99),
    (2, 5, 1, 49.99, 49.99),
    (3, 5, 1, 49.99, 49.99),
    (4, 6, 1, 249.99, 249.99),
    (4, 8, 1, 79.99, 79.99),
    (4, 2, 1, 24.99, 24.99),
    (5, 10, 1, 89.99, 89.99);
