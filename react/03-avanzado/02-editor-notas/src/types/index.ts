export interface Nota {
  id: string
  titulo: string
  contenido: string
  creado: Date
  modificado: Date
  color: string
  archivada: boolean
  compartida: boolean
}

export type Vista = 'editar' | 'preview'
