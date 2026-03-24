# Ejercicio 2: Microservicio de Pedidos

## Caso Real
Crea un microservicio de pedidos con cola de procesamiento usando Bull/RabbitMQ simulado.

## Requisitos
1. Crear pedidos
2. Procesar pedidos con delay simulado
3. Estados del pedido (pendiente, procesando, completado, cancelado)
4. Notificaciones
5. API de consulta de estado

## Estados de Pedido
```
pendiente → procesando → completado
    ↓                      ↑
  cancelado ←──────────────┘
```

## Estructura de Archivos
```
02-microservicio-pedidos/
├── src/
│   ├── index.js
│   ├── routes/pedidos.js
│   └── services/procesador.js
├── package.json
```
