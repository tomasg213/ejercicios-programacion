import { CarritoProvider } from './components/CarritoProvider'
import { Producto } from './components/Producto'
import { Carrito } from './components/Carrito'

const productos = [
  { id: 1, nombre: 'Camisa', precio: 29.99 },
  { id: 2, nombre: 'Pantalón', precio: 49.99 },
  { id: 3, nombre: 'Zapatos', precio: 79.99 },
  { id: 4, nombre: 'Gorras', precio: 15.99 },
]

export default function App() {
  return (
    <CarritoProvider>
      <div className="app">
        <h1>Tienda Online</h1>
        <div className="productos">
          {productos.map((producto) => (
            <Producto key={producto.id} {...producto} />
          ))}
        </div>
        <Carrito />
      </div>
    </CarritoProvider>
  )
}
