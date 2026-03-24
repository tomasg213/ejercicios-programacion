let productos = []
let siguienteId = 1

const categorias = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar']

function getProductos(filtros = {}) {
  let resultado = [...productos]
  
  if (filtros.categoria) {
    resultado = resultado.filter(p => p.categoria === filtros.categoria)
  }
  
  if (filtros.disponible !== undefined) {
    resultado = resultado.filter(p => p.disponible === filtros.disponible)
  }
  
  if (filtros.minPrecio) {
    resultado = resultado.filter(p => p.precio >= filtros.minPrecio)
  }
  
  if (filtros.maxPrecio) {
    resultado = resultado.filter(p => p.precio <= filtros.maxPrecio)
  }
  
  return resultado
}

function getProductoById(id) {
  return productos.find(p => p.id === id)
}

function crearProducto(datos) {
  const producto = { id: siguienteId++, ...datos, fechaCreacion: new Date() }
  productos.push(producto)
  return producto
}

function actualizarProducto(id, datos) {
  const index = productos.findIndex(p => p.id === id)
  if (index === -1) return null
  
  productos[index] = { ...productos[index], ...datos }
  return productos[index]
}

function eliminarProducto(id) {
  const index = productos.findIndex(p => p.id === id)
  if (index === -1) return false
  
  productos.splice(index, 1)
  return true
}

function getCategorias() {
  return categorias
}

module.exports = {
  productos,
  getProductos,
  getProductoById,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  getCategorias
}
