# Ejercicio 1: App de Clima

## Caso Real
Trabajas en una startup meteorológica. Necesitas crear una app que muestre el clima actual y pronóstica de múltiples ciudades, consumiendo una API pública.

## Requisitos
1. Buscar ciudad y mostrar clima actual
2. Mostrar pronóstico de 5 días
3. Convertir unidades (Celsius/Fahrenheit)
4. Guardar ciudades favoritas
5. Historial de búsquedas recientes
6. Indicadores visuales (íconos dinámicos)

## API a Utilizar
- **Open-Meteo** (gratuita, sin API key): `https://api.open-meteo.com/v1/forecast`
- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`

## Ejemplo de Salida
```
=== 🌤️ Weather App ===

[Buscar ciudad...      ] [🔍]

Madrid, ES
Temperatura: 22°C
Sensación: 20°C
Humedad: 65%
Viento: 15 km/h

=== Pronóstico 5 días ===
Lun  ☀️  24°C/18°C
Mar  🌧️  21°C/16°C
Mié  ⛅  23°C/17°C
Jue  ☀️  25°C/19°C
Vie  ☀️  26°C/20°C

Ciudades guardadas: [Madrid] [Barcelona] [+]
```

## Estructura de Archivos
```
01-app-clima/
├── src/
│   ├── components/
│   │   ├── Buscador.tsx
│   │   ├── ClimaActual.tsx
│   │   ├── Pronostico.tsx
│   │   ├── CiudadesFavoritas.tsx
│   │   └── SelectorUnidades.tsx
│   ├── hooks/
│   │   └── useClima.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Pistas
- Usa `fetch` para las llamadas a la API
- Usa `useEffect` para cargar datos iniciales
- Implementa `useMemo` para optimizar renderizados
- Maneja estados de carga y error

## Conceptos a Practicar
- Fetch API y async/await
- TypeScript generics
- Custom hooks avanzados
- Programación defensiva

## Desafío Extra
- Añade gráficos de temperatura
- Implementa geolocalización automática
- Añade alertas meteorológicas
- Implementa modo offline con Service Worker
