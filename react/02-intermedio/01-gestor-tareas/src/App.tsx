import { useState } from 'react'
import { TareasProvider } from './context/TareasContext'
import { ListaTareas } from './components/ListaTareas'
import { Filtros } from './components/Filtros'
import { FormularioTarea } from './components/FormularioTarea'
import { Estadisticas } from './components/Estadisticas'
import { Tarea } from './types'
import './App.css'

function GestorTareas() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null)

  const handleEditar = (tarea: Tarea) => {
    setTareaEditando(tarea)
    setMostrarFormulario(true)
  }

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false)
    setTareaEditando(null)
  }

  return (
    <div className="app">
      <h1>Gestor de Tareas</h1>
      
      <Filtros />
      
      <ListaTareas onEditar={handleEditar} />
      
      <button 
        className="btn-nueva"
        onClick={() => setMostrarFormulario(true)}
      >
        + Nueva Tarea
      </button>
      
      <Estadisticas />
      
      {mostrarFormulario && (
        <FormularioTarea
          tareaEditando={tareaEditando}
          onCerrar={handleCerrarFormulario}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <TareasProvider>
      <GestorTareas />
    </TareasProvider>
  )
}
