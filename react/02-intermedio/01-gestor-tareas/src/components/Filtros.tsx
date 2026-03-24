import { useTareas } from '../context/TareasContext'
import { Filtro, Orden } from '../types'

export function Filtros() {
  const { state, dispatch } = useTareas()

  return (
    <div className="filtros">
      <input
        type="text"
        placeholder="Buscar..."
        value={state.busqueda}
        onChange={e => dispatch({ type: 'SET_BUSQUEDA', payload: e.target.value })}
      />
      
      <select
        value={state.filtro}
        onChange={e => dispatch({ type: 'SET_FILTRO', payload: e.target.value as Filtro })}
      >
        <option value="todas">Todas</option>
        <option value="pendientes">Pendientes</option>
        <option value="completadas">Completadas</option>
      </select>
      
      <select
        value={state.orden}
        onChange={e => dispatch({ type: 'SET_ORDEN', payload: e.target.value as Orden })}
      >
        <option value="fecha">Fecha</option>
        <option value="prioridad">Prioridad</option>
        <option value="alfabetico">Alfabético</option>
      </select>
    </div>
  )
}
