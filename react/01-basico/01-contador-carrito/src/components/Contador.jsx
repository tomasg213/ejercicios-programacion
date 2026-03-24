import { useState } from 'react'

export function Contador({ valorInicial = 0, onCambio }) {
  const [cantidad, setCantidad] = useState(valorInicial)

  const incrementar = () => {
    const nuevaCantidad = cantidad + 1
    setCantidad(nuevaCantidad)
    onCambio?.(nuevaCantidad)
  }

  const decrementar = () => {
    if (cantidad > 0) {
      const nuevaCantidad = cantidad - 1
      setCantidad(nuevaCantidad)
      onCambio?.(nuevaCantidad)
    }
  }

  return (
    <div className="contador">
      <button onClick={decrementar}>-</button>
      <span>{cantidad}</span>
      <button onClick={incrementar}>+</button>
    </div>
  )
}
