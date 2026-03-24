const express = require('express')
const router = express.Router()
const { 
  getNotas, 
  getNotaById, 
  crearNota, 
  actualizarNota, 
  eliminarNota 
} = require('../data/notas')

router.get('/', (req, res) => {
  const { categoria, completada, busqueda, pagina, limite } = req.query
  
  const filtros = {
    categoria,
    completada: completada !== undefined ? completada === 'true' : undefined,
    busqueda,
    pagina: pagina ? parseInt(pagina) : undefined,
    limite: limite ? parseInt(limite) : 10
  }
  
  const notas = getNotas(filtros)
  res.json({ success: true, data: notas, total: notas.length })
})

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const nota = getNotaById(id)
  
  if (!nota) {
    return res.status(404).json({ success: false, message: 'Nota no encontrada' })
  }
  
  res.json({ success: true, data: nota })
})

router.post('/', (req, res) => {
  const { titulo, contenido, categoria, tags } = req.body
  
  if (!titulo) {
    return res.status(400).json({ success: false, message: 'Título requerido' })
  }
  
  const nota = crearNota({ titulo, contenido: contenido || '', categoria: categoria || 'general', tags: tags || [] })
  res.status(201).json({ success: true, data: nota })
})

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const nota = actualizarNota(id, req.body)
  
  if (!nota) {
    return res.status(404).json({ success: false, message: 'Nota no encontrada' })
  }
  
  res.json({ success: true, data: nota })
})

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const eliminado = eliminarNota(id)
  
  if (!eliminado) {
    return res.status(404).json({ success: false, message: 'Nota no encontrada' })
  }
  
  res.json({ success: true, message: 'Nota eliminada' })
})

module.exports = router
