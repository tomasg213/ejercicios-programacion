const express = require('express')
const notasRouter = require('./routes/notas')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API de Notas', version: '1.0.0' })
})

app.use('/notas', notasRouter)

app.listen(PORT, () => {
  console.log(`Servidor de notas en http://localhost:${PORT}`)
})
