import { useTareas } from '../context/TareasContext'
import { TareaItem } from './TareaItem'
import { Tarea } from '../types'

export function ListaTareas({ onEditar }: { onEditar: (t: Tarea) => void }) {
  const { tareasFiltradas } = useTareas()

  if (tareasFiltradas.length === 0) {
    return (
      <div className="lista-vacia">
        <p>No hay tareas para mostrar</p>
      </div>
    )
  }

  return (
    <div className="lista-tareas">
      {tareasFiltradas.map(tarea => (
        <TareaItem key={tarea.id} tarea={tarea} onEditar={onEditar} />
      ))}
    </div>
  )
}
