-- Colección productos con datos de ejemplo
-- MongoDB 01-basico: Colección Productos

-- Insertar productos
db.productos.insertMany([
{
    nombre: "Laptop Pro 15",
    descripcion: "Potente laptop para desarrollo",
    precio: 1299.99,
    categoria: "electrónica",
    stock: 10,
    especificaciones: {
        procesador: "Intel i7",
        ram: "16GB",
        disco: "512GB SSD"
    },
    etiquetas: ["nuevo", "destacado"],
    fecha_creacion: new Date("2024-01-15")
},
{
    nombre: "Mouse Inalámbrico",
    descripcion: "Mouse ergonómico wireless",
    precio: 49.99,
    categoria: "accesorios",
    stock: 50,
    especificaciones: {
        tipo: "óptico",
        botones: 3,
        conexion: "Bluetooth"
    },
    etiquetas: ["popular"],
    fecha_creacion: new Date("2024-01-10")
},
{
    nombre: "Teclado Mecánico",
    descripcion: "Teclado RGB switches blue",
    precio: 149.99,
    categoria: "accesorios",
    stock: 30,
    especificaciones: {
        tipo: "mecánico",
        switches: "Blue",
        rgb: true
    },
    etiquetas: ["gaming"],
    fecha_creacion: new Date("2024-01-12")
},
{
    nombre: "Monitor 4K",
    descripcion: "Monitor 27 pulgadas 4K IPS",
    precio: 499.99,
    categoria: "electrónica",
    stock: 15,
    especificaciones: {
        resolucion: "3840x2160",
        tipo: "IPS",
        hz: 60
    },
    etiquetas: ["nuevo"],
    fecha_creacion: new Date("2024-01-18")
},
{
    nombre: "Auriculares Noise Cancelling",
    descripcion: "Auriculares premium con cancelación de ruido",
    precio: 299.99,
    categoria: "audio",
    stock: 25,
    especificaciones: {
        tipo: "over-ear",
        bluetooth: true,
        bateria: "30 horas"
    },
    etiquetas: ["destacado", "audio"],
    fecha_creacion: new Date("2024-01-20")
}
]);

-- Consultas de práctica

-- 1. Listar todos los productos
db.productos.find();

-- 2. Productos por categoría
db.productos.find({ categoria: "electrónica" });

-- 3. Productos con precio menor a 100
db.productos.find({ precio: { $lt: 100 } });

-- 4. Productos con especificaciones.ram
db.productos.find({ "especificaciones.ram": "16GB" });

-- 5. Productos con etiquetas que contengan "nuevo"
db.productos.find({ etiquetas: "nuevo" });

-- 6. Actualizar stock de un producto
db.productos.updateOne(
    { nombre: "Laptop Pro 15" },
    { $inc: { stock: -1 } }
);

-- 7. Agregar etiqueta a un producto
db.productos.updateOne(
    { nombre: "Mouse Inalámbrico" },
    { $push: { etiquetas: "oferta" } }
);

-- 8. Ordenar por precio descendente
db.productos.find().sort({ precio: -1 });

-- 9. Limitar resultados
db.productos.find().sort({ precio: -1 }).limit(3);

-- 10. Contar por categoría
db.productos.aggregate([
    { $group: { _id: "$categoria", total: { $sum: 1 } } }
]);
