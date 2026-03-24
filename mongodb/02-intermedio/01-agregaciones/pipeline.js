// ============================================
// AGREGACIONES EN MONGODB
// Pipeline de Aggregation
// ============================================

use tienda_db;

// ============================================
// DATOS DE EJEMPLO
// ============================================

db.pedidos.insertMany([
    {
        cliente: "Ana García",
        productos: [
            { nombre: "Laptop", precio: 999, cantidad: 1 },
            { nombre: "Mouse", precio: 25, cantidad: 2 }
        ],
        total: 1049,
        fecha: new Date("2024-01-15"),
        ciudad: "Madrid"
    },
    {
        cliente: "Carlos López",
        productos: [
            { nombre: "Teclado", precio: 79, cantidad: 1 },
            { nombre: "Monitor", precio: 199, cantidad: 1 }
        ],
        total: 278,
        fecha: new Date("2024-01-16"),
        ciudad: "Barcelona"
    },
    {
        cliente: "María Rodríguez",
        productos: [
            { nombre: "Auriculares", precio: 59, cantidad: 3 }
        ],
        total: 177,
        fecha: new Date("2024-01-17"),
        ciudad: "Madrid"
    },
    {
        cliente: "Juan Pérez",
        productos: [
            { nombre: "Laptop", precio: 999, cantidad: 1 },
            { nombre: "Webcam", precio: 49, cantidad: 1 }
        ],
        total: 1048,
        fecha: new Date("2024-01-18"),
        ciudad: "Valencia"
    },
    {
        cliente: "Ana García",
        productos: [
            { nombre: "Mouse", precio: 25, cantidad: 1 }
        ],
        total: 25,
        fecha: new Date("2024-01-20"),
        ciudad: "Madrid"
    }
])

// ============================================
// 1. PIPELINE BÁSICO
// ============================================

// $match - Filtrar documentos
db.pedidos.aggregate([
    { $match: { ciudad: "Madrid" } }
])

// $match + $group
db.pedidos.aggregate([
    { $match: { fecha: { $gte: new Date("2024-01-01") } } },
    { $group: { _id: "$ciudad", total: { $sum: "$total" } } }
])

// ============================================
// 2. OPERADORES DE ACUMULACIÓN
// ============================================

// $sum - Sumar valores
db.pedidos.aggregate([
    {
        $group: {
            _id: "$ciudad",
            total_ventas: { $sum: "$total" },
            num_pedidos: { $sum: 1 }
        }
    }
])

// $avg - Promedio
db.pedidos.aggregate([
    {
        $group: {
            _id: "$cliente",
            ticket_promedio: { $avg: "$total" },
            total_gastado: { $sum: "$total" }
        }
    }
])

// $min y $max
db.pedidos.aggregate([
    {
        $group: {
            _id: "$ciudad",
            pedido_mayor: { $max: "$total" },
            pedido_menor: { $min: "$total" }
        }
    }
])

// $push - Crear arrays
db.pedidos.aggregate([
    {
        $group: {
            _id: "$cliente",
            pedidos: { $push: { total: "$total", fecha: "$fecha" } }
        }
    }
])

// ============================================
// 3. PIPELINE STAGES ADICIONALES
// ============================================

// $sort - Ordenar resultados
db.pedidos.aggregate([
    { $group: { _id: "$ciudad", total: { $sum: "$total" } } },
    { $sort: { total: -1 } }
])

// $limit - Limitar resultados
db.pedidos.aggregate([
    { $sort: { total: -1 } },
    { $limit: 3 }
])

// $skip - Saltar documentos
db.pedidos.aggregate([
    { $sort: { total: -1 } },
    { $skip: 1 },
    { $limit: 2 }
])

// $project - Seleccionar/cambiar campos
db.pedidos.aggregate([
    {
        $project: {
            cliente: 1,
            ciudad: 1,
            pedido_sin_iva: { $divide: ["$total", 1.21] },
            mes: { $month: "$fecha" }
        }
    }
])

// ============================================
// 4. DESGLOSE DE ARRAYS CON $unwind
// ============================================

// Desglosar productos de cada pedido
db.pedidos.aggregate([
    { $unwind: "$productos" },
    {
        $project: {
            cliente: 1,
            "productos.nombre": 1,
            "productos.precio": 1,
            "productos.cantidad": 1
        }
    }
])

