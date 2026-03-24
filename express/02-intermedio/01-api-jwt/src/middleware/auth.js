const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET || 'mi-secreto'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secreto'

function generateTokens(payload) {
  const accessToken = jwt.sign(payload, SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' })
  return { accessToken, refreshToken }
}

function verifyAccessToken(token) {
  return jwt.verify(token, SECRET)
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET)
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token requerido' })
  }
  
  const token = authHeader.split(' ')[1]
  
  try {
    const decoded = verifyAccessToken(token)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido' })
  }
}

module.exports = {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
  authMiddleware
}
