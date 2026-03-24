let notas = [
  { id: 1, titulo: 'Reunión equipo', contenido: 'Revisar avances del proyecto', categoria: 'trabajo', tags: ['reunion', 'equipo'], completada: false, fechaCreacion: new Date('2024-01-15') },
  { id: 2, titulo: 'Comprar groceries', contenido: 'Leche, pan, huevos', categoria: 'personal', tags: ['compras'], completada: true, fechaCreacion: new Date('2024-01-14') },
  { id: 3, titulo: 'Estudiar TypeScript', contenido: 'Revisar tipos y generics', categoria: 'estudio', tags: ['typescript', 'programacion'], completada: false, fechaCreacion: new Date('2024-01-13') }
]

let siguienteId = 4

function getNotas(filtros = {}) {
  let resultado = [...notas]
  
  if (filtros.categoria) {
    resultado = resultado.filter(n => n.categoria === filtros.categoria)
  }
  
  if (filtros.completada !== undefined) {
    resultado = resultado.filter(n => n.completada === filtros.completada)
  }
  
  if (filtros.busqueda) {
    const query = filtros.busqueda.toLowerCase()
    resultado = resultado.filter(n => 
      n.titulo.toLowerCase().includes(query) || 
      n.contenido.toLowerCase().includes(query)
    )
  }
  
  if (filtros.pagina && filtros.limite) {
    const inicio = (filtros.pagina - 1) * filtros.limite
    resultado = resultado.slice(inicio, inicio + filtros.limite)
  }
  
  return resultado
}

function getNotaById(id) {
  return notas.find(n => n.id === id)
}

function crearNota(datos) {
  const nota = {
    id: siguienteId++,
    ...datos,
    completada: false,
    fechaCreacion: new Date()
  }
  notas.push(nota)
  return nota
}

function actualizarNota(id, datos) {
  const index = notas.findIndex(n => n.id === id)
  if (index === -1) return null
  
  notas[index] = { ...notas[index], ...datos }
  return notas[index]
}

function eliminarNota(id) {
  const index = notas.findIndex(n => n.id === id)
  if (index === -1) return false
  
  notas.splice(index, 1)
  return true
}

module.exports = {
  getNotas,
  getNotaById,
  crearNota,
  actualizarNota,
  eliminarNota
}
