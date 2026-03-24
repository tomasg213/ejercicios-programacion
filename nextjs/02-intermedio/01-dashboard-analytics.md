# Ejercicio 1: Dashboard de Analytics

## Caso Real
Trabajas en una startup de analytics. Necesitas crear un dashboard que muestre métricas de usuarios, sesiones y conversiones con gráficos y datos actualizados.

## Requisitos
1. Métricas principales (usuarios, sesiones, conversiones)
2. Gráficos de línea/barras
3. Filtros por fecha
4. Datos desde API simulada
5. Estados de carga

## Métricas
```typescript
interface Metric {
  label: string
  value: number
  change: number // porcentaje de cambio
  trend: 'up' | 'down' | 'neutral'
}

interface AnalyticsData {
  usuarios: Metric
  sesiones: Metric
  conversiones: Metric
  tiempoPromedio: Metric
  graficoDiario: { fecha: string; valor: number }[]
}
```

## Estructura de Archivos
```
01-dashboard-analytics/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── MetricCard.tsx
│   │   ├── Chart.tsx
│   │   └── DateFilter.tsx
│   └── lib/
│       └── analytics.ts
├── package.json
└── next.config.js
```

## Pistas
- Usa `useSuspense` o `loading.tsx` para estados de carga
- Crea un mock de datos para la API
- Usa Recharts o Chart.js para los gráficos

## Conceptos a Practicar
- Server Components para data fetching
- Client Components para interactividad
- Suspense boundaries
- Data fetching patterns
