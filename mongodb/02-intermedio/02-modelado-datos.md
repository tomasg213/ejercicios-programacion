# Ejercicio 2: Modelado de Datos

## Caso Real
Diseña esquemas eficientes para diferentes escenarios en MongoDB.

## Estrategias de Modelado

### 1.1 Modelo Relacional vs Documento
```javascript
// En lugar de normalizar como SQL:
/* 
  pedidos {
    cliente_id -> clientes._id,
    productos: [{producto_id, cantidad}]
  }
*/

// MongoDB - denormalización:
{
    _id: ObjectId("..."),
    cliente: {
        nombre: "Ana",
        email: "ana@email.com"
    },
    items: [
        { nombre: "Laptop", cantidad: 1, precio: 1299 }
    ],
    total: 1299
}
```

### 1.2 Patrones de Modelado

#### Patrón: Documento Embebido
```javascript
// Para datos que siempre se leen juntos
{
    _id: ObjectId("pedido1"),
    cliente: {
        nombre: "Ana",
        email: "ana@email.com"
    },
    items: [
        { producto: "Laptop", cantidad: 1 },
        { producto: "Mouse", cantidad: 2 }
    ]
}
```

#### Patrón: Referencias
```javascript
// Para datos que se modifican independientemente
// Cliente
{
    _id: ObjectId("cliente1"),
    nombre: "Ana",
    email: "ana@email.com"
}

// Pedido (referencia)
{
    _id: ObjectId("pedido1"),
    cliente_id: ObjectId("cliente1"),
    items: [...]
}
```

#### Patrón: Bucket (Series de tiempo)
```javascript
// En lugar de un documento por lectura:
/* colección: lecturas */
{ timestamp: "2024-01-01T00:00", temperatura: 20 }
{ timestamp: "2024-01-01T00:01", temperatura: 21 }

// Bucket - agrupar por hora:
{
    sensor_id: "temp1",
    fecha: "2024-01-01T00",
    lecturas: [
        { hora: 0, temperatura: 20 },
        { hora: 1, temperatura: 21 }
    ]
}
```

### 1.3 Diseño para Acceso
```javascript
// Preguntar:
// 1. ¿Qué consultas necesitamos?
// 2. ¿Con qué frecuencia se leen vs escriben?
// 3. ¿Necesitamos transacciones?

// Ejemplo: Blog
// - Posts con comentarios embebidos (si son pocos)
// - Comments en colección separada (si son muchos)
```

## Ejercicios de Modelado
```javascript
// 1. E-commerce - Pedido con items embebidos
db.pedidos.insertOne({
    cliente_id: ObjectId("..."),
    items: [
        {
            producto_id: ObjectId("..."),
            nombre: "Laptop",
            cantidad: 1,
            precio: 1299
        }
    ],
    estado: "pendiente",
    fecha: new Date()
});

// 2. Redes sociales - Usuario con amigos
db.usuarios.insertOne({
    username: "anagarcia",
    nombre: "Ana",
    amigos: [
        ObjectId("friend1"),
        ObjectId("friend2")
    ],
   UltimoPost: ObjectId("post1")
});

// 3. Logs - Patrón Bucket por día
db.logs.insertOne({
    servicio: "api",
    fecha: "2024-01-15",
    request: [
        { hora: 0, method: "GET", path: "/users", status: 200 },
        { hora: 1, method: "POST", path: "/login", status: 401 }
    ]
});
```
