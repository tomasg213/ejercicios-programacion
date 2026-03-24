// ============================================
// MODELADO DE DATOS EN MONGODB
// Patrones de Diseño
// ============================================

use tienda_db;

// ============================================
// 1. PATRÓN: DOCUMENTO ÚNICO (Todo en uno)
// ============================================

// Cuándo usar: Datos que siempre se consultan juntos
// Ejemplo: Perfil de usuario completo

db.perfiles.insertOne({
    _id: "user-001",
    nombre: "Juan Pérez",
    email: "juan@email.com",
    preferences: {
        tema: "oscuro",
        idioma: "es",
        notificaciones: {
            email: true,
            push: false
        }
    },
    direcciones: [
        {
            tipo: "casa",
            calle: "Calle Principal 123",
            ciudad: "Madrid",
            cp: "28001"
        },
        {
            tipo: "trabajo",
            calle: "Av. Empresarial 456",
            ciudad: "Madrid",
            cp: "28002"
        }
    ],
    historial_compras: [
        { producto: "Laptop", fecha: new Date("2023-06-15"), precio: 999 },
        { producto: "Mouse", fecha: new Date("2023-08-20"), precio: 25 }
    ]
})

// ============================================
// 2. PATRÓN: REFERENCIA NORMALIZADA
// ============================================

// Cuándo usar: Datos que se repiten en múltiples documentos
// o que cambian frecuentemente

// Colección de categorías
db.categorias.insertMany([
    { _id: "electronica", nombre: "Electrónica" },
    { _id: "muebles", nombre: "Muebles" },
    { _id: "ropa", nombre: "Ropa" }
])

// Colección de productos referenciando categoría
db.productos_v2.insertMany([
    { nombre: "Laptop", precio: 999, categoria_id: "electronica" },
    { nombre: "Silla", precio: 199, categoria_id: "muebles" },
    { nombre: "Camiseta", precio: 19, categoria_id: "ropa" }
])

// Unir con $lookup
db.productos_v2.aggregate([
    {
        $lookup: {
            from: "categorias",
            localField: "categoria_id",
            foreignField: "_id",
            as: "categoria"
        }
    },
    { $unwind: "$categoria" }
])

// ============================================
// 3. PATRÓN: DOCUMENTOS EMBEBIDOS
// ============================================

// Cuándo usar: Datos pequeños, que no crecen mucho, se acceden juntos

db.ordenes.insertOne({
    _id: "ord-001",
    cliente: "Juan Pérez",
    productos: [
        { sku: "LAP-001", nombre: "Laptop", cantidad: 1, precio: 999 },
        { sku: "MOU-001", nombre: "Mouse", cantidad: 2, precio: 25 }
    ],
    direccion_envio: {
        calle: "Calle Principal 123",
        ciudad: "Madrid",
        cp: "28001"
    },
    info_pago: {
        tipo: "tarjeta",
        ultimos_digitos: "1234"
    }
})

// ============================================
// 4. PATRÓN: EXTENDED REFERENCE (Referencia Extendida)
// ============================================

// Cuándo usar: Mezclar datos embebidos y referenciados
// Embebe campos frecuentemente accedidos

db.ordenes_v2.insertOne({
    _id: "ord-002",
    cliente_id: ObjectId("..."),
    cliente_nombre: "Juan Pérez",           // embebido (frecuente)
    cliente_email: "juan@email.com",         // embebido (frecuente)
    productos: [
        { 
            sku: "LAP-001", 
            nombre: "Laptop", 
            cantidad: 1, 
            precio: 999,
            categoria_id: "electronica"      // referencia
        }
    ]
})

// ============================================
// 5. PATRÓN: SUBSET (Subconjunto)
// ============================================

// Cuándo usar: Array grande que se actualiza frecuentemente

db.peliculas.insertOne({
    _id: "mov-001",
    titulo: "Matrix",
    sinopsis: "Un hacker descubre la verdad...",
    resenas_recientes: [
        { usuario: "Ana", texto: "Excelente", fecha: new Date() }
    ],
    // No embebemos todas las reseñas, solo las recientes
})

// ============================================
// 6. PATRÓN: BUCKETING (Agrupación)
// ============================================

// Cuándo usar: Datos de series temporales
// Mejor rendimiento que documentos individuales

