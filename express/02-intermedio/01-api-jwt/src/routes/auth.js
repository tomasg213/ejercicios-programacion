const express = require('express')
const router = express.Router()
const { findUserByEmail, createUser, usuarios, refreshTokens } = require('../data/usuarios')
const { generateTokens, verifyRefreshToken } = require('../middleware/auth')

router.post('/register', (req, res) => {
  const { nombre, email, password } = req.body
  
  if (!nombre || !email || !password) {
    return res.status(400).json({ success: false, message: 'Todos los campos requeridos' })
  }
  
  if (findUserByEmail(email)) {
    return res.status(400).json({ success: false, message: 'Email ya registrado' })
  }
  
  const usuario = createUser({ nombre, email, password })
  const { password: _, ...userWithoutPassword } = usuario
  
  res.status(201).json({ success: true, data: userWithoutPassword })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  
  const usuario = findUserByEmail(email)
  if (!usuario) {
    return res.status(401).json({ success: false, message: 'Credenciales inválidas' })
  }
  
  const passwordEncoded = Buffer.from(password).toString('base64')
  if (usuario.password !== passwordEncoded) {
    return res.status(401).json({ success: false, message: 'Credenciales inválidas' })
  }
  
  const { accessToken, refreshToken } = generateTokens({ id: usuario.id, email: usuario.email })
  refreshTokens.push(refreshToken)
  
  const { password: _, ...userWithoutPassword } = usuario
  
  res.json({ 
    success: true, 
    data: { user: userWithoutPassword, accessToken, refreshToken } 
  })
})

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body
  
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(401).json({ success: false, message: 'Refresh token inválido' })
  }
  
  try {
    const decoded = verifyRefreshToken(refreshToken)
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({ 
      id: decoded.id, 
      email: decoded.email 
    })
    
    refreshTokens = refreshTokens.filter(t => t !== refreshToken)
    refreshTokens.push(newRefreshToken)
    
    res.json({ success: true, data: { accessToken, refreshToken: newRefreshToken } })
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido' })
  }
})

router.post('/logout', (req, res) => {
  const { refreshToken } = req.body
  refreshTokens = refreshTokens.filter(t => t !== refreshToken)
  res.json({ success: true, message: 'Logout exitoso' })
})

module.exports = router
