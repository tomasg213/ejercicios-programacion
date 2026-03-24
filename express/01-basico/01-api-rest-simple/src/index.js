const express = require('express')
const usuariosRouter = require('./routes/usuarios')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API REST Simple funcionando', version: '1.0.0' })
})

app.use('/usuarios', usuariosRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Error interno del servidor' })
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})
