import { useState, useEffect, useCallback } from 'react'
import { Nota, Vista } from '../types'

const COLORES = ['#ffffff', '#fff3cd', '#d1ecf1', '#d4edda', '#f8d7da', '#e2e3e5']

export function useNotas() {
  const [notas, setNotas] = useState<Nota[]>([])
  const [notaActual, setNotaActual] = useState<Nota | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<'todas' | 'archivadas' | 'compartidas'>('todas')
  const [vista, setVista] = useState<Vista>('editar')
  const [editando, setEditando] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('notas')
    if (stored) {
      const parsed = JSON.parse(stored).map((n: Nota) => ({
        ...n,
        creado: new Date(n.creado),
        modificado: new Date(n.modificado)
      }))
      setNotas(parsed)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notas', JSON.stringify(notas))
  }, [notas])

  const crearNota = useCallback(() => {
    const nueva: Nota = {
      id: crypto.randomUUID(),
      titulo: 'Nueva nota',
      contenido: '',
      creado: new Date(),
      modificado: new Date(),
      color: COLORES[0],
      archivada: false,
      compartida: false
    }
    setNotas(prev => [nueva, ...prev])
    setNotaActual(nueva)
    setEditando(true)
  }, [])

  const guardarNota = useCallback((nota: Nota) => {
    setNotas(prev => prev.map(n => 
      n.id === nota.id 
        ? { ...nota, modificado: new Date() }
        : n
    ))
    setNotaActual({ ...nota, modificado: new Date() })
    setEditando(false)
  }, [])

  const eliminarNota = useCallback((id: string) => {
    setNotas(prev => prev.filter(n => n.id !== id))
    if (notaActual?.id === id) {
      setNotaActual(null)
    }
  }, [notaActual])

  const archivarNota = useCallback((id: string) => {
    setNotas(prev => prev.map(n => 
      n.id === id ? { ...n, archivada: !n.archivada } : n
    ))
  }, [])

  const compartirNota = useCallback((id: string) => {
    setNotas(prev => prev.map(n => 
      n.id === id ? { ...n, compartida: !n.compartida } : n
    ))
  }, [])

  const notasFiltradas = notas
    .filter(nota => {
      if (filtro === 'archivadas') return nota.archivada
      if (filtro === 'compartidas') return nota.compartida
      return !nota.archivada
    })
    .filter(nota => 
      busqueda === '' ||
      nota.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      nota.contenido.toLowerCase().includes(busqueda.toLowerCase())
    )

  const seleccionarNota = useCallback((nota: Nota) => {
    setNotaActual(nota)
    setEditando(false)
    setVista('editar')
  }, [])

  return {
    notas,
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
  }
}
