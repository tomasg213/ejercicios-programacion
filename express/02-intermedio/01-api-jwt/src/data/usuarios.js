let usuarios = []
let refreshTokens = []

const crypto = require('crypto')
function generateId() {
  return crypto.randomBytes(4).toString('hex')
}

function findUserByEmail(email) {
  return usuarios.find(u => u.email === email)
}

function findUserById(id) {
  return usuarios.find(u => u.id === id)
}

function createUser(datos) {
  const usuario = {
    id: generateId(),
    ...datos,
    password: Buffer.from(datos.password).toString('base64'),
    createdAt: new Date()
  }
  usuarios.push(usuario)
  return usuario
}

module.exports = {
  usuarios,
  refreshTokens,
  findUserByEmail,
  findUserById,
  createUser
}
