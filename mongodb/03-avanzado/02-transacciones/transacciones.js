// ============================================
// TRANSACCIONES EN MONGODB
// Sesiones y Operaciones Atómicas
// ============================================

use tienda_db;

// ============================================
// 1. CONCEPTOS BÁSICOS
// ============================================

/*
TRANSACCIONES EN MONGODB:
- Disponibles desde MongoDB 4.0 (single replica set)
- Disponibles desde MongoDB 4.2 (sharded clusters)
- Requieren replica set o sharded cluster
- Pueden abarcar múltiples operaciones y colecciones
*/

// ============================================
// 2. TRANSACCIÓN BÁSICA (MongoDB Shell)
// ============================================

// Iniciar sesión
session = db.getMongo().startSession()

// Iniciar transacción
session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" }
})

try {
    // Operacion 1: Decrementar stock
    session.getDatabase("tienda_db").productos.updateOne(
        { _id: "prod-001", stock: { $gte: 2 } },
        { $inc: { stock: -2 } }
    )
    
    // Operacion 2: Crear pedido
    session.getDatabase("tienda_db").pedidos.insertOne({
        cliente_id: "cliente-001",
        productos: [{ sku: "prod-001", cantidad: 2 }],
        total: 199.98,
        fecha: new Date()
    })
    
    // Commit si todo ok
    session.commitTransaction()
    
} catch (error) {
    // Rollback si hay error
    session.abortTransaction()
    throw error
    
} finally {
    session.endSession()
}

// ============================================
// 3. TRANSACCIÓN CON VERIFICACIÓN
// ============================================

function crearPedido(clienteId, productos, session) {
    const db = session.getDatabase("tienda_db")
    let total = 0
    
    // Verificar stock y calcular total
    for (const item of productos) {
        const producto = db.productos.findOne({ _id: item.sku })
        
        if (!producto) {
            throw new Error(`Producto ${item.sku} no encontrado`)
        }
        
        if (producto.stock < item.cantidad) {
            throw new Error(`Stock insuficiente para ${producto.nombre}`)
        }
        
        total += producto.precio * item.cantidad
    }
    
    // Decrementar stock de cada producto
    for (const item of productos) {
        db.productos.updateOne(
            { _id: item.sku, stock: { $gte: item.cantidad } },
            { $inc: { stock: -item.cantidad } }
        )
    }
    
    // Crear pedido
    const pedidoId = db.pedidos.insertOne({
        cliente_id: clienteId,
        productos: productos,
        total: total,
        fecha: new Date(),
        estado: "completado"
    }, { session })
    
    return pedidoId.insertedId
}

// Uso con transacción
const session = db.getMongo().startSession()
session.startTransaction()

try {
    const pedidoId = crearPedido("cliente-001", [
        { sku: "prod-001", cantidad: 1 },
        { sku: "prod-002", cantidad: 2 }
    ], session)
    
    session.commitTransaction()
    print(`Pedido creado: ${pedidoId}`)
    
} catch (error) {
    session.abortTransaction()
    print(`Error: ${error.message}`)
    
} finally {
    session.endSession()
}

// ============================================
// 4. AISLAMIENTO DE TRANSACCIONES
// ============================================

// Nivel de lectura: snapshot (default)
// - Lecturas ven datos committed en el momento inicial
// - Escrituras no ven cambios de otras transacciones

// Configurar read concern
session.startTransaction({
    readConcern: { level: "snapshot" }  // Default
})

// Otras opciones de readConcern:
// - "local": Lecturas ven datos locales (más rápido)
// - "majority": Lecturas ven datos replicados a mayoría
// - "linearizable": Lecturas strongly consistent (más lento)

// Nivel de escritura: majority (default)
// - Escrituras se replican a mayoría de nodos

session.startTransaction({
    writeConcern: { w: "majority" }  // Default
})

// Otras opciones de writeConcern:
// - w: 1 - Solo primary
// - w: "majority" - Mayoría de nodos
// - w: <n> - N nodos específicos

// ============================================
// 5. ROLLBACK MANUAL
// ============================================

session.startTransaction()

try {
    // Múltiples operaciones
    db.cuenta_origen.updateOne(
        { _id: "cuenta-001", saldo: { $gte: 100 } },
        { $inc: { saldo: -100 } }
    )
    
    db.cuenta_destino.updateOne(
        { _id: "cuenta-002" },
        { $inc: { saldo: 100 } }
    )
    
    // Registrar transferencia
    db.transferencias.insertOne({
        origen: "cuenta-001",
        destino: "cuenta-002",
        monto: 100,
        fecha: new Date()
    })
    
    session.commitTransaction()
    
} catch (error) {
    // El abortTransaction ya hace rollback automáticamente
    session.abortTransaction()
    print(`Transferencia cancelada: ${error.message}`)
    
} finally {
    session.endSession()
}

// ============================================
// 6. TRANSACCIONES EN SHARDED CLUSTER
// ============================================

/*
IMPORTANTE en Sharded Clusters:
- Las transacciones deben usar mongos (no conectar directamente a shards)
- El shard key debe estar presente en todas las colecciones involucradas
- Para transacciones spanning collections, todas deben usar el mismo shard key
*/

// Ejemplo de transacción en sharded cluster
const session = db.getMongo().startSession()

session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" }
})

