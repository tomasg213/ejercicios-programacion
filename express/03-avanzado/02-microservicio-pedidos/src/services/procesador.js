const EventEmitter = require('events')

class ColaPedidos extends EventEmitter {
  constructor() {
    super()
    this.cola = []
    this.procesando = false
  }

  agregar(pedido) {
    this.cola.push(pedido)
    this.emit('pedido-agregado', pedido)
    this.procesar()
  }

  async procesar() {
    if (this.procesando || this.cola.length === 0) return

    this.procesando = true
    const pedido = this.cola.shift()

    pedido.estado = 'procesando'
    this.emit('pedido-procesando', pedido)

    await this.delay(3000)

    pedido.estado = 'completado'
    pedido.fechaCompletado = new Date()
    this.emit('pedido-completado', pedido)

    this.procesando = false
    this.procesar()
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

const cola = new ColaPedidos()
const pedidos = new Map()
let siguienteId = 1

function crearPedido(datos) {
  const pedido = {
    id: siguienteId++,
    ...datos,
    estado: 'pendiente',
    fechaCreacion: new Date(),
    items: datos.items || []
  }
  
  pedidos.set(pedido.id, pedido)
  cola.agregar(pedido)
  
  return pedido
}

function getPedido(id) {
  return pedidos.get(id)
}

function getTodosPedidos(filtro) {
  const todos = Array.from(pedidos.values())
  
  if (filtro === 'pendiente') return todos.filter(p => p.estado === 'pendiente')
  if (filtro === 'procesando') return todos.filter(p => p.estado === 'procesando')
  if (filtro === 'completado') return todos.filter(p => p.estado === 'completado')
  if (filtro === 'cancelado') return todos.filter(p => p.estado === 'cancelado')
  
  return todos
}

function cancelarPedido(id) {
  const pedido = pedidos.get(id)
  if (!pedido) return null
  
  if (pedido.estado !== 'pendiente') return null
  
  pedido.estado = 'cancelado'
  return pedido
}

cola.on('pedido-procesando', (pedido) => {
  console.log(`📦 Pedido ${pedido.id}: Procesando...`)
})

cola.on('pedido-completado', (pedido) => {
  console.log(`✅ Pedido ${pedido.id}: Completado!`)
})

module.exports = {
  cola,
  pedidos,
  crearPedido,
  getPedido,
  getTodosPedidos,
  cancelarPedido
}
