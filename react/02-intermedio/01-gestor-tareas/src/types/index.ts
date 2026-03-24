export interface Tarea {
  id: string
  titulo: string
  descripcion: string
  prioridad: 'baja' | 'media' | 'alta'
  completada: boolean
  fechaCreacion: Date
  fechaVencimiento?: Date
  categoria?: string
}

export type Filtro = 'todas' | 'pendientes' | 'completadas'
export type Orden = 'fecha' | 'prioridad' | 'alfabetico'

export interface EstadoTareas {
  tareas: Tarea[]
  filtro: Filtro
  orden: Orden
  busqueda: string
}

export type AccionTareas =
  | { type: 'AGREGAR_TAREA'; payload: Tarea }
  | { type: 'EDITAR_TAREA'; payload: Tarea }
  | { type: 'ELIMINAR_TAREA'; payload: string }
  | { type: 'TOGGLE_TAREA'; payload: string }
  | { type: 'SET_FILTRO'; payload: Filtro }
  | { type: 'SET_ORDEN'; payload: Orden }
  | { type: 'SET_BUSQUEDA'; payload: string }
  | { type: 'CARGAR_TAREAS'; payload: Tarea[] }
