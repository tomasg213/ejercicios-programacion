/**
 * Ejercicio 1: Chat en Tiempo Real con WebSocket
 * 
 * Startup de comunicacion - Sistema de chat en tiempo real.
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

const estado = {
    salas: ['general', 'tecnologia', 'random'],
    historial: new Map(),
    usuarios: new Map()
};

estado.salas.forEach(sala => {
    estado.historial.set(sala, []);
});

app.use(express.static(path.join(__dirname, 'public')));

function obtenerTimestamp() {
    return new Date().toISOString();
}

function agregarAlHistorial(sala, mensaje) {
    const historial = estado.historial.get(sala);
    historial.push(mensaje);
    if (historial.length > 50) {
        historial.shift();
    }
}

io.on('connection', (socket) => {
    console.log(`[CONECTADO] Socket: ${socket.id}`);
    
    socket.emit('salas', estado.salas);
    socket.emit('historial', { sala: 'general', mensajes: estado.historial.get('general') });
    
    socket.on('join', ({ usuario, sala }) => {
        if (!usuario || !sala) {
            socket.emit('error', { mensaje: 'Usuario y sala son requeridos' });
            return;
        }
        
        if (!estado.salas.includes(sala)) {
            socket.emit('error', { mensaje: 'Sala no existe' });
            return;
        }
        
        socket.join(sala);
        estado.usuarios.set(socket.id, { usuario, sala });
        
        const mensajeSistema = {
            tipo: 'sistema',
            mensaje: `${usuario} se unio a ${sala}`,
            timestamp: obtenerTimestamp()
        };
        
        io.to(sala).emit('message', mensajeSistema);
        io.to(sala).emit('usuarios', obtenerUsuariosEnSala(sala));
        
        console.log(`[JOIN] ${usuario} entro a ${sala}`);
    });
    
    socket.on('message', ({ sala, mensaje }) => {
        const info = estado.usuarios.get(socket.id);
        
        if (!info) {
            socket.emit('error', { mensaje: 'Debes unirte a una sala primero' });
            return;
        }
        
        const mensajeCompleto = {
            tipo: 'usuario',
            usuario: info.usuario,
            sala: info.sala,
            mensaje,
            timestamp: obtenerTimestamp()
        };
        
        agregarAlHistorial(info.sala, mensajeCompleto);
        io.to(info.sala).emit('message', mensajeCompleto);
    });
    
    socket.on('cambiarSala', ({ sala }) => {
        const info = estado.usuarios.get(socket.id);
        
        if (!info) return;
        
        socket.leave(info.sala);
        socket.join(sala);
        
        const mensajeSistema = {
            tipo: 'sistema',
            mensaje: `${info.usuario} salio de ${info.sala}`,
            timestamp: obtenerTimestamp()
        };
        io.to(info.sala).emit('message', mensajeSistema);
        
        estado.usuarios.set(socket.id, { usuario: info.usuario, sala });
        
        socket.emit('historial', { sala, mensajes: estado.historial.get(sala) });
        
        mensajeSistema.mensaje = `${info.usuario} se unio a ${sala}`;
        io.to(sala).emit('message', mensajeSistema);
        
        actualizarUsuariosEnSalas();
    });
    
    socket.on('disconnect', () => {
        const info = estado.usuarios.get(socket.id);
        
        if (info) {
            const mensajeSistema = {
                tipo: 'sistema',
                mensaje: `${info.usuario} se desconecto`,
                timestamp: obtenerTimestamp()
            };
            io.to(info.sala).emit('message', mensajeSistema);
            estado.usuarios.delete(socket.id);
            actualizarUsuariosEnSalas();
        }
        
        console.log(`[DESCONECTADO] Socket: ${socket.id}`);
    });
});

function obtenerUsuariosEnSala(sala) {
    const usuarios = [];
    estado.usuarios.forEach((info) => {
        if (info.sala === sala) {
            usuarios.push(info.usuario);
        }
    });
    return usuarios;
}

function actualizarUsuariosEnSalas() {
    estado.salas.forEach(sala => {
        const usuarios = obtenerUsuariosEnSala(sala);
        io.to(sala).emit('usuarios', usuarios);
    });
}

server.listen(PORT, () => {
    console.log(`=== Chat en Tiempo Real ===`);
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log(`Salas disponibles: ${estado.salas.join(', ')}`);
});
