import { Ciudad, DatosClima } from '../types'

const BASE_URL_CLIMA = 'https://api.open-meteo.com/v1/forecast'
const BASE_URL_GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search'

export async function buscarCiudad(query: string): Promise<Ciudad[]> {
  if (!query || query.length < 2) return []
  
  const response = await fetch(
    `${BASE_URL_GEOCODING}?name=${encodeURIComponent(query)}&count=5&language=es&format=json`
  )
  
  if (!response.ok) throw new Error('Error al buscar ciudad')
  
  const data = await response.json()
  
  if (!data.results) return []
  
  return data.results.map((c: any) => ({
    id: c.id,
    nombre: c.name,
    pais: c.country_code,
    latitud: c.latitude,
    longitud: c.longitude
  }))
}

export async function obtenerClima(lat: number, lon: number): Promise<DatosClima> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,weather_code,uv_index,visibility,surface_pressure',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '5'
  })
  
  const response = await fetch(`${BASE_URL_CLIMA}?${params}`)
  
  if (!response.ok) throw new Error('Error al obtener clima')
  
  const data = await response.json()
  
  const icono = obtenerIcono(data.current.weather_code)
  const descripcion = obtenerDescripcion(data.current.weather_code)
  
  const pronostico = data.daily.time.map((fecha: string, i: number) => ({
    fecha: new Date(fecha).toLocaleDateString('es-ES', { weekday: 'short' }),
    temperaturaMax: Math.round(data.daily.temperature_2m_max[i]),
    temperaturaMin: Math.round(data.daily.temperature_2m_min[i]),
    icono: obtenerIcono(data.daily.weather_code[i]),
    precipitacion: data.daily.precipitation_probability_max[i],
    probabilidadLluvia: data.daily.precipitation_probability_max[i]
  }))
  
  return {
    actual: {
      temperatura: Math.round(data.current.temperature_2m),
      sensacionTermica: Math.round(data.current.apparent_temperature),
      humedad: data.current.relative_humidity_2m,
      velocidadViento: Math.round(data.current.wind_speed_10m),
      direccionViento: data.current.wind_direction_10m,
      descripcion,
      icono,
      indiceUV: data.current.uv_index ?? 0,
      visibilidad: data.current.visibility ?? 10000,
      presion: data.current.surface_pressure ?? 1013
    },
    pronostico,
    ciudad: { id: 0, nombre: '', pais: '', latitud: lat, longitud: lon }
  }
}

function obtenerIcono(codigo: number): string {
  const iconos: Record<number, string> = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️',
    51: '🌧️', 53: '🌧️', 55: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '🌧️',
    71: '🌨️', 73: '🌨️', 75: '🌨️',
    77: '🌨️', 80: '🌦️', 81: '🌦️', 82: '🌦️',
    85: '🌨️', 86: '🌨️',
    95: '⛈️', 96: '⛈️', 99: '⛈️'
  }
  return iconos[codigo] || '❓'
}

function obtenerDescripcion(codigo: number): string {
  const descripciones: Record<number, string> = {
    0: 'Cielo despejado', 1: 'Mayormente despejado', 2: 'Parcialmente nublado', 3: 'Nublado',
    45: 'Niebla', 48: 'Niebla',
    51: 'Llovizna ligera', 53: 'Llovizna moderada', 55: 'Llovizna intensa',
    61: 'Lluvia ligera', 63: 'Lluvia moderada', 65: 'Lluvia intensa',
    71: 'Nieve ligera', 73: 'Nieve moderada', 75: 'Nieve intensa',
    77: 'Granizo', 80: 'Lluvia ligera', 81: 'Lluvia moderada', 82: 'Lluvia intensa',
    85: 'Nieve ligera', 86: 'Nieve intensa',
    95: 'Tormenta eléctrica', 96: 'Tormenta con granizo', 99: 'Tormenta severa'
  }
  return descripciones[codigo] || 'Desconocido'
}
