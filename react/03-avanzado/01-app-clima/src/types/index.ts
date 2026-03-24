export interface ClimaActual {
  temperatura: number
  sensacionTermica: number
  humedad: number
  velocidadViento: number
  direccionViento: number
  descripcion: string
  icono: string
  indiceUV: number
  visibilidad: number
  presion: number
}

export interface DiaPronostico {
  fecha: string
  temperaturaMax: number
  temperaturaMin: number
  icono: string
  precipitacion: number
  probabilidadLluvia: number
}

export interface Ciudad {
  id: number
  nombre: string
  pais: string
  latitud: number
  longitud: number
}

export interface DatosClima {
  actual: ClimaActual
  pronostico: DiaPronostico[]
  ciudad: Ciudad
}
