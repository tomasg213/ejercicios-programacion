# Ejercicio 1: Página SSR Informativa

## Caso Real
Trabajas en una agencia web. Necesitas crear una página informativa sobre servicios con Server-Side Rendering para SEO.

## Requisitos
1. Página principal con servicios
2. Datos cargados desde el servidor (SSR)
3. Meta tags dinámicos
4. Componentes reutilizables
5. Estilos básicos

## Estructura de Página
```
/ (Home) - Lista de servicios
/servicios/[slug] - Página individual de servicio
```

## Datos de Servicios
```typescript
interface Servicio {
  id: string
  titulo: string
  descripcion: string
  precio: number
  caracteristicas: string[]
}
```

## Ejemplo de Salida
```
=== Servicios Digitales ===

[Logo] [Nombre de Empresa]

Nuestros Servicios:
━━━━━━━━━━━━━━━━━━━━
📱 Desarrollo Web
   Creamos sitios web modernos y responsivos
   Desde $500
   [Ver más →]

📱 Diseño UI/UX
   Interfaces intuitivas y atractivas
   Desde $300
   [Ver más →]

📱 Marketing Digital
   Estrategia para hacer crecer tu negocio
   Desde $400
   [Ver más →]

━━━━━━━━━━━━━━━━━━━━
© 2024 Mi Empresa
```

## Estructura de Archivos
```
01-pagina-ssr/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── servicios/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ServicioCard.tsx
│   │   └── Meta.tsx
│   ├── data/
│   │   └── servicios.ts
│   └── lib/
│       └── data.ts
├── package.json
├── next.config.js
└── tsconfig.json
```

## Pistas
- Usa `async/await` en page.tsx para SSR
- Usa `generateMetadata` para SEO
- Evita usar `use client` a menos que sea necesario

## Conceptos a Practicar
- Next.js App Router
- Server Components
- SSR vs SSG
- Dynamic metadata

## Desafío Extra
- Añade paginación
- Implementa búsqueda
- Añade filtros por precio
