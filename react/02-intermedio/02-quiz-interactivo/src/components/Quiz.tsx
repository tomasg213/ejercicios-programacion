import { useQuiz } from '../hooks/useQuiz'
import { preguntas } from '../data/preguntas'
import { Pregunta, Resultado } from '../types'
import './Quiz.css'

function Temporizador({ tiempo, total }: { tiempo: number; total: number }) {
  const porcentaje = (tiempo / total) * 100
  const color = tiempo <= 10 ? '#e74c3c' : tiempo <= 20 ? '#f39c12' : '#27ae60'

  return (
    <div className="temporizador">
      <div className="tiempo-texto">
        ⏱️ Tiempo: {tiempo}s
      </div>
      <div className="barra-tiempo">
        <div 
          className="progreso-tiempo"
          style={{ width: `${porcentaje}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function PreguntaComponent({ 
  pregunta, 
  onResponder,
  tiempoRestante,
  tiempoTotal
}: { 
  pregunta: Pregunta
  onResponder: (index: number) => void
  tiempoRestante: number
  tiempoTotal: number
}) {
  return (
    <div className="pregunta-container">
      <Temporizador tiempo={tiempoRestante} total={tiempoTotal} />
      
      <div className="pregunta-texto">
        {pregunta.pregunta}
      </div>
      
      <div className="opciones">
        {pregunta.opciones.map((opcion, index) => (
          <button
            key={index}
            className="opcion"
            onClick={() => onResponder(index)}
          >
            <span className="letra">{String.fromCharCode(65 + index)}</span>
            {opcion}
          </button>
        ))}
      </div>
    </div>
  )
}

function PantallaInicio({ onIniciar }: { onIniciar: (cat: string) => void }) {
  const categorias = ['todas', 'ciencia', 'historia', 'tecnologia', 'cultura']
  
  return (
    <div className="pantalla-inicio">
      <h1>Quiz de Conocimientos</h1>
      <p>Demuestra tu conocimiento answering preguntas de diferentes categorías</p>
      
      <div className="categorias">
        <h3>Selecciona una categoría:</h3>
        {categorias.map(cat => (
          <button 
            key={cat} 
            className="btn-categoria"
            onClick={() => onIniciar(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

function Resultados({ 
  puntuacion, 
  total, 
  porcentaje, 
  resultados,
  preguntas,
  onReiniciar 
}: { 
  puntuacion: number
  total: number
  porcentaje: number
  resultados: Resultado[]
  preguntas: Pregunta[]
  onReiniciar: () => void
}) {
  return (
    <div className="resultados">
      <h2>Resultados Finales</h2>
      
      <div className="puntuacion-grande">
        <span className="numero">{puntuacion}</span>
        <span className="divisor">/</span>
        <span className="total">{total}</span>
      </div>
      
      <p className="porcentaje">{porcentaje}%</p>
      
      <div className="mensaje-resultado">
        {porcentaje >= 80 ? '¡Excelente!' :
         porcentaje >= 60 ? '¡Muy bien!' :
         porcentaje >= 40 ? '¡Puedes mejorar!' :
         '¡Sigue practicando!'}
      </div>
      
      <div className="detalle-resultados">
        {resultados.map((r, i) => {
          const pregunta = preguntas.find(p => p.id === r.preguntaId)
          return (
            <div key={i} className={`resultado-item ${r.correcta ? 'correcta' : 'incorrecta'}`}>
              <span>{r.correcta ? '✓' : '✗'}</span>
              <span>{pregunta?.pregunta.substring(0, 50)}...</span>
            </div>
          )
        })}
      </div>
      
      <button className="btn-reiniciar" onClick={onReiniciar}>
        Jugar de nuevo
      </button>
    </div>
  )
}

export default function Quiz() {
  const {
    preguntaActual,
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
    reiniciar
  } = useQuiz({ preguntas, tiempoPorPregunta: 30 })

  if (estado === 'inicio') {
    return (
      <div className="quiz">
        <PantallaInicio onIniciar={iniciarQuiz} />
      </div>
    )
  }

  if (estado === 'resultados') {
    return (
      <div className="quiz">
        <Resultados
          puntuacion={puntuacion}
          total={total}
          porcentaje={porcentaje}
          resultados={resultados}
          preguntas={preguntasFiltradas}
          onReiniciar={reiniciar}
        />
      </div>
    )
  }

  if (!preguntaActual) return null

  return (
    <div className="quiz">
      <div className="header">
        <span>Categoría: {preguntaActual.categoria.toUpperCase()}</span>
        <span>Pregunta {indiceActual + 1}/{total}</span>
      </div>
      
      <PreguntaComponent
        pregunta={preguntaActual}
        onResponder={responder}
        tiempoRestante={tiempoRestante}
        tiempoTotal={30}
      />
    </div>
  )
}
