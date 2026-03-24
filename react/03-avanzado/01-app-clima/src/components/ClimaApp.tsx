import { useState, useEffect } from 'react'
import { useClima } from '../hooks/useClima'
import { Ciudad } from '../types'

function Buscador() {
  const { busqueda, resultadosBusqueda, buscar, seleccionarCiudad } = useClima()
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    setShowResults(resultadosBusqueda.length > 0)
  }, [resultadosBusqueda])

  return (
    <div className="buscador">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={busqueda}
          onChange={(e) => buscar(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        <span className="icono">🔍</span>
      </div>
      
      {showResults && resultadosBusqueda.length > 0 && (
        <div className="resultados">
          {resultadosBusqueda.map(ciudad => (
            <button
              key={ciudad.id}
              className="resultado-item"
              onClick={() => {
                seleccionarCiudad(ciudad)
                setShowResults(false)
              }}
            >
              {ciudad.nombre}, {ciudad.pais}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SelectorUnidades() {
  const { unidad, setUnidad } = useClima()
  
  return (
    <div className="selector-unidades">
      <button
        className={unidad === 'celsius' ? 'active' : ''}
        onClick={() => setUnidad('celsius')}
      >
        °C
      </button>
      <button
        className={unidad === 'fahrenheit' ? 'active' : ''}
        onClick={() => setUnidad('fahrenheit')}
      >
        °F
      </button>
    </div>
  )
}

function ClimaActual() {
  const { datosClima, convertirTemperatura, unidad, toggleFavorita, esFavorita } = useClima()
  
  if (!datosClima) return null
  
  const { actual, ciudad } = datosClima
  
  return (
    <div className="clima-actual">
      <div className="ciudad-header">
        <h2>{ciudad.nombre}, {ciudad.pais}</h2>
        <button 
          className={`fav-btn ${esFavorita(ciudad.id) ? 'active' : ''}`}
          onClick={() => toggleFavorita(ciudad)}
        >
          {esFavorita(ciudad.id) ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="temp-principal">
        <span className="icono-grande">{actual.icono}</span>
        <span className="temp">{convertirTemperatura(actual.temperatura)}°{unidad === 'celsius' ? 'C' : 'F'}</span>
      </div>
      
      <p className="descripcion">{actual.descripcion}</p>
      
      <div className="detalles">
        <div className="detalle">
          <span>Sensación</span>
          <span>{convertirTemperatura(actual.sensacionTermica)}°</span>
        </div>
        <div className="detalle">
          <span>Humedad</span>
          <span>{actual.humedad}%</span>
        </div>
        <div className="detalle">
          <span>Viento</span>
          <span>{actual.velocidadViento} km/h</span>
        </div>
      </div>
    </div>
  )
}

function Pronostico() {
  const { datosClima, convertirTemperatura, unidad } = useClima()
  
  if (!datosClima) return null
  
  return (
    <div className="pronostico">
      <h3>Pronóstico 5 días</h3>
      <div className="dias">
        {datosClima.pronostico.map((dia, i) => (
          <div key={i} className="dia">
            <span className="fecha">{dia.fecha}</span>
            <span className="icono">{dia.icono}</span>
            <span className="temps">
              {convertirTemperatura(dia.temperaturaMax)}° / {convertirTemperatura(dia.temperaturaMin)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CiudadesFavoritas() {
  const { favorites, historial, seleccionarCiudad, esFavorita } = useClima()
  
  const ciudades = favorites.length > 0 ? favorites : historial
  
  if (ciudades.length === 0) return null
  
  return (
    <div className="ciudades-guardadas">
      <h3>{favorites.length > 0 ? 'Favoritas' : 'Recientes'}</h3>
      <div className="chips">
        {ciudades.map(ciudad => (
          <button
            key={ciudad.id}
            className="chip"
            onClick={() => seleccionarCiudad(ciudad)}
          >
            {ciudad.nombre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AppClima() {
  const { ciudadActual, cargando, error } = useClima()
  
  return (
    <div className="app-clima">
      <h1>🌤️ Weather App</h1>
      
      <Buscador />
      <SelectorUnidades />
      
      {cargando && <div className="loading">Cargando...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {ciudadActual && !cargando && (
        <>
          <ClimaActual />
          <Pronostico />
        </>
      )}
      
      <CiudadesFavoritas />
    </div>
  )
}
