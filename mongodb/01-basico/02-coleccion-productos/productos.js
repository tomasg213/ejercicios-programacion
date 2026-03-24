// ============================================
// COLECCIÓN PRODUCTOS - DOCUMENTOS EMBEBIDOS
// ============================================

// Usar base de datos
use tienda_db;

// ============================================
// 1. ESQUEMA PRODUCTO CON DOCUMENTOS EMBEBIDOS
// ============================================

// Producto con especificaciones embebidas
db.productos.insertOne({
    nombre: "Laptop Gaming Pro",
    precio: 1299.99,
    categoria: "Electrónica",
    stock: 15,
    especificaciones: {
        procesador: "Intel Core i7",
        ram: "16GB DDR4",
        almacenamiento: "512GB SSD",
        pantalla: "15.6 pulgadas",
        resolucion: "1920x1080",
        peso: "2.3 kg",
        sistema_operativo: "Windows 11"
    },
    envios: {
        peso_kg: 2.5,
        dimensiones: {
            alto: 5,
            ancho: 45,
            profundo: 30
        },
        disponible: true
    }
})

// ============================================
// 2. CONSULTAS CON DOCUMENTOS EMBEBIDOS
// ============================================

// Encontrar por campo embebido (notación con punto)
db.productos.find({
    "especificaciones.procesador": "Intel Core i7"
})

// Encontrar por campo anidado
db.productos.find({
    "envios.disponible": true
})

// Rango de valores en documento embebido
db.productos.find({
    "envios.dimensiones.alto": { $lt: 10 }
})

// ============================================
// 3. ARRAY DE VALORES EMBEBIDOS
// ============================================

// Insertar producto con reviews embebidas
db.productos.insertOne({
    nombre: "Auriculares Premium",
    precio: 199.99,
    categoria: "Audio",
    stock: 30,
    especificaciones: {
        tipo: "Over-ear",
        conectividad: "Bluetooth 5.0",
        bateria_horas: 30,
        cancelacion_ruido: true
    },
    reviews: [
        {
            usuario: "Juan Pérez",
            fecha: new Date("2024-01-15"),
            calificacion: 5,
            comentario: "Excelente calidad de sonido",
            util: 15
        },
        {
            usuario: "María García",
            fecha: new Date("2024-01-20"),
            calificacion: 4,
            comentario: "Muy buenos, pero algo caros",
            util: 8
        }
    ],
    variants: [
        { color: "negro", stock: 10, sku: "AUR-BLK-001" },
        { color: "blanco", stock: 12, sku: "AUR-WHT-001" },
        { color: "rojo", stock: 8, sku: "AUR-RED-001" }
    ]
})

// ============================================
// 4. CONSULTAS EN ARRAYS
// ============================================

// Encontrar productos con un color específico
db.productos.find({
    "variants.color": "negro"
})

// Producto con review de 5 estrellas
db.productos.find({
    "reviews.calificacion": 5
})

// Array con al menos un elemento que cumpla condición
db.productos.find({
    reviews: {
        $elemMatch: {
            calificacion: { $gte: 4 },
            util: { $gte: 10 }
        }
    }
})

// ============================================
// 5. ACTUALIZAR DOCUMENTOS EMBEBIDOS
// ============================================

// Actualizar campo en documento embebido
db.productos.updateOne(
    { nombre: "Laptop Gaming Pro" },
    { $set: { "especificaciones.ram": "32GB DDR4" } }
)

// Agregar review a array
db.productos.updateOne(
    { nombre: "Auriculares Premium" },
    {
        $push: {
            reviews: {
                usuario: "Carlos López",
                fecha: new Date("2024-02-01"),
                calificacion: 5,
                comentario: "Los mejores que he tenido",
                util: 3
            }
        }
    }
)

// Actualizar dentro de array (primera coincidencia)
db.productos.updateOne(
    { nombre: "Auriculares Premium", "variants.color": "negro" },
    { $inc: { "variants.$.stock": 5 } }
)

// Incrementar campo en todos los elementos de array
db.productos.updateOne(
    { nombre: "Auriculares Premium" },
    { $inc: { "reviews.$[].util": 1 } }
)

// Actualizar usando arrayFilters
db.productos.updateOne(
    { nombre: "Auriculares Premium" },
    {
        $inc: { "reviews.$[r].util": 1 },
    },
    {
        arrayFilters: [{ "r.usuario": "Juan Pérez" }]
    }
)

// ============================================
// 6. PRODUCTOS RELACIONADOS (REFERENCIAS vs EMBEBIDOS)
// ============================================

// En lugar de embeber todo, referenciar
db.categorias.insertMany([
    { _id: "electronica", nombre: "Electrónica", descripcion: "Dispositivos electrónicos" },
    { _id: "audio", nombre: "Audio", descripcion: "Equipos de sonido" },
    { _id: "accesorios", nombre: "Accesorios", descripcion: "Complementos" }
])

// Producto referenciando categoría
db.productos.insertOne({
    nombre: "Smartwatch",
    precio: 299.99,
    categoria_id: "electronica",  // referencia
    especificaciones: { pantalla: "AMOLED", bateria: "7 días" }
})

// JOIN manual
db.productos.aggregate([
    {
        $lookup: {
            from: "categorias",
            localField: "categoria_id",
            foreignField: "_id",
            as: "categoria_info"
        }
    },
    { $unwind: "$categoria_info" },
    {
        $project: {
            nombre: 1,
            precio: 1,
            "categoria_info.nombre": 1
        }
    }
])

// ============================================
// 7. EJERCICIOS PRÁCTICOS
// ============================================

// Ejercicio 1: Insertar producto con múltiples imágenes
db.productos.insertOne({
    nombre: "Zapatillas Running",
    precio: 89.99,
    categoria: "Deportes",
    imagenes: [
        { tipo: "principal", url: "/img/zapa1.jpg" },
        { tipo: "secundaria", url: "/img/zapa2.jpg" },
        { tipo: "detalle", url: "/img/zapa3.jpg" }
    ],
    tallas: [
        { numero: 40, stock: 15 },
        { numero: 41, stock: 20 },
        { numero: 42, stock: 18 }
    ]
})

// Ejercicio 2: Encontrar productos con más de 3 tallas
db.productos.find({
    tallas: { $size: { $gt: 3 } }
})

// Ejercicio 3: Actualizar stock de talla específica
db.productos.updateOne(
    { nombre: "Zapatillas Running", "tallas.numero": 42 },
    { $inc: { "tallas.$.stock": 10 } }
)

// Ejercicio 4: Agregar campo calculado
db.productos.updateOne(
    { _id: "prod-001" },
    {
        $set: {
            "envios.calculado_volumetrico": {
                $multiply: [
                    "$envios.dimensiones.alto",
                    "$envios.dimensiones.ancho",
                    "$envios.dimensiones.profundo"
                ]
            }
        }
    }
)

// Ejercicio 5: Buscar por rating promedio de reviews
db.productos.aggregate([
    { $match: { reviews: { $exists: true, $ne: [] } } },
    {
        $addFields: {
            ratingPromedio: { $avg: "$reviews.calificacion" }
        }
    },
    { $match: { ratingPromedio: { $gte: 4 } } },
    { $project: { nombre: 1, ratingPromedio: 1 } }
])
