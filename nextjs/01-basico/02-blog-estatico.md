# Ejercicio 2: Blog Estático

## Caso Real
Trabajas en un blog personal. Necesitas crear un blog estático con Markdown, generación de rutas y optimizado para SEO.

## Requisitos
1. Posts en Markdown
2. Listado de posts en home
3. Página individual de post
4. Categorías y tags
5. RSS feed

## Frontmatter
```markdown
---
title: "Mi Primer Post"
date: "2024-01-15"
category: "Tutoriales"
tags: ["react", "typescript"]
excerpt: "Una introducción a React..."
---

# Contenido del post
```

## Estructura de Archivos
```
02-blog-estatico/
├── posts/
│   ├── primer-post.md
│   ├── segundo-post.md
│   └── tercer-post.md
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   ├── lib/
│   │   ├── posts.ts
│   │   └── markdown.ts
│   └── components/
│       ├── PostCard.tsx
│       └── Markdown.tsx
├── package.json
└── next.config.js
```

## Pistas
- Usa `fs` y `path` para leer archivos
- Usa `gray-matter` para parsear frontmatter
- Genera rutas estáticas con `generateStaticParams`
- Usa `revalidate` para ISR

## Conceptos a Practicar
- Static Site Generation (SSG)
- Markdown parsing
- Frontmatter
- ISR (Incremental Static Regeneration)
