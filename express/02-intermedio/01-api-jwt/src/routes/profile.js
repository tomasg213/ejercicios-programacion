const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/auth')
const { findUserById } = require('../data/usuarios')

router.get('/profile', authMiddleware, (req, res) => {
  const usuario = findUserById(req.user.id)
  
  if (!usuario) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
  }
  
  const { password: _, ...userWithoutPassword } = usuario
  res.json({ success: true, data: userWithoutPassword })
})

router.put('/profile', authMiddleware, (req, res) => {
  const { nombre } = req.body
  const usuario = findUserById(req.user.id)
  
  if (!usuario) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
  }
  
  if (nombre) usuario.nombre = nombre
  
  const { password: _, ...userWithoutPassword } = usuario
  res.json({ success: true, data: userWithoutPassword })
})

module.exports = router
