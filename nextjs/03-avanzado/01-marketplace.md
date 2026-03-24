# Ejercicio 1: Marketplace Completo

## Caso Real
Trabajas en un marketplace. Necesitas crear una plataforma completa con listados de productos, carrito, checkout y gestión de pedidos.

## Requisitos
1. Catálogo de productos con filtros
2. Carrito de compras
3. Checkout simulad
4. Gestión de pedidos
5. Búsqueda de productos

## Estructura de Archivos
```
01-marketplace/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── producto/[id]/
│   │   │   └── page.tsx
│   │   ├── carrito/
│   │   │   └── page.tsx
│   │   └── checkout/
│   │       └── page.tsx
│   └── components/
│       ├── ProductCard.tsx
│       ├── Carrito.tsx
│       └── SearchBar.tsx
└── package.json
```

## Conceptos a Practicar
- Server Components para listing
- Client Components para interactividad
- Context para estado global
- Optimistic updates
