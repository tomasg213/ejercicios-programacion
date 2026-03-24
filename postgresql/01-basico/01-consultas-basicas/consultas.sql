-- CONSULTAS BÁSICAS PostgreSQL
-- ============================

-- 1. Seleccionar todos los productos
SELECT * FROM productos;

-- 2. Seleccionar columnas específicas
SELECT nombre, precio FROM productos;

-- 3. WHERE - Filtrar por condición
SELECT * FROM productos WHERE categoria = 'Electrónica';

-- 4. WHERE con operadores de comparación
SELECT * FROM productos WHERE precio > 50;
SELECT * FROM productos WHERE stock < 20;

-- 5. Múltiples condiciones con AND/OR
SELECT * FROM productos 
WHERE categoria = 'Electrónica' AND precio > 50;

SELECT * FROM productos 
WHERE precio < 50 OR stock > 40;

-- 6. BETWEEN - Rango de valores
SELECT * FROM productos 
WHERE precio BETWEEN 20 AND 100;

-- 7. IN - Valores específicos
SELECT * FROM productos 
WHERE categoria IN ('Electrónica', 'Muebles');

-- 8. LIKE - Búsqueda con patrones
SELECT * FROM productos 
WHERE nombre LIKE 'L%';

SELECT * FROM productos 
WHERE nombre LIKE '%Mouse%';

-- 9. ORDER BY - Ordenar resultados
SELECT * FROM productos ORDER BY precio;
SELECT * FROM productos ORDER BY precio DESC;
SELECT * FROM productos ORDER BY categoria, precio;

-- 10. LIMIT - Limitar resultados
SELECT * FROM productos ORDER BY precio DESC LIMIT 3;

-- 11. Funciones de agregación
SELECT COUNT(*) as total_productos FROM productos;
SELECT SUM(stock) as stock_total FROM productos;
SELECT AVG(precio) as precio_promedio FROM productos;
SELECT MIN(precio) as precio_minimo FROM productos;
SELECT MAX(precio) as precio_maximo FROM productos;

-- 12. DISTINCT - Valores únicos
SELECT DISTINCT categoria FROM productos;

-- 13. AS - Alias para columnas
SELECT nombre, precio, 
       precio * 1.16 as precio_con_iva 
FROM productos;
