'use client'

import { DailyData } from '@/lib/analytics'

interface ChartProps {
  data: DailyData[]
  metric: 'usuarios' | 'sesiones' | 'conversiones'
}

export function Chart({ data, metric }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d[metric]))
  
  return (
    <div className="chart">
      <h3>{metric.charAt(0).toUpperCase() + metric.slice(1)}</h3>
      <div className="chart-container">
        <div className="chart-bars">
          {data.map((item, index) => (
            <div key={index} className="bar-wrapper">
              <div 
                className={`bar ${metric}`}
                style={{ height: `${(item[metric] / maxValue) * 100}%` }}
                title={`${item.date}: ${item[metric]}`}
              />
            </div>
          ))}
        </div>
        <div className="chart-labels">
          <span>{data[0]?.date}</span>
          <span>{data[data.length - 1]?.date}</span>
        </div>
      </div>
    </div>
  )
}
