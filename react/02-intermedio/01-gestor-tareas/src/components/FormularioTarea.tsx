import { useState } from 'react'
import { useTareas } from '../context/TareasContext'
import { Tarea } from '../types'

interface Props {
  tareaEditando?: Tarea | null
  onCerrar: () => void
}

export function FormularioTarea({ tareaEditando, onCerrar }: Props) {
  const { agregarTarea, editarTarea } = useTareas()
  
  const [formData, setFormData] = useState({
    titulo: tareaEditando?.titulo || '',
    descripcion: tareaEditando?.descripcion || '',
    prioridad: tareaEditando?.prioridad || 'media' as const,
    fechaVencimiento: tareaEditando?.fechaVencimiento 
      ? new Date(tareaEditando.fechaVencimiento).toISOString().split('T')[0]
      : ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (tareaEditando) {
      editarTarea({
        ...tareaEditando,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        prioridad: formData.prioridad,
        fechaVencimiento: formData.fechaVencimiento ? new Date(formData.fechaVencimiento) : undefined
      })
    } else {
      agregarTarea({
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        prioridad: formData.prioridad,
        completada: false,
        fechaVencimiento: formData.fechaVencimiento ? new Date(formData.fechaVencimiento) : undefined
      })
    }
    
    onCerrar()
  }

  return (
    <div className="modal">
      <div className="modal-contenido">
        <h2>{tareaEditando ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={formData.titulo}
            onChange={e => setFormData({ ...formData, titulo: e.target.value })}
            required
          />
          
          <textarea
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
          />
          
          <select
            value={formData.prioridad}
            onChange={e => setFormData({ ...formData, prioridad: e.target.value as any })}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
          
          <input
            type="date"
            value={formData.fechaVencimiento}
            onChange={e => setFormData({ ...formData, fechaVencimiento: e.target.value })}
          />
          
          <div className="botones">
            <button type="submit">{tareaEditando ? 'Guardar' : 'Crear'}</button>
            <button type="button" onClick={onCerrar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
