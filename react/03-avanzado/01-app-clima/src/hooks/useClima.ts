import { useState, useEffect, useCallback } from 'react'
import { Ciudad, DatosClima } from '../types'
import { buscarCiudad, obtenerClima } from '../services/api'

export function useClima() {
  const [ciudadActual, setCiudadActual] = useState<Ciudad | null>(null)
  const [datosClima, setDatosClima] = useState<DatosClima | null>(null)
  const [favoritas, setFavoritas] = useState<Ciudad[]>([])
  const [historial, setHistorial] = useState<Ciudad[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [resultadosBusqueda, setResultadosBusqueda] = useState<Ciudad[]>([])
  const [unidad, setUnidad] = useState<'celsius' | 'fahrenheit'>('celsius')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('favoritas')
    if (stored) setFavoritas(JSON.parse(stored))
    
    const storedHistorial = localStorage.getItem('historial')
    if (storedHistorial) setHistorial(JSON.parse(storedHistorial))
  }, [])

  useEffect(() => {
    localStorage.setItem('favoritas', JSON.stringify(favoritas))
  }, [favoritas])

  useEffect(() => {
    localStorage.setItem('historial', JSON.stringify(historial))
  }, [historial])

  const buscar = useCallback(async (query: string) => {
    setBusqueda(query)
    if (query.length < 2) {
      setResultadosBusqueda([])
      return
    }
    
    try {
      const resultados = await buscarCiudad(query)
      setResultadosBusqueda(resultados)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const seleccionarCiudad = useCallback(async (ciudad: Ciudad) => {
    setCargando(true)
    setError(null)
    setCiudadActual(ciudad)
    setResultadosBusqueda([])
    setBusqueda('')
    
    try {
      const datos = await obtenerClima(ciudad.latitud, ciudad.longitud)
      setDatosClima({ ...datos, ciudad })
      
      setHistorial(prev => {
        const filtered = prev.filter(c => c.id !== ciudad.id)
        return [ciudad, ...filtered].slice(0, 5)
      })
    } catch (e) {
      setError('Error al cargar el clima')
    } finally {
      setCargando(false)
    }
  }, [])

  const toggleFavorita = useCallback((ciudad: Ciudad) => {
    setFavoritas(prev => {
      const exists = prev.some(c => c.id === ciudad.id)
      if (exists) {
        return prev.filter(c => c.id !== ciudad.id)
      }
      return [...prev, ciudad]
    })
  }, [])

  const esFavorita = useCallback((ciudadId: number) => {
    return favoritas.some(c => c.id === ciudadId)
  }, [favoritas])

  const convertirTemperatura = useCallback((temp: number) => {
    if (unidad === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32)
    }
    return temp
  }, [unidad])

  return {
    ciudadActual,
    datosClima,
    busqueda,
    resultadosBusqueda,
    buscar: buscar,
    seleccionarCiudad,
    favorites: favorites,
    historial,
    toggleFavorita,
    esFavorita,
    unidad,
    setUnidad,
    convertirTemperatura,
    cargando,
    error
  }
}