try {
    // Colección shardeada por user_id
    session.getDatabase("app").orders.updateOne(
        { user_id: "user-123", order_id: "ord-456" },
        { $set: { status: "shipped" } }
    )
    
    // Colección shardeada por user_id
    session.getDatabase("app").inventory.updateOne(
        { user_id: "user-123", sku: "prod-001" },
        { $inc: { quantity: -1 } }
    )
    
    session.commitTransaction()
    
} catch (error) {
    session.abortTransaction()
    
} finally {
    session.endSession()
}

// ============================================
// 7. CONCURRENTE CON TRANSACCIONES
// ============================================

// Problema: Dos transacciones intentan comprar el mismo item

// Transacción 1
const session1 = db.getMongo().startSession()
session1.startTransaction()

// Transacción 2
const session2 = db.getMongo().startSession()
session2.startTransaction()

try {
    // Ambas leen stock = 1
    const stock1 = db.productos.findOne({ _id: "prod-001" }, { session: session1 })
    const stock2 = db.productos.findOne({ _id: "prod-001" }, { session: session2 })
    
    print(`Stock transacción 1: ${stock1.stock}`)
    print(`Stock transacción 2: ${stock2.stock}`)
    
    // Transacción 1 intenta decrementar
    db.productos.updateOne(
        { _id: "prod-001", stock: { $gte: 1 } },
        { $inc: { stock: -1 } },
        { session: session1 }
    )
    
    session1.commitTransaction()
    
    // Transacción 2 intenta decrementar (stock ya es 0!)
    // El { $gte: 1 } falla
    db.productos.updateOne(
        { _id: "prod-001", stock: { $gte: 1 } },
        { $inc: { stock: -1 } },
        { session: session2 }
    )
    
    session2.commitTransaction()
    
} catch (error) {
    session2.abortTransaction()
    print(`Transacción 2 fallida: ${error.message}`)
    
} finally {
    session1.endSession()
    session2.endSession()
}

// ============================================
// 8. PATRONES RECOMENDADOS
// ============================================

// Patrón 1: Retry Logic
function ejecutarConRetry(callback, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        const session = db.getMongo().startSession()
        session.startTransaction()
        
        try {
            const result = callback(session)
            session.commitTransaction()
            return result
            
        } catch (error) {
            session.abortTransaction()
            
            if (error.hasErrorLabel("TransientTransactionError") && i < maxRetries - 1) {
                print(`Reintentando... intento ${i + 2}`)
                continue
            }
            
            throw error
            
        } finally {
            session.endSession()
        }
    }
}

// Uso
ejecutarConRetry((session) => {
    const db = session.getDatabase("tienda_db")
    // Operaciones...
})

// Patrón 2: Savepoints (simulado)
let savedOperations = []

function crearSavepoint() {
    savedOperations = []
}

function guardarOperacion(op) {
    savedOperations.push(op)
}

function rollbackToSavepoint() {
    // Aplicar operaciones inversas
    for (const op of savedOperations.reverse()) {
        // Ejecutar rollback de cada operación
    }
}

// ============================================
// 9. LIMITACIONES
// ============================================

/*
LIMITACIONES DE TRANSACCIONES:
- No pueden operar en:
  * Colección system.*
  * Colecciones en admin, local, config
  * Colecciones shardeadas sin shard key en filter

- Límites de tamaño:
  * 16MB por documento
  * Transacciones grandes pueden causar problemas de memoria

- No disponibles en:
  * Standalone (single node)
  * Requiere replica set

- Performance:
  * Añaden latencia
  * Usar solo cuando es necesario
*/

// ============================================
// 10. EJERCICIOS PRÁCTICOS
// ============================================

// Ejercicio 1: Transferencia bancaria atómica
function transferencia(origenId, destinoId, monto) {
    const session = db.getMongo().startSession()
    session.startTransaction()
    
    try {
        const db = session.getDatabase("banco")
        
        // Verificar saldo
        const cuentaOrigen = db.cuentas.findOne({ _id: origenId }, { session })
        if (cuentaOrigen.saldo < monto) {
            throw new Error("Saldo insuficiente")
        }
        
        // Debitar
        db.cuentas.updateOne(
            { _id: origenId, saldo: { $gte: monto } },
            { $inc: { saldo: -monto } },
            { session }
        )
        
        // Creditar
        db.cuentas.updateOne(
            { _id: destinoId },
            { $inc: { saldo: monto } },
            { session }
        )
        
        // Registrar
        db.transferencias.insertOne({
            origen: origenId,
            destino: destinoId,
            monto: monto,
            fecha: new Date()
        }, { session })
        
        session.commitTransaction()
        return true
        
    } catch (error) {
        session.abortTransaction()
        throw error
        
    } finally {
        session.endSession()
    }
}

// Ejercicio 2: Compra con inventario
function comprarProducto(clienteId, productos) {
    const session = db.getMongo().startSession()
    session.startTransaction()
    
    try {
        const db = session.getDatabase("tienda")
        let total = 0
        
        for (const item of productos) {
            const resultado = db.inventario.findOneAndUpdate(
                { sku: item.sku, stock: { $gte: item.cantidad } },
                { $inc: { stock: -item.cantidad } },
                { returnDocument: "after", session }
            )
            
            if (!resultado) {
                throw new Error(`Producto ${item.sku} sin stock`)
            }
            
            total += resultado.precio * item.cantidad
        }
        
        db.ordenes.insertOne({
            cliente_id: clienteId,
            productos: productos,
            total: total,
            fecha: new Date()
        }, { session })
        
        session.commitTransaction()
        return { success: true, total }
        
    } catch (error) {
        session.abortTransaction()
        return { success: false, error: error.message }
        
    } finally {
        session.endSession()
    }
}
