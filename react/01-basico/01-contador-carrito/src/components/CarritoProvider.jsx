import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([])

  const agregarProducto = (producto) => {
    setItems((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        )
      }
      return [...prev, producto]
    })
  }

  const eliminarProducto = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0)
  const totalPrecio = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  return (
    <CarritoContext.Provider
      value={{ items, agregarProducto, eliminarProducto, totalItems, totalPrecio }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  }
  return context
}
