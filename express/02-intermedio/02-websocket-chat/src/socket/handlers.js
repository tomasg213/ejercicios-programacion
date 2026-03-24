const { Server } = require('socket.io')
const http = require('http')

let usuarios = new Map()
let mensajes = []
const SALAS = ['general', 'tecnologia', 'random', 'musica']

function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: '*' }
  })

  io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('unirse', ({ nombre, sala }) => {
      const userSala = usuarios.get(socket.id)?.sala
      if (userSala && userSala !== sala) {
        socket.leave(userSala)
      }

      socket.join(sala)
      usuarios.set(socket.id, { nombre, sala })
      
      socket.emit('salas-disponibles', SALAS)
      io.to(sala).emit('nuevo-usuario', { nombre, mensaje: `${nombre} se unió al chat` })
      io.to(sala).emit('usuarios-sala', getUsuariosSala(sala))
      
      const historial = mensajes.filter(m => m.sala === sala).slice(-50)
      socket.emit('historial', historial)
    })

    socket.on('mensaje', (data) => {
      const usuario = usuarios.get(socket.id)
      if (!usuario) return

      const mensaje = {
        id: Date.now(),
        nombre: usuario.nombre,
        texto: data.texto,
        sala: usuario.sala,
        tiempo: new Date().toISOString()
      }
      
      mensajes.push(mensaje)
      if (mensajes.length > 500) mensajes.shift()

      io.to(usuario.sala).emit('mensaje', mensaje)
    })

    socket.on('cambiar-sala', ({ sala }) => {
      if (!SALAS.includes(sala)) return
      
      const usuario = usuarios.get(socket.id)
      if (!usuario) return

      const salaAnterior = usuario.sala
      socket.leave(salaAnterior)
      io.to(salaAnterior).emit('usuario-izq', { nombre: usuario.nombre, mensaje: `${usuario.nombre} abandonó el chat` })
      io.to(salaAnterior).emit('usuarios-sala', getUsuariosSala(salaAnterior))

      socket.join(sala)
      usuario.sala = sala
      io.to(sala).emit('nuevo-usuario', { nombre: usuario.nombre, mensaje: `${usuario.nombre} se unió al chat` })
      io.to(sala).emit('usuarios-sala', getUsuariosSala(sala))

      const historial = mensajes.filter(m => m.sala === sala).slice(-50)
      socket.emit('historial', historial)
    })

    socket.on('disconnect', () => {
      const usuario = usuarios.get(socket.id)
      if (usuario) {
        io.to(usuario.sala).emit('usuario-izq', { nombre: usuario.nombre, mensaje: `${usuario.nombre} abandonó el chat` })
        io.to(usuario.sala).emit('usuarios-sala', getUsuariosSala(usuario.sala))
      }
      usuarios.delete(socket.id)
      console.log(`Usuario desconectado: ${socket.id}`)
    })
  })

  function getUsuariosSala(sala) {
    const usuariosSala = []
    for (const [socketId, usuario] of usuarios) {
      if (usuario.sala === sala) {
        usuariosSala.push({ socketId, nombre: usuario.nombre })
      }
    }
    return usuariosSala
  }

  return io
}

module.exports = { setupSocket, SALAS }