db.sensores.insertOne({
    _id: "sensor-001",
    tipo: "temperatura",
    fecha_inicio: new Date("2024-01-01"),
    fecha_fin: new Date("2024-01-31"),
    lecturas: [
        { timestamp: new Date("2024-01-01T00:00:00"), valor: 22.5 },
        { timestamp: new Date("2024-01-01T01:00:00"), valor: 22.3 },
        { timestamp: new Date("2024-01-01T02:00:00"), valor: 21.8 }
    ],
    stats: {
        min: 18.5,
        max: 25.2,
        avg: 22.1
    }
})

// ============================================
// 7. PATRÓN: ÁRBOL JERÁRQUICO
// ============================================

// Materialized Path - Ruta materializada
db.categorias_v2.insertMany([
    { _id: "root", path: "root", nombre: "Productos" },
    { _id: "electronica", path: "root/electronica", nombre: "Electrónica" },
    { _id: "muebles", path: "root/muebles", nombre: "Muebles" },
    { _id: "portatiles", path: "root/electronica/portatiles", nombre: "Portátiles" },
    { _id: "sobremesa", path: "root/electronica/sobremesa", nombre: "Sobremesa" }
])

// Encontrar todos los hijos de Electrónica
db.categorias_v2.find({
    path: { $regex: "^root/electronica/" }
})

// Encontrar ancestros de Portátiles
db.categorias_v2.find({
    path: { $regex: "portatiles$" }
}).forEach(doc => {
    const ancestros = doc.path.split("/").slice(0, -1)
    printjson(db.categorias_v2.find({ _id: { $in: ancestros } }).toArray())
})

// ============================================
// 8. DECISIONES DE DISEÑO
// ============================================

// ¿EMBEDER O REFERENCIAR?

// EMBEBER cuando:
// - Datos pequeños (< 16KB total)
// - Datos que siempre se leen juntos
// - Datos que raramente cambian
// - Arrays que no crecen mucho

// REFERENCIAR cuando:
// - Datos que cambian frecuentemente
// - Datos que se consultan independientemente
// - Datos que se comparten entre documentos
// - Datos grandes (> 16KB)

// ============================================
// 9. ÍNDICES PARA OPTIMIZACIÓN
// ============================================

// Índice en campo embebido
db.perfiles.createIndex({ "preferences.idioma": 1 })

// Índice en array
db.perfiles.createIndex({ direcciones.ciudad: 1 })

// Índice compuesto
db.ordenes.createIndex({ cliente: 1, fecha: -1 })

// Índice de texto para búsqueda
db.productos_v2.createIndex({ nombre: "text", descripcion: "text" })

// Búsqueda de texto
db.productos_v2.find({
    $text: { $search: "laptop computadora" }
})

// ============================================
// 10. EJERCICIOS PRÁCTICOS
// ============================================

// Ejercicio 1: Diseñar schema para blog
// - Posts con autor embebido
// - Tags como array
// - Comentarios embebidos (limitados a últimos 10)

db.posts.insertOne({
    titulo: "Mi primer post",
    autor: {
        nombre: "Juan",
        email: "juan@email.com",
        avatar: "/img/juan.jpg"
    },
    contenido: "...",
    tags: ["mongodb", "nosql", "base de datos"],
    comentarios: [
        { usuario: "Ana", texto: "Muy bueno!", fecha: new Date() }
    ],
    stats: {
        vistas: 150,
        likes: 12
    },
    fecha_publicacion: new Date()
})

// Ejercicio 2: Crear índice para búsqueda por tags
db.posts.createIndex({ tags: 1 })

// Ejercicio 3: Schema para chat/mensajes
db.conversaciones.insertOne({
    participantes: ["user-001", "user-002"],
    ultimo_mensaje: {
        texto: "Hola, ¿cómo estás?",
        fecha: new Date(),
        emisor: "user-001"
    },
    mensajes: [
        {
            emisor: "user-001",
            texto: "Hola",
            fecha: new Date("2024-01-01T10:00:00"),
            leido: true
        }
    ]
})

// Ejercicio 4: Optimizar lectura de mensajes
db.conversaciones.createIndex({ participantes: 1 })
db.conversaciones.createIndex({ "mensajes.fecha": -1 })
