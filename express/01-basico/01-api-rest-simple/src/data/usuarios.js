let usuarios = [
  { id: 1, nombre: 'Ana García', email: 'ana@email.com', edad: 28 },
  { id: 2, nombre: 'Carlos López', email: 'carlos@email.com', edad: 35 },
  { id: 3, nombre: 'María Rodríguez', email: 'maria@email.com', edad: 32 }
]

let siguienteId = 4

function getUsuarios() {
  return usuarios
}

function getUsuarioById(id) {
  return usuarios.find(u => u.id === id)
}

function crearUsuario(datos) {
  const usuario = { id: siguienteId++, ...datos }
  usuarios.push(usuario)
  return usuario
}

function actualizarUsuario(id, datos) {
  const index = usuarios.findIndex(u => u.id === id)
  if (index === -1) return null
  
  usuarios[index] = { ...usuarios[index], ...datos }
  return usuarios[index]
}

function eliminarUsuario(id) {
  const index = usuarios.findIndex(u => u.id === id)
  if (index === -1) return false
  
  usuarios.splice(index, 1)
  return true
}

module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
}
