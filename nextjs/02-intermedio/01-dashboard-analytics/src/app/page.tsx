import { Suspense } from 'react'
import { getAnalyticsData } from '@/lib/analytics'
import { MetricCard } from '@/components/MetricCard'
import { Chart } from '@/components/Chart'
import { DateFilter } from '@/components/DateFilter'
import './globals.css'

export default async function DashboardPage({
  searchParams
}: {
  searchParams: { range?: string }
}) {
  const range = searchParams.range ? parseInt(searchParams.range) : 30
  const data = await getAnalyticsData(range)

  return (
    <html lang="es">
      <body>
        <div className="dashboard">
          <header className="dashboard-header">
            <h1>📊 Dashboard Analytics</h1>
            <Suspense fallback={<div>Cargando filtros...</div>}>
              <DateFilter currentRange={String(range)} />
            </Suspense>
          </header>

          <section className="metrics-grid">
            <MetricCard metric={data.usuarios} />
            <MetricCard metric={data.sesiones} />
            <MetricCard metric={data.conversiones} />
            <MetricCard metric={data.tiempoPromedio} />
            <MetricCard metric={data.bounceRate} />
          </section>

          <section className="charts-grid">
            <Chart data={data.graficoDiario} metric="usuarios" />
            <Chart data={data.graficoDiario} metric="sesiones" />
            <Chart data={data.graficoDiario} metric="conversiones" />
          </section>
        </div>
      </body>
    </html>
  )
}