// Productos más vendidos
db.pedidos.aggregate([
    { $unwind: "$productos" },
    {
        $group: {
            _id: "$productos.nombre",
            unidades_vendidas: { $sum: "$productos.cantidad" },
            revenue: { $sum: { $multiply: ["$productos.precio", "$productos.cantidad"] } }
        }
    },
    { $sort: { unidades_vendidas: -1 } }
])

// ============================================
// 5. LOOKUP (JOIN ENTRE COLECCIONES)
// ============================================

// Crear colección de inventario
db.inventario.insertMany([
    { producto: "Laptop", stock: 15, minimo: 5 },
    { producto: "Mouse", stock: 50, minimo: 10 },
    { producto: "Teclado", stock: 30, minimo: 5 },
    { producto: "Monitor", stock: 20, minimo: 3 }
])

// Unir pedidos con inventario
db.pedidos.aggregate([
    { $unwind: "$productos" },
    {
        $lookup: {
            from: "inventario",
            localField: "productos.nombre",
            foreignField: "producto",
            as: "info_inventario"
        }
    },
    { $unwind: "$info_inventario" },
    {
        $project: {
            cliente: 1,
            "productos.nombre": 1,
            stock_actual: "$info_inventario.stock"
        }
    }
])

// ============================================
// 6. CONDICIONES CON $cond
// ============================================

// Clasificar pedidos por tamaño
db.pedidos.aggregate([
    {
        $addFields: {
            tipo_pedido: {
                $cond: {
                    if: { $gte: ["$total", 500] },
                    then: "Grande",
                    else: {
                        $cond: {
                            if: { $gte: ["$total", 100] },
                            then: "Mediano",
                            else: "Pequeño"
                        }
                    }
                }
            }
        }
    },
    {
        $group: {
            _id: "$tipo_pedido",
            cantidad: { $sum: 1 }
        }
    }
])

// ============================================
// 7. FACETS (MÚLTIPLES AGREGACIONES)
// ============================================

db.pedidos.aggregate([
    {
        $facet: {
            // Por ciudad
            ventas_por_ciudad: [
                { $group: { _id: "$ciudad", total: { $sum: "$total" } } }
            ],
            // Por cliente
            top_clientes: [
                { $group: { _id: "$cliente", total: { $sum: "$total" } } },
                { $sort: { total: -1 } },
                { $limit: 5 }
            ],
            // Estadísticas generales
            resumen: [
                {
                    $group: {
                        _id: null,
                        total_ventas: { $sum: "$total" },
                        pedido_promedio: { $avg: "$total" },
                        num_pedidos: { $sum: 1 }
                    }
                }
            ]
        }
    }
])

// ============================================
// 8. EJERCICIOS PRÁCTICOS
// ============================================

// Ejercicio 1: Ventas por mes en 2024
db.pedidos.aggregate([
    {
        $group: {
            _id: {
                año: { $year: "$fecha" },
                mes: { $month: "$fecha" }
            },
            total: { $sum: "$total" },
            pedidos: { $sum: 1 }
        }
    },
    { $sort: { "_id.año": 1, "_id.mes": 1 } }
])

// Ejercicio 2: Clientes que gastaron más de 500
db.pedidos.aggregate([
    {
        $group: {
            _id: "$cliente",
            total: { $sum: "$total" }
        }
    },
    { $match: { total: { $gt: 500 } } },
    { $sort: { total: -1 } }
])

// Ejercicio 3: Productos con revenue total
db.pedidos.aggregate([
    { $unwind: "$productos" },
    {
        $group: {
            _id: "$productos.nombre",
            revenue: {
                $sum: { $multiply: ["$productos.precio", "$productos.cantidad"] }
            },
            cantidad: { $sum: "$productos.cantidad" }
        }
    },
    { $sort: { revenue: -1 } }
])

// Ejercicio 4: Ciudades con ticket promedio mayor a 200
db.pedidos.aggregate([
    {
        $group: {
            _id: "$ciudad",
            ticket_promedio: { $avg: "$total" },
            total: { $sum: "$total" }
        }
    },
    { $match: { ticket_promedio: { $gt: 200 } } }
])

// Ejercicio 5: Distribución de pedidos por día de semana
db.pedidos.aggregate([
    {
        $addFields: {
            dia_semana: { $dayOfWeek: "$fecha" }
        }
    },
    {
        $group: {
            _id: "$dia_semana",
            cantidad: { $sum: 1 }
        }
    },
    {
        $addFields: {
            dia_nombre: {
                $arrayElemAt: [
                    ["", "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                    "$_id"
                ]
            }
        }
    }
])
