const express = require('express')
const pedidosRouter = require('./routes/pedidos')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ 
    message: 'Microservicio de Pedidos',
    version: '1.0.0',
    endpoints: {
      crear: 'POST /pedidos',
      listar: 'GET /pedidos',
      consultar: 'GET /pedidos/:id',
      cancelar: 'POST /pedidos/:id/cancelar'
    }
  })
})

app.use('/pedidos', pedidosRouter)

app.listen(PORT, () => {
  console.log(`Microservicio de Pedidos en http://localhost:${PORT}`)
})
