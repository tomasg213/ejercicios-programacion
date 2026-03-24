export interface Pregunta {
  id: number
  categoria: 'ciencia' | 'historia' | 'tecnologia' | 'cultura'
  pregunta: string
  opciones: string[]
  respuestaCorrecta: number
  explicacion: string
}

export type EstadoQuiz = 'inicio' | 'jugando' | 'resultados'

export interface Resultado {
  preguntaId: number
  respuestaUsuario: number
  correcta: boolean
  tiempo: number
}
