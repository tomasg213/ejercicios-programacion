import { Nota } from '../types'
import { obtenerTiempoRelativo } from '../utils/markdown'

interface Props {
  notas: Nota[]
  notaActual: Nota | null
  onSeleccionar: (nota: Nota) => void
  onEliminar: (id: string) => void
  onArchivar: (id: string) => void
  onCompartir: (id: string) => void
}

export function ListaNotas({ 
  notas, 
  notaActual, 
  onSeleccionar, 
  onEliminar, 
  onArchivar,
  onCompartir 
}: Props) {
  if (notas.length === 0) {
    return (
      <div className="lista-vacia">
        <p>No hay notas</p>
        <p>Crea una nueva nota para comenzar</p>
      </div>
    )
  }

  return (
    <div className="lista-notas">
      {notas.map(nota => (
        <div 
          key={nota.id}
          className={`nota-item ${notaActual?.id === nota.id ? 'activa' : ''}`}
          onClick={() => onSeleccionar(nota)}
          style={{ borderLeftColor: nota.color }}
        >
          <h4>{nota.titulo || 'Sin título'}</h4>
          <p className="preview">{nota.contenido.substring(0, 60)}...</p>
          <span className="tiempo">{obtenerTiempoRelativo(nota.modificado)}</span>
          
          <div className="acciones" onClick={e => e.stopPropagation()}>
            <button 
              title={nota.archivada ? 'Desarchivar' : 'Archivar'}
              onClick={() => onArchivar(nota.id)}
            >
              {nota.archivada ? '📤' : '📥'}
            </button>
            <button 
              title={nota.compartida ? 'Dejar de compartir' : 'Compartir'}
              onClick={() => onCompartir(nota.id)}
            >
              {nota.compartida ? '🔗' : '📤'}
            </button>
            <button 
              title="Eliminar"
              onClick={() => onEliminar(nota.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
