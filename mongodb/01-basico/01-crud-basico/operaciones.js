// ============================================
// MONGODB SHELL - COMANDOS BÁSICOS
// ============================================

// Iniciar MongoDB con Docker
// docker run -d --name mongodb -p 27017:27017 mongo:latest

// Conectar
// mongosh "mongodb://localhost:27017"

// ============================================
// 1. OPERACIONES DE BASE DE DATOS
// ============================================

// Ver bases de datos disponibles
show dbs

// Usar o crear una base de datos
use tienda_db

// Ver colección en la base de datos actual
show collections

// ============================================
// 2. INSERT - Insertar documentos
// ============================================

// Insertar un documento
db.productos.insertOne({
    nombre: "Laptop HP",
    precio: 899.99,
    categoria: "Electrónica",
    stock: 15
})

// Insertar múltiples documentos
db.productos.insertMany([
    { nombre: "Mouse Inalámbrico", precio: 29.99, categoria: "Accesorios", stock: 50 },
    { nombre: "Teclado Mecánico", precio: 79.99, categoria: "Accesorios", stock: 30 },
    { nombre: "Monitor 24'", precio: 199.99, categoria: "Electrónica", stock: 20 },
    { nombre: "Audífonos Bluetooth", precio: 59.99, categoria: "Audio", stock: 45 }
])

// Insertar con _id personalizado
db.productos.insertOne({
    _id: "prod-001",
    nombre: "Webcam HD",
    precio: 49.99,
    categoria: "Electrónica",
    stock: 25
})

// ============================================
// 3. FIND - Consultar documentos
// ============================================

// Encontrar todos los documentos
db.productos.find()

// Encontrar todos con formato legible
db.productos.find().pretty()

// Encontrar con condición (WHERE)
db.productos.find({ categoria: "Electrónica" })

// Encontrar con múltiples condiciones (AND)
db.productos.find({ 
    categoria: "Electrónica", 
    precio: { $gt: 100 } 
})

// Operadores de comparación
db.productos.find({ precio: { $gt: 50 } })           // mayor que
db.productos.find({ precio: { $lt: 50 } })           // menor que
db.productos.find({ precio: { $gte: 50 } })          // mayor o igual
db.productos.find({ precio: { $lte: 50 } })           // menor o igual
db.productos.find({ precio: { $ne: 50 } })            // diferente
db.productos.find({ precio: { $in: [29.99, 79.99] } }) // en array

// Operadores lógicos
db.productos.find({
    $or: [
        { categoria: "Electrónica" },
        { categoria: "Audio" }
    ]
})

db.productos.find({
    categoria: "Electrónica",
    $or: [
        { precio: { $lt: 100 } },
        { stock: { $lt: 20 } }
    ]
})

// Búsqueda con patrones (expresiones regulares)
db.productos.find({ nombre: /laptop/i })  // contiene "laptop" (case insensitive)

// Proyecciones (seleccionar campos)
db.productos.find(
    { categoria: "Electrónica" },
    { nombre: 1, precio: 1, _id: 0 }
)

// Ordenamiento
db.productos.find().sort({ precio: 1 })   // ascendente
db.productos.find().sort({ precio: -1 })  // descendente

// Limitar resultados
db.productos.find().sort({ precio: -1 }).limit(3)

// Contar
db.productos.countDocuments({ categoria: "Electrónica" })

// ============================================
// 4. UPDATE - Actualizar documentos
// ============================================

// Update uno (primer documento que coincida)
db.productos.updateOne(
    { nombre: "Laptop HP" },
    { $set: { precio: 849.99 } }
)

// Update múltiples
db.productos.updateMany(
    { categoria: "Electrónica" },
    { $set: { descuento: 10 } }
)

// Incrementar/Decrementar valor
db.productos.updateOne(
    { _id: "prod-001" },
    { $inc: { stock: -5 } }  // resta 5 al stock
)

// Renombrar campo
db.productos.updateOne(
    { _id: "prod-001" },
    { $rename: { "descuento": "porcentaje_descuento" } }
)

// Eliminar campo
db.productos.updateOne(
    { _id: "prod-001" },
    { $unset: { "porcentaje_descuento": "" } }
)

// Arrays - Push (agregar al final)
db.productos.updateOne(
    { _id: "prod-001" },
    { $push: { etiquetas: { $each: ["nuevo", "oferta"] } } }
)

// Arrays - Pull (remover elementos)
db.productos.updateOne(
    { _id: "prod-001" },
    { $pull: { etiquetas: "nuevo" } }
)

// ============================================
// 5. DELETE - Eliminar documentos
// ============================================

// Eliminar uno
db.productos.deleteOne({ nombre: "Webcam HD" })

// Eliminar múltiples
db.productos.deleteMany({ categoria: "Electrónica", precio: { $lt: 100 } })

// Eliminar todos los documentos
db.productos.deleteMany({})

// ============================================
// 6. CONSULTAS AVANZADAS
// ============================================

// Element (existencia de campos)
db.productos.find({ descuento: { $exists: true } })

// Tipo de dato
db.productos.find({ precio: { $type: "number" } })

// Expresiones regulares avanzado
db.productos.find({
    nombre: { 
        $regex: "^Lap", 
        $options: "i"  // case insensitive
    }
})

// ============================================
// EJERCICIOS PRÁCTICOS
// ============================================

// 1. Insertar producto con array de colores
db.productos.insertOne({
    nombre: "Camiseta",
    precio: 19.99,
    colores: ["rojo", "azul", "verde"],
    tallas: ["S", "M", "L", "XL"]
})

// 2. Encontrar productos con precio entre 20 y 100
db.productos.find({
    precio: { $gte: 20, $lte: 100 }
})

// 3. Actualizar stock de todos los productos de Electrónica
db.productos.updateMany(
    { categoria: "Electrónica" },
    { $inc: { stock: 10 } }
)

// 4. Encontrar productos sin campo 'descuento'
db.productos.find({ descuento: { $exists: false } })

// 5. Eliminar productos con stock 0
db.productos.deleteMany({ stock: 0 })
