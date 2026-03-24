# Ejercicio 1: Replicación y Sharding

## Caso Real
Configura replicación y sharding para alta disponibilidad y escalabilidad.

## Replica Set

### 1.1 Configuración inicial
```javascript
// Iniciar replica set
// rs.initiate()
// rs.add("servidor2:27017")
// rs.add("servidor3:27017")

// Estado del replica set
rs.status();

// Operaciones de lectura
db.getMongo().setReadPref('primaryPreferred');
db.getMongo().setReadPref('secondary');
```

### 1.2 Failover automático
```javascript
// MongoDB automáticamente detecta primary caído
// Secondary se convierte en primary
// Conexiones cliente redirigidas automáticamente
```

## Sharding

### 1.3 Configurar sharding
```javascript
// Habilitar sharding en base de datos
sh.enableSharding("mi_tienda");

// Shardear colección
sh.shardCollection("mi_tienda.productos", { "_id": "hashed" });

// Shardear por rango
sh.shardCollection("mi_tienda.pedidos", { "cliente_id": 1 });
```

### 1.4 Balanceo
```javascript
// Ver estado de shards
sh.status();

// Mover chunk manualmente
sh.moveChunk("mi_tienda.productos", { "_id": ObjectId("...")}, "shard0001");

// Configurar balanceador
sh.setBalancerState(true);
```

## Ejercicios
```javascript
// 1. Ver estado del cluster sharded
sh.status();

// 2. Añadir shard a replica set
rs.add("nuevo-servidor:27017");

// 3. Forzar elección de nuevo primary
rs.freeze(0);  // descongelar
rs.stepDown(); // forzar election

// 4. Ver distribución de chunks
db.getCollection('chunks').find({ ns: "mi_tienda.productos" });
```
