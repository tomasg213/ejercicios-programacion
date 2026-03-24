import { useState, useEffect, useCallback } from 'react'
import { Pregunta, Resultado, EstadoQuiz } from '../types'

interface UseQuizProps {
  preguntas: Pregunta[]
  tiempoPorPregunta?: number
}

export function useQuiz({ preguntas, tiempoPorPregunta = 30 }: UseQuizProps) {
  const [indiceActual, setIndiceActual] = useState(0)
  const [tiempoRestante, setTiempoRestante] = useState(tiempoPorPregunta)
  const [resultados, setResultados] = useState<Resultado[]>([])
  const [estado, setEstado] = useState<EstadoQuiz>('inicio')
  const [categoria, setCategoria] = useState<string>('todas')

  const preguntaActual = preguntas[indiceActual]
  
  const iniciarQuiz = useCallback((cat?: string) => {
    setCategoria(cat || 'todas')
    setIndiceActual(0)
    setTiempoRestante(tiempoPorPregunta)
    setResultados([])
    setEstado('jugando')
  }, [tiempoPorPregunta])

  const responder = useCallback((respuesta: number) => {
    if (!preguntaActual) return

    const resultado: Resultado = {
      preguntaId: preguntaActual.id,
      respuestaUsuario: respuesta,
      correcta: respuesta === preguntaActual.respuestaCorrecta,
      tiempo: tiempoPorPregunta - tiempoRestante
    }

    setResultados(prev => [...prev, resultado])

    if (indiceActual < preguntas.length - 1) {
      setIndiceActual(prev => prev + 1)
      setTiempoRestante(tiempoPorPregunta)
    } else {
      setEstado('resultados')
    }
  }, [preguntaActual, indiceActual, preguntas.length, tiempoRestante, tiempoPorPregunta])

  const reiniciar = useCallback(() => {
    setEstado('inicio')
    setResultados([])
    setIndiceActual(0)
    setTiempoRestante(tiempoPorPregunta)
  }, [tiempoPorPregunta])

  useEffect(() => {
    if (estado !== 'jugando') return

    const timer = setInterval(() => {
      setTiempoRestante(prev => {
        if (prev <= 1) {
          responder(-1)
          return tiempoPorPregunta
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [estado, responder, tiempoPorPregunta])

  const preguntasFiltradas = categoria === 'todas' 
    ? preguntas 
    : preguntas.filter(p => p.categoria === categoria)

  const puntuacion = resultados.filter(r => r.correcta).length
  const total = preguntasFiltradas.length
  const porcentaje = Math.round((puntuacion / total) * 100)

  return {
    preguntaActual: preguntasFiltradas[indiceActual],
    indiceActual,
    tiempoRestante,
    resultados,
    estado,
    puntuacion,
    total,
    porcentaje,
    preguntasFiltradas,
    iniciarQuiz,
    responder,
    reiniciar,
    categoria
  }
}
