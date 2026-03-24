import { useState } from 'react'
import { Nota, Vista } from '../types'
import { parseMarkdown } from '../utils/markdown'

const COLORES = ['#ffffff', '#fff3cd', '#d1ecf1', '#d4edda', '#f8d7da', '#e2e3e5']

interface Props {
  nota: Nota
  onGuardar: (nota: Nota) => void
  onCancelar: () => void
  vista: Vista
  setVista: (vista: Vista) => void
}

export function EditorNota({ nota, onGuardar, onCancelar, vista, setVista }: Props) {
  const [titulo, setTitulo] = useState(nota.titulo)
  const [contenido, setContenido] = useState(nota.contenido)
  const [color, setColor] = useState(nota.color)

  const handleGuardar = () => {
    onGuardar({
      ...nota,
      titulo,
      contenido,
      color,
      modificado: new Date()
    })
  }

  return (
    <div className="editor-nota">
      <div className="editor-header">
        <input
          type="text"
          className="editor-titulo"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Título de la nota"
        />
        
        <div className="color-picker">
          {COLORES.map(c => (
            <button
              key={c}
              className={`color-btn ${color === c ? 'active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      <div className="editor-tabs">
        <button 
          className={vista === 'editar' ? 'active' : ''}
          onClick={() => setVista('editar')}
        >
          ✏️ Editar
        </button>
        <button 
          className={vista === 'preview' ? 'active' : ''}
          onClick={() => setVista('preview')}
        >
          👁️ Vista previa
        </button>
      </div>

      <div className="editor-contenido">
        {vista === 'editar' ? (
          <textarea
            value={contenido}
            onChange={e => setContenido(e.target.value)}
            placeholder="Escribe tu nota... (soporta Markdown)"
          />
        ) : (
          <div 
            className="preview-markdown"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(contenido) }}
          />
        )}
      </div>

      <div className="editor-footer">
        <button className="btn-guardar" onClick={handleGuardar}>
          💾 Guardar
        </button>
        <button className="btn-cancelar" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  )
}
