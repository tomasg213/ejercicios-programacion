const express = require('express')
const router = express.Router()
const { crearPedido, getPedido, getTodosPedidos, cancelarPedido } = require('../services/procesador')

router.post('/', (req, res) => {
  const { cliente, items, total } = req.body
  
  if (!cliente || !items || items.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: 'Cliente y items requeridos' 
    })
  }
  
  const pedido = crearPedido({ cliente, items, total })
  
  res.status(201).json({ 
    success: true, 
    data: {
      id: pedido.id,
      estado: pedido.estado,
      tiempoEstimado: '3 segundos'
    } 
  })
})

router.get('/', (req, res) => {
  const { estado } = req.query
  const pedidos = getTodosPedidos(estado)
  res.json({ success: true, data: pedidos })
})

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pedido = getPedido(id)
  
  if (!pedido) {
    return res.status(404).json({ success: false, message: 'Pedido no encontrado' })
  }
  
  res.json({ success: true, data: pedido })
})

router.post('/:id/cancelar', (req, res) => {
  const id = parseInt(req.params.id)
  const pedido = cancelarPedido(id)
  
  if (!pedido) {
    return res.status(400).json({ 
      success: false, 
      message: 'No se puede cancelar. El pedido ya está en procesamiento o completado.' 
    })
  }
  
  res.json({ success: true, data: pedido })
})

module.exports = router
