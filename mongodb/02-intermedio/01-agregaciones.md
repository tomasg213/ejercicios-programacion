# Ejercicio 1: Agregaciones

## Caso Real
Domina el pipeline de agregación de MongoDB para análisis de datos.

## Pipeline de Agregación

### 1.1 $match - Filtrar documentos
```javascript
db.ventas.aggregate([
    { $match: { estado: "completado" } }
]);
```

### 1.2 $group - Agrupar documentos
```javascript
// Agrupar por categoría y sumar stock
db.productos.aggregate([
    {
        $group: {
            _id: "$categoria",
            totalStock: { $sum: "$stock" },
            promedioPrecio: { $avg: "$precio" }
        }
    }
]);
```

### 1.3 $project - Transformar salida
```javascript
db.productos.aggregate([
    {
        $project: {
            nombre: 1,
            precio: 1,
            descuento: { $multiply: ["$precio", 0.1] },
            precioFinal: { $subtract: ["$precio", { $multiply: ["$precio", 0.1] }] },
            _id: 0
        }
    }
]);
```

### 1.4 $sort, $limit, $skip
```javascript
db.productos.aggregate([
    { $sort: { precio: -1 } },
    { $limit: 3 },
    { $skip: 0 }
]);
```

### 1.5 $lookup - JOIN entre colecciones
```javascript
db.pedidos.aggregate([
    {
        $lookup: {
            from: "clientes",
            localField: "cliente_id",
            foreignField: "_id",
            as: "cliente"
        }
    },
    { $unwind: "$cliente" },
    {
        $project: {
            pedido_id: "$_id",
            cliente: "$cliente.nombre",
            total: 1,
            _id: 0
        }
    }
]);
```

### 1.6 $unwind - Descomponer arrays
```javascript
db.productos.aggregate([
    { $unwind: "$etiquetas" },
    { $group: { _id: "$etiquetas", count: { $sum: 1 } } }
]);
```

## Ejercicios
```javascript
// 1. Total de ventas por cliente
db.ventas.aggregate([
    { $group: { _id: "$cliente_id", total: { $sum: "$monto" } } }
]);

// 2. Productos con mayor stock
db.productos.aggregate([
    { $sort: { stock: -1 } },
    { $limit: 5 },
    { $project: { nombre: 1, stock: 1, _id: 0 } }
]);

// 3. Promedio de precio por categoría
db.productos.aggregate([
    {
        $group: {
            _id: "$categoria",
            promedio: { $avg: "$precio" }
        }
    }
]);

// 4. Contar productos por etiqueta
db.productos.aggregate([
    { $unwind: "$etiquetas" },
    { $group: { _id: "$etiquetas", cantidad: { $sum: 1 } } }
]);
```
