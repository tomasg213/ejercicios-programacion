export interface Metric {
  label: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
}

export interface DailyData {
  date: string
  usuarios: number
  sesiones: number
  conversiones: number
}

export interface AnalyticsData {
  usuarios: Metric
  sesiones: Metric
  conversiones: Metric
  tiempoPromedio: Metric
  bounceRate: Metric
  graficoDiario: DailyData[]
}

const generateDailyData = (days: number): DailyData[] => {
  const data: DailyData[] = []
  const today = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      usuarios: Math.floor(Math.random() * 500) + 100,
      sesiones: Math.floor(Math.random() * 800) + 200,
      conversiones: Math.floor(Math.random() * 50) + 5
    })
  }
  
  return data
}

export async function getAnalyticsData(days = 30): Promise<AnalyticsData> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const graficoDiario = generateDailyData(days)
  
  const totalUsuarios = graficoDiario.reduce((sum, d) => sum + d.usuarios, 0)
  const totalSesiones = graficoDiario.reduce((sum, d) => sum + d.sesiones, 0)
  const totalConversiones = graficoDiario.reduce((sum, d) => sum + d.conversiones, 0)
  
  return {
    usuarios: {
      label: 'Usuarios',
      value: totalUsuarios,
      change: 12.5,
      trend: 'up'
    },
    sesiones: {
      label: 'Sesiones',
      value: totalSesiones,
      change: 8.3,
      trend: 'up'
    },
    conversiones: {
      label: 'Conversiones',
      value: totalConversiones,
      change: -2.1,
      trend: 'down'
    },
    tiempoPromedio: {
      label: 'Tiempo Promedio',
      value: 245, // segundos
      change: 5.2,
      trend: 'up'
    },
    bounceRate: {
      label: 'Bounce Rate',
      value: 42,
      change: -3.4,
      trend: 'up' // down is good for bounce rate
    },
    graficoDiario
  }
}
