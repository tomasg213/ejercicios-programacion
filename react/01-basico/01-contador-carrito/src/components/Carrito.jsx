import { useCarrito } from './CarritoProvider'
import { Contador } from './Contador'

export function Carrito() {
  const { items, eliminarProducto, totalItems, totalPrecio } = useCarrito()

  if (items.length === 0) {
    return (
      <div className="carrito vacio">
        <p>El carrito está vacío</p>
      </div>
    )
  }

  return (
    <div className="carrito">
      <h2>Carrito de Compras</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.nombre}</span>
            <span>${(item.precio * item.cantidad).toFixed(2)}</span>
            <span>Cantidad: {item.cantidad}</span>
            <button onClick={() => eliminarProducto(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="totales">
        <p>Total items: {totalItems}</p>
        <p>Total precio: ${totalPrecio.toFixed(2)}</p>
      </div>
    </div>
  )
}
