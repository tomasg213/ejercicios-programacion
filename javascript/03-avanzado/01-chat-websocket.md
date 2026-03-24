# Ejercicio 1: Chat en Tiempo Real con WebSocket

## Caso Real
Trabajas en una startup de comunicación. Necesitas implementar un chat en tiempo real para una aplicación web.

## Conceptos
- **WebSocket**: Comunicación bidireccional en tiempo real
- **Socket.io**: Librería que simplifica WebSocket
- **Rooms**: Salas privadas para grupos
- **Events**: Mensajes personalizados (join, message, disconnect)

## Arquitectura
```
Cliente (Browser)
    ↓ WebSocket
Servidor (Node.js + Socket.io)
    ↓
Sala de Chat (Broadcast a todos los clientes)
```

## Requisitos
1. Servidor WebSocket con Socket.io
2. Cliente HTML/JS simple para probar
3. Sistema de salas (rooms)
4. Notificaciones de conexión/desconexión
5. Historial de mensajes (últimos 50)
6. Nombres de usuario

## Estructura de Proyecto
```
proyecto/
├── server.js
├── package.json
└── public/
    └── index.html
```

## Eventos
| Evento | Dirección | Descripción |
|--------|-----------|-------------|
| `connection` | Server ← Client | Usuario se conecta |
| `join` | Server ← Client | Usuario entra a sala |
| `message` | Bidireccional | Nuevo mensaje |
| `users` | Server → Client | Lista de usuarios |
| `disconnect` | Server ← Client | Usuario se desconecta |

## Ejemplo de Mensaje
```json
{
  "sala": "general",
  "usuario": "Juan",
  "mensaje": "Hola a todos!",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

## Pistas
- `npm install socket.io` para instalar
- `io.on('connection', ...)` para escuchar conexiones
- `socket.join('sala')` para unirse a sala
- `io.to('sala').emit('message', data)` para broadcast
- `socket.broadcast.emit()` para enviar a otros

## Conceptos a Practicar
- WebSocket
- Socket.io
- Rooms/Canales
- Eventos personalizados
- Estado del servidor
