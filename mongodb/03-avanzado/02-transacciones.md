# Ejercicio 2: Transacciones

## Caso Real
Maneja operaciones atómicas complejas con transacciones ACID en MongoDB.

## Transacciones

### 1.1 Iniciar sesión de transacción
```javascript
// En mongo shell
session = db.getMongo().startSession();
session.startTransaction();

// operaciones...
session.commitTransaction(); // o session.abortTransaction();
session.endSession();
```

### 1.2 Transacción con retry
```javascript
function ejecutarTransaccion() {
    const session = db.getMongo().startSession();
    
    try {
        session.startTransaction({
            readConcern: { level: "snapshot" },
            writeConcern: { w: "majority" }
        });
        
        const db1 = session.getDatabase("mi_tienda");
        
        // Deducir stock
        db1.productos.updateOne(
            { _id: ObjectId("producto1"), stock: { $gte: 1 } },
            { $inc: { stock: -1 } }
        );
        
        // Crear pedido
        db1.pedidos.insertOne({
            producto_id: ObjectId("producto1"),
            fecha: new Date(),
            estado: "completado"
        });
        
        session.commitTransaction();
        print("Transacción completada");
        
    } catch (error) {
        session.abortTransaction();
        print("Transacción revertida: " + error);
    } finally {
        session.endSession();
    }
}
```

### 1.3 Transacción distribuida (multi-documento)
```javascript
// Transferencia entre cuentas
const session = db.getMongo().startSession();

try {
    session.startTransaction();
    
    const db = session.getDatabase("banco");
    
    // Deducir de cuenta origen
    db.cuentas.updateOne(
        { _id: ObjectId("cuenta1"), saldo: { $gte: 1000 } },
        { $inc: { saldo: -1000 } }
    );
    
    // Agregar a cuenta destino
    db.cuentas.updateOne(
        { _id: ObjectId("cuenta2") },
        { $inc: { saldo: 1000 } }
    );
    
    session.commitTransaction();
    
} catch (e) {
    session.abortTransaction();
    throw e;
} finally {
    session.endSession();
}
```

## Ejercicios
```javascript
// 1. Crear colección de cuentas
db.cuentas.insertMany([
    { _id: ObjectId("cuenta1"), nombre: "Ana", saldo: 5000 },
    { _id: ObjectId("cuenta2"), nombre: "Carlos", saldo: 3000 }
]);

// 2. Transacción de transferencia
const sesion = db.getMongo().startSession();
sesion.startTransaction();
try {
    sesion.getDatabase("banco").cuentas.updateOne(
        { _id: ObjectId("cuenta1") },
        { $inc: { saldo: -500 } }
    );
    sesion.getDatabase("banco").cuentas.updateOne(
        { _id: ObjectId("cuenta2") },
        { $inc: { saldo: 500 } }
    );
    sesion.commitTransaction();
} catch(e) {
    sesion.abortTransaction();
} finally {
    sesion.endSession();
}

// 3. Verificar resultado
db.cuentas.find();
```
