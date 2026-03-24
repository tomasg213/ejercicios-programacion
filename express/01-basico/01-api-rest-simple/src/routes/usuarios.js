const express = require('express')
const router = express.Router()
const { 
  getUsuarios, 
  getUsuarioById, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario 
} = require('../data/usuarios')

// GET /usuarios - Listar todos
router.get('/', (req, res) => {
  const usuarios = getUsuarios()
  res.json({ success: true, data: usuarios })
})

// GET /usuarios/:id - Obtener por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const usuario = getUsuarioById(id)
  
  if (!usuario) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
  }
  
  res.json({ success: true, data: usuario })
})

// POST /usuarios - Crear usuario
router.post('/', (req, res) => {
  const { nombre, email, edad } = req.body
  
  if (!nombre || !email) {
    return res.status(400).json({ success: false, message: 'Nombre y email requeridos' })
  }
  
  const usuario = crearUsuario({ nombre, email, edad: edad || 18 })
  res.status(201).json({ success: true, data: usuario })
})

// PUT /usuarios/:id - Actualizar usuario
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const usuario = actualizarUsuario(id, req.body)
  
  if (!usuario) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
  }
  
  res.json({ success: true, data: usuario })
})

// DELETE /usuarios/:id - Eliminar usuario
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const eliminado = eliminarUsuario(id)
  
  if (!eliminado) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
  }
  
  res.json({ success: true, message: 'Usuario eliminado' })
})

module.exports = router
