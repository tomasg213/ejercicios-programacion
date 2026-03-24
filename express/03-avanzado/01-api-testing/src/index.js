const express = require('express')
const productosRouter = require('./routes/productos')

const app = express()

app.use(express.json())
app.use('/productos', productosRouter)

app.get('/', (req, res) => {
  res.json({ message: 'API de Productos con Testing', version: '1.0.0' })
})

module.exports = app
