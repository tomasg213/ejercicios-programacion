// ============================================
// REPLICACIÓN Y SHARDING
// MongoDB en Producción
// ============================================

// ============================================
// 1. CONCEPTOS BÁSICOS
// ============================================

/*
ARQUITECTURA REPLICA SET:
                        
        ┌─────────────┐
        │   Primary   │  (Escrituras y lecturas)
        └──────┬──────┘
               │
       ┌───────┴───────┐
       │               │
┌──────┴──────┐  ┌──────┴──────┐
│  Secondary  │  │  Secondary  │
│  (Replica)  │  │  (Replica)  │
└─────────────┘  └─────────────┘

SHARDING (Particionamiento):
                        
┌──────────────────────────────────────┐
│           Router (mongos)            │
└──────────┬───────────────┬───────────┘
           │               │
    ┌──────┴──────┐  ┌──────┴──────┐
    │   Shard 1   │  │   Shard 2   │
    │  (A-M)      │  │  (N-Z)      │
    └─────────────┘  └─────────────┘
*/

// ============================================
// 2. CONFIGURAR REPLICA SET
// ============================================

// Iniciar mongod como replica set
// mongod --replSet "rs0" --port 27017 --dbpath /data/rs1

// Conectar al primary e iniciar replica set
// rs.initiate({
//     _id: "rs0",
//     members: [
//         { _id: 0, host: "localhost:27017" },
//         { _id: 1, host: "localhost:27018" },
//         { _id: 2, host: "localhost:27019" }
//     ]
// })

// ============================================
// 3. OPERACIONES EN REPLICA SET
// ============================================

// Ver estado del replica set
rs.status()

// Ver configuración
rs.conf()

// Ver谁是 primary
rs.isMaster()

// Agregar miembro
rs.add("localhost:27020")

// Remover miembro
rs.remove("localhost:27019")

// ============================================
// 4. LECTURAS Y ESCRITURAS EN REPLICA SET
// ============================================

// Escrituras siempre van al primary
db.productos.insertOne({ nombre: "Test", precio: 10 })

// Lectura del secondary (eventually consistent)
// Puede fallar si no hay replica suficiente
db.productos.find().readPref("secondary")

// Tags para dirigir lecturas
// Definir en configuración del replica set:
// { _id: "rs0", members: [ { _id: 0, host: "localhost:27017", tags: { "region": "us-east" } } ] }

// Leer desde tag específico
db.productos.find().readPref("secondary", [{ "region": "us-east" }])

// ============================================
// 5. TAGS Y PRIORIDADES
// ============================================

// Modificar miembro con priority
// rs.reconfig({
//     _id: "rs0",
//     version: 2,
//     members: [
//         { _id: 0, host: "localhost:27017", priority: 2 },
//         { _id: 1, host: "localhost:27018", priority: 1 },
//         { _id: 2, host: "localhost:27019", priority: 0, hidden: true }
//     ]
// })

// priority: Mayor = más probable que sea primary
// hidden: Oculto para aplicaciones, para backups

// ============================================
// 6. OPLOG (Operational Log)
// ============================================

// El OPLog registra todas las operaciones de escritura
// Se usa para replicar cambios a los secondary

// Ver tamaño del oplog
db.getSiblingDB('local').oplog.rs.stats()

// Ver entradas del oplog
db.getSiblingDB('local').oplog.rs.find().sort({ts: -1}).limit(5)

// ============================================
// 7. FAILOVER Y RECUPERACIÓN
// ============================================

// Forzar elección de nuevo primary
// rs.freeze(30)  // Prevenir que este nodo sea primary por 30 segundos
// rs.stepDown()  // Forzar que el primary se convierta en secondary

// Sincronización de secondary
// rs.syncFrom("localhost:27017")  // Especificar de quién sincronizar

// Reconstruir índice en secondary
// db.getSiblingDB('local').adminCommand({
//     "rebuildIndexes": <tabla>
// })

// ============================================
// 8. SHARDING BÁSICO
// ============================================

// Iniciar config server
// mongod --configsvr --dbpath /data/config --port 27019

// Iniciar shard
// mongod --shardsvr --dbpath /data/shard1 --port 27018

// Iniciar mongos (router)
// mongos --configdb "localhost:27019" --port 27017

// Añadir shards al cluster
// sh.addShard("localhost:27018")
// sh.addShard("localhost:27020")

// Habilitar sharding en base de datos
// sh.enableSharding("tienda_db")

// Habilitar sharding en colección con shard key
// sh.shardCollection("tienda_db.productos", { "_id": "hashed" })
// sh.shardCollection("tienda_db.ordenes", { "cliente_id": "hashed" })

// ============================================
// 9. SHARD KEYS
// ============================================

// Shard key determina cómo se distribuyen los datos

// Ranged Sharding (rangos de valores)
db.products.createIndex({ sku: 1 })
// shardCollection con { sku: 1 }
// Datos con sku相近 van al mismo shard

// Hashed Sharding (hash de valores)
db.orders.createIndex({ order_id: "hashed" })
// shardCollection con { order_id: "hashed" }
// Mejor distribución para _id secuenciales

// Compound Shard Key
db.events.createIndex({ user_id: 1, timestamp: -1 })
// shardCollection con { user_id: 1, timestamp: -1 }
// Agrupa eventos por usuario

// ============================================
// 10. BALANCEO DE SHARDS
// ============================================

// Ver estado del balancer
sh.getBalancerState()
sh.isBalancerRunning()

// Mover chunk manualmente
// moveChunk para redistribuir datos

// Configurar size máximo de chunk (default 64MB)
// sh.setMongoDRange({ maxChunkSize: 128 })

// Zones (afinidad de datos con shards)
sh.addTagRange(
    "tienda_db.ordenes",
    { region: "us-east", _id: MinKey },
    { region: "us-east", _id: MaxKey },
    "us-east-shard"
)

// ============================================
// 11. CONSULTAS EN SHARDED CLUSTER
// ============================================

// Scatter-gather query (busca en todos los shards)
db.productos.find({ precio: { $gt: 100 } })

// Targeted query (usa shard key)
db.ordenes.find({ cliente_id: "12345" })

// Para mejor rendimiento, siempre incluir shard key
db.ordenes.find({ cliente_id: "12345", fecha: { $gt: new Date() } })

// ============================================
// 12. MONITOREO
// ============================================

// Estado del cluster
sh.status()

// Estadísticas de shards
db.adminCommand({ listShards: 1 })

// Ver distribución de chunks
db.getSiblingDB('config').chunks.find().pretty()

//监控 MongoDB
// db.serverStatus()
// db.stats()
// db.collection.stats()

// ============================================
// 13. EJERCICIOS PRÁCTICOS
// ============================================

// Ejercicio 1: Configurar replica set local
// 1. Crear directorios: mkdir -p /data/rs1 /data/rs2 /data/rs3
// 2. Iniciar 3 mongod con --replSet "miReplica"
// 3. Conectar y ejecutar rs.initiate()

// Ejercicio 2: Cambiar priority de miembros
// Incrementar priority de un secondary para que se vuelva primary
// rs.reconfig({ _id: "rs0", members: [..., { priority: 2 }] })

// Ejercicio 3: Configurar sharding
// 1. Iniciar config server
// 2. Iniciar mongos
// 3. sh.enableSharding("mi_db")
// 4. sh.shardCollection("mi_db.collection", { user_id: "hashed" })

// Ejercicio 4: Verificar distribución de datos
// sh.status()
// db.collection.getShardDistribution()

// Ejercicio 5: Forzar balanceo
// sh.startBalancer()
// sh.stopBalancer()
