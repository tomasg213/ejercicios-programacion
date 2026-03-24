# Ejercicio 1: CRUD Básico

## Caso Real
Aprende las operaciones CRUD básicas en MongoDB con la shell.

## Operaciones CRUD

### 1.1 CREATE - Insertar documentos
```javascript
// Insertar un documento
db.usuarios.insertOne({
    nombre: "Ana García",
    email: "ana@email.com",
    edad: 28,
    activo: true
});

// Insertar múltiples documentos
db.usuarios.insertMany([
    { nombre: "Carlos", email: "carlos@email.com", edad: 35 },
    { nombre: "María", email: "maria@email.com", edad: 32 }
]);
```

### 1.2 READ - Consultar documentos
```javascript
// Encontrar todos
db.usuarios.find();

// Encontrar con filtro
db.usuarios.find({ edad: 28 });

// Encontrar uno
db.usuarios.findOne({ email: "ana@email.com" });

// Operadores de comparación
db.usuarios.find({ edad: { $gt: 30 } }); // mayor que
db.usuarios.find({ edad: { $gte: 30, $lte: 40 } }); // rango
db.usuarios.find({ nombre: { $regex: "^A" } }); // expresión regular

// Proyección (seleccionar campos)
db.usuarios.find({}, { nombre: 1, email: 1, _id: 0 });
```

### 1.3 UPDATE - Actualizar documentos
```javascript
// Actualizar uno
db.usuarios.updateOne(
    { email: "ana@email.com" },
    { $set: { edad: 29 } }
);

// Actualizar muchos
db.usuarios.updateMany(
    { activo: false },
    { $set: { activo: true } }
);

// Incrementar valor
db.usuarios.updateOne(
    { email: "ana@email.com" },
    { $inc: { edad: 1 } }
);

// Agregar a array
db.usuarios.updateOne(
    { email: "ana@email.com" },
    { $push: { habilidades: "JavaScript" } }
);
```

### 1.4 DELETE - Eliminar documentos
```javascript
// Eliminar uno
db.usuarios.deleteOne({ email: "ana@email.com" });

// Eliminar muchos
db.usuarios.deleteMany({ activo: false });
```

## Ejercicios
```javascript
// 1. Insertar un nuevo usuario
db.usuarios.insertOne({
    nombre: "Juan",
    email: "juan@email.com",
    ciudad: "Madrid",
    edad: 25
});

// 2. Encontrar usuarios de Madrid
db.usuarios.find({ ciudad: "Madrid" });

// 3. Actualizar la ciudad de un usuario
db.usuarios.updateOne(
    { nombre: "Juan" },
    { $set: { ciudad: "Barcelona" } }
);

// 4. Eliminar usuario por email
db.usuarios.deleteOne({ email: "carlos@email.com" });

// 5. Contar documentos
db.usuarios.countDocuments();
```
