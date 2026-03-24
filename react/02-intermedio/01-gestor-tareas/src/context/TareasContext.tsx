import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Tarea, EstadoTareas, AccionTareas, Filtro, Orden } from '../types'

const initialState: EstadoTareas = {
  tareas: [],
  filtro: 'todas',
  orden: 'fecha',
  busqueda: ''
}

function reducer(state: EstadoTareas, action: AccionTareas): EstadoTareas {
  switch (action.type) {
    case 'AGREGAR_TAREA':
      return { ...state, tareas: [...state.tareas, action.payload] }
    
    case 'EDITAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.map(t =>
          t.id === action.payload.id ? action.payload : t
        )
      }
    
    case 'ELIMINAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.filter(t => t.id !== action.payload)
      }
    
    case 'TOGGLE_TAREA':
      return {
        ...state,
        tareas: state.tareas.map(t =>
          t.id === action.payload ? { ...t, completada: !t.completada } : t
        )
      }
    
    case 'SET_FILTRO':
      return { ...state, filtro: action.payload }
    
    case 'SET_ORDEN':
      return { ...state, orden: action.payload }
    
    case 'SET_BUSQUEDA':
      return { ...state, busqueda: action.payload }
    
    case 'CARGAR_TAREAS':
      return { ...state, tareas: action.payload }
    
    default:
      return state
  }
}

interface TareasContextType {
  state: EstadoTareas
  dispatch: React.Dispatch<AccionTareas>
  agregarTarea: (tarea: Omit<Tarea, 'id' | 'fechaCreacion'>) => void
  editarTarea: (tarea: Tarea) => void
  eliminarTarea: (id: string) => void
  toggleTarea: (id: string) => void
  tareasFiltradas: Tarea[]
  estadisticas: { total: number; completadas: number; porcentaje: number }
}

const TareasContext = createContext<TareasContextType | null>(null)

export function TareasProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const stored = localStorage.getItem('tareas')
    if (stored) {
      const tareas = JSON.parse(stored).map((t: Tarea) => ({
        ...t,
        fechaCreacion: new Date(t.fechaCreacion),
        fechaVencimiento: t.fechaVencimiento ? new Date(t.fechaVencimiento) : undefined
      }))
      dispatch({ type: 'CARGAR_TAREAS', payload: tareas })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(state.tareas))
  }, [state.tareas])

  const agregarTarea = (tarea: Omit<Tarea, 'id' | 'fechaCreacion'>) => {
    const nuevaTarea: Tarea = {
      ...tarea,
      id: crypto.randomUUID(),
      fechaCreacion: new Date()
    }
    dispatch({ type: 'AGREGAR_TAREA', payload: nuevaTarea })
  }

  const editarTarea = (tarea: Tarea) => {
    dispatch({ type: 'EDITAR_TAREA', payload: tarea })
  }

  const eliminarTarea = (id: string) => {
    dispatch({ type: 'ELIMINAR_TAREA', payload: id })
  }

  const toggleTarea = (id: string) => {
    dispatch({ type: 'TOGGLE_TAREA', payload: id })
  }

  const tareasFiltradas = state.tareas
    .filter(tarea => {
      if (state.filtro === 'pendientes') return !tarea.completada
      if (state.filtro === 'completadas') return tarea.completada
      return true
    })
    .filter(tarea =>
      state.busqueda === '' ||
      tarea.titulo.toLowerCase().includes(state.busqueda.toLowerCase()) ||
      tarea.descripcion.toLowerCase().includes(state.busqueda.toLowerCase())
    )
    .sort((a, b) => {
      if (state.orden === 'fecha') {
        return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
      }
      if (state.orden === 'prioridad') {
        const prioridadOrden = { alta: 3, media: 2, baja: 1 }
        return prioridadOrden[b.prioridad] - prioridadOrden[a.prioridad]
      }
      return a.titulo.localeCompare(b.titulo)
    })

  const estadisticas = {
    total: state.tareas.length,
    completadas: state.tareas.filter(t => t.completada).length,
    porcentaje: state.tareas.length > 0
      ? Math.round((state.tareas.filter(t => t.completada).length / state.tareas.length) * 100)
      : 0
  }

  return (
    <TareasContext.Provider
      value={{
        state,
        dispatch,
        agregarTarea,
        editarTarea,
        eliminarTarea,
        toggleTarea,
        tareasFiltradas,
        estadisticas
      }}
    >
      {children}
    </TareasContext.Provider>
  )
}

export function useTareas() {
  const context = useContext(TareasContext)
  if (!context) {
    throw new Error('useTareas debe usarse dentro de TareasProvider')
  }
  return context
}
