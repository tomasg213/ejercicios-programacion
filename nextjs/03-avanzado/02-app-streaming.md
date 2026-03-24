# Ejercicio 2: App de Video Streaming

## Caso Real
Trabajas en una plataforma de streaming. Necesitas crear una app tipo Netflix/YouTube con listado de videos, reproductor y categorías.

## Requisitos
1. Catálogo de videos por categorías
2. Reproductor de video (HTML5)
3. Buscador con filtros
4. Video recomendado
5. Historial de visualización

## Estructura de Archivos
```
02-app-streaming/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── video/[id]/
│   │   │   └── page.tsx
│   │   └── search/
│   │       └── page.tsx
│   └── components/
│       ├── VideoCard.tsx
│       ├── Player.tsx
│       └── CategoryRow.tsx
└── package.json
```

## Conceptos a Practicar
- Video player con HTML5
- Optimized image loading
- Streaming basics
