const express = require('express')
const router = express.Router()
const { 
  getProductos, 
  getProductoById, 
  crearProducto, 
  actualizarProducto, 
  eliminarProducto,
  getCategorias 
} = require('../data/productos')

router.get('/', (req, res) => {
  const { categoria, disponible, minPrecio, maxPrecio } = req.query
  
  const filtros = {
    categoria,
    disponible: disponible !== undefined ? disponible === 'true' : undefined,
    minPrecio: minPrecio ? parseFloat(minPrecio) : undefined,
    maxPrecio: maxPrecio ? parseFloat(maxPrecio) : undefined
  }
  
  const productos = getProductos(filtros)
  res.json({ success: true, data: productos })
})

router.get('/categorias', (req, res) => {
  res.json({ success: true, data: getCategorias() })
})

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const producto = getProductoById(id)
  
  if (!producto) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado' })
  }
  
  res.json({ success: true, data: producto })
})

router.post('/', (req, res) => {
  const { nombre, precio, categoria, descripcion, disponible } = req.body
  
  if (!nombre || !precio) {
    return res.status(400).json({ success: false, message: 'Nombre y precio requeridos' })
  }
  
  if (precio < 0) {
    return res.status(400).json({ success: false, message: 'El precio no puede ser negativo' })
  }
  
  const producto = crearProducto({ 
    nombre, 
    precio: parseFloat(precio), 
    categoria: categoria || 'General',
    descripcion: descripcion || '',
    disponible: disponible !== false
  })
  
  res.status(201).json({ success: true, data: producto })
})

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const producto = actualizarProducto(id, req.body)
  
  if (!producto) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado' })
  }
  
  res.json({ success: true, data: producto })
})

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const eliminado = eliminarProducto(id)
  
  if (!eliminado) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado' })
  }
  
  res.json({ success: true, message: 'Producto eliminado' })
})

module.exports = router
