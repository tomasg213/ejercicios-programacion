const express = require('express')
const http = require('http')
const { setupSocket } = require('./socket/handlers')

const app = express()
const server = http.createServer(app)
const io = setupSocket(server)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Chat en Tiempo Real</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; background: #1a1a2e; color: white; }
        .container { max-width: 900px; margin: 0 auto; padding: 20px; }
        .login { text-align: center; padding: 50px; }
        .login input, .login select { padding: 12px; margin: 5px; border-radius: 5px; border: none; }
        .login button { padding: 12px 24px; background: #e94560; color: white; border: none; border-radius: 5px; cursor: pointer; }
        .chat { display: none; }
        .sidebar { width: 200px; background: #16213e; padding: 15px; border-radius: 8px; }
        .main-chat { flex: 1; display: flex; flex-direction: column; }
        .messages { flex: 1; background: #0f3460; padding: 15px; border-radius: 8px; overflow-y: auto; height: 400px; }
        .message { margin-bottom: 10px; }
        .message .nombre { color: #e94560; font-weight: bold; }
        .message .texto { color: #ddd; }
        .message .tiempo { color: #666; font-size: 0.7rem; }
        .input-area { display: flex; gap: 10px; margin-top: 15px; }
        .input-area input { flex: 1; padding: 12px; border-radius: 5px; border: none; }
        .input-area button { padding: 12px 24px; background: #e94560; color: white; border: none; border-radius: 5px; cursor: pointer; }
        .usuarios-lista { margin-top: 20px; }
        .usuarios-lista h4 { margin-bottom: 10px; }
        .usuarios-lista li { color: #aaa; margin-bottom: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="login" id="login">
          <h2>Bienvenido al Chat</h2>
          <input type="text" id="nombre" placeholder="Tu nombre" />
          <select id="sala">
            <option value="general">General</option>
            <option value="tecnologia">Tecnología</option>
            <option value="random">Random</option>
            <option value="musica">Música</option>
          </select>
          <button onclick="unirse()">Entrar</button>
        </div>
        
        <div class="chat" id="chat">
          <div style="display: flex; gap: 20px;">
            <div class="sidebar">
              <h3>Sala: <span id="sala-actual">general</span></h3>
              <select id="cambiar-sala" onchange="cambiarSala()">
                <option value="general">General</option>
                <option value="tecnologia">Tecnología</option>
                <option value="random">Random</option>
                <option value="musica">Música</option>
              </select>
              <div class="usuarios-lista">
                <h4>Usuarios online</h4>
                <ul id="usuarios"></ul>
              </div>
            </div>
            <div class="main-chat">
              <div class="messages" id="messages"></div>
              <div class="input-area">
                <input type="text" id="mensaje" placeholder="Escribe un mensaje..." onkeypress="if(event.key==='Enter')enviar()" />
                <button onclick="enviar()">Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="/socket.io/socket.io.js"></script>
      <script>
        const socket = io()
        let miNombre = ''

        function unirse() {
          miNombre = document.getElementById('nombre').value
          const sala = document.getElementById('sala').value
          if (!miNombre) return alert('Ingresa tu nombre')
          
          socket.emit('unirse', { nombre: miNombre, sala })
          document.getElementById('login').style.display = 'none'
          document.getElementById('chat').style.display = 'flex'
        }

        function enviar() {
          const input = document.getElementById('mensaje')
          const texto = input.value.trim()
          if (texto) {
            socket.emit('mensaje', { texto })
            input.value = ''
          }
        }

        function cambiarSala() {
          const sala = document.getElementById('cambiar-sala').value
          socket.emit('cambiar-sala', { sala })
        }

        socket.on('salas-disponibles', (salas) => {
          console.log('Salas:', salas)
        })

        socket.on('historial', (mensajes) => {
          const container = document.getElementById('messages')
          container.innerHTML = mensajes.map(m => crearMensaje(m)).join('')
          container.scrollTop = container.scrollHeight
        })

        socket.on('mensaje', (mensaje) => {
          const container = document.getElementById('messages')
          container.innerHTML += crearMensaje(mensaje)
          container.scrollTop = container.scrollHeight
        })

        socket.on('nuevo-usuario', (data) => {
          agregarNotificacion(data.mensaje)
        })

        socket.on('usuario-izq', (data) => {
          agregarNotificacion(data.mensaje)
        })

        socket.on('usuarios-sala', (usuarios) => {
          const lista = document.getElementById('usuarios')
          lista.innerHTML = usuarios.map(u => '<li>' + u.nombre + '</li>').join('')
        })

        function crearMensaje(m) {
          const hora = new Date(m.tiempo).toLocaleTimeString()
          return '<div class="message"><span class="nombre">' + m.nombre + '</span>: <span class="texto">' + m.texto + '</span> <span class="tiempo">' + hora + '</span></div>'
        }

        function agregarNotificacion(texto) {
          const container = document.getElementById('messages')
          container.innerHTML += '<div class="message" style="color: #666; font-style: italic;">' + texto + '</div>'
          container.scrollTop = container.scrollHeight
        }
      </script>
    </body>
    </html>
  `)
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Chat WebSocket en http://localhost:${PORT}`)
})
