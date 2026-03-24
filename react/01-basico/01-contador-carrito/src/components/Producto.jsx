import { useState } from 'react'
import { Contador } from './Contador'
import { useCarrito } from './CarritoProvider'

export function Producto({ id, nombre, precio }) {
  const [cantidad, setCantidad] = useState(1)
  const { agregarProducto, eliminarProducto } = useCarrito()

  const handleAgregar = () => {
    agregarProducto({ id, nombre, precio, cantidad })
  }

  return (
    <div className="producto">
      <h3>{nombre}</h3>
      <p>${precio.toFixed(2)}</p>
      <Contador valorInicial={cantidad} onCambio={setCantidad} />
      <button onClick={handleAgregar}>Agregar al carrito</button>
    </div>
  )
}
