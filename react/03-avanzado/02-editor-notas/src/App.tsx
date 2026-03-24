import { useNotas } from '../hooks/useNotas'
import { ListaNotas } from '../components/ListaNotas'
import { EditorNota } from '../components/EditorNota'

export default function App() {
  const {
    notasFiltradas,
    notaActual,
    busqueda,
    setBusqueda,
    filtro,
    setFiltro,
    vista,
    setVista,
    editando,
    setEditando,
    crearNota,
    guardarNota,
    eliminarNota,
    archivarNota,
    compartirNota,
    seleccionarNota
  } = useNotas()

  return (
    <div className="app-notas">
      <h1>📝 Editor de Notas</h1>
      
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar notas..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      <div className="tabs-filtro">
        <button 
          className={filtro === 'todas' ? 'active' : ''}
          onClick={() => setFiltro('todas')}
        >
          Mis Notas
        </button>
        <button 
          className={filtro === 'compartidas' ? 'active' : ''}
          onClick={() => setFiltro('compartidas')}
        >
          Compartidas
        </button>
        <button 
          className={filtro === 'archivadas' ? 'active' : ''}
          onClick={() => setFiltro('archivadas')}
        >
          Archivadas
        </button>
      </div>

      <div className="contenido">
        <div className="lista-panel">
          <ListaNotas
            notas={notasFiltradas}
            notaActual={notaActual}
            onSeleccionar={seleccionarNota}
            onEliminar={eliminarNota}
            onArchivar={archivarNota}
            onCompartir={compartirNota}
          />
          
          <button className="btn-nueva" onClick={crearNota}>
            + Nueva Nota
          </button>
        </div>

        <div className="editor-panel">
          {notaActual && (
            editando ? (
              <EditorNota
                nota={notaActual}
                onGuardar={guardarNota}
                onCancelar={() => setEditando(false)}
                vista={vista}
                setVista={setVista}
              />
            ) : (
              <div className="vista-nota" onClick={() => setEditando(true)}>
                <h2>{notaActual.titulo}</h2>
                <div 
                  className="contenido"
                  dangerouslySetInnerHTML={{ 
                    __html: notaActual.contenido 
                      ? parseMarkdown(notaActual.contenido)
                      : '<p className="vacio">Haz clic para editar...</p>'
                  }}
                />
                <p className="tiempo">
                  Última modificación: {new Date(notaActual.modificado).toLocaleString()}
                </p>
              </div>
            )
          )}
          
          {!notaActual && (
            <div className="sin-seleccionar">
              <p>Selecciona una nota o crea una nueva</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function parseMarkdown(contenido: string): string {
  let html = contenido
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/^\* (.+)$/gm, '<li>$1</li>')
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  return html.replace(/\n/g, '<br>')
}
