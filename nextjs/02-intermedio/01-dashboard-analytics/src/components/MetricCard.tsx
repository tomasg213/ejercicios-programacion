'use client'

import { Metric } from '@/lib/analytics'

interface MetricCardProps {
  metric: Metric
}

export function MetricCard({ metric }: MetricCardProps) {
  const trendIcon = metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'
  const trendClass = metric.trend === 'up' ? 'positive' : metric.trend === 'down' ? 'negative' : 'neutral'
  const isBounce = metric.label === 'Bounce Rate'
  
  const formatValue = (value: number, label: string) => {
    if (label === 'Tiempo Promedio') {
      const minutes = Math.floor(value / 60)
      const seconds = value % 60
      return `${minutes}m ${seconds}s`
    }
    if (label === 'Bounce Rate') {
      return `${value}%`
    }
    return value.toLocaleString()
  }

  return (
    <div className="metric-card">
      <span className="metric-label">{metric.label}</span>
      <span className="metric-value">{formatValue(metric.value, metric.label)}</span>
      <span className={`metric-change ${trendClass} ${isBounce && metric.trend === 'up' ? 'negative' : ''}`}>
        {trendIcon} {Math.abs(metric.change)}%
      </span>
    </div>
  )
}
