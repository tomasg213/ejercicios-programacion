# Proyecto 2: Blog con CMS + AI

## Descripción
Blog moderno con sistema de gestión de contenido (CMS) basado en Markdown, integrado con IA para generación automática de contenido, resúmenes y optimización SEO.

## Stack Tecnológico
- **Frontend**: Astro 4 con React islands
- **Backend**: Express.js (Node.js)
- **Base de Datos**: MongoDB
- **Cache**: Redis
- **IA**: OpenAI GPT-4
- **Autenticación**: JWT
- **Contenedores**: Docker + Docker Compose

## Requisitos del Sistema
- Node.js 18+
- MongoDB 6+
- Redis 7+
- Docker y Docker Compose

## Variables de Entorno
```env
# Backend
MONGODB_URI=mongodb://mongo:27017/blog
REDIS_URL=redis://redis:6379
JWT_SECRET=your-jwt-secret
OPENAI_API_KEY=sk-...
SESSION_SECRET=session-secret

# Frontend
PUBLIC_API_URL=http://localhost:3000
```

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Astro)                      │
│  Port: 4321                                             │
│                                                          │
│  ├── Static Site Generation (SSG)                       │
│  ├── Server Side Rendering (SSR) para páginas dinámicas  │
│  └── React Islands para interactividad                   │
└─────────────────────────┬───────────────────────────────┘
                          │ REST API
         ┌────────────────┴────────────────┐
         │         BACKEND (Express)     │
         │        Port: 3000              │
         │                                 │
         │  ├── /auth - Autenticación    │
         │  ├── /posts - CRUD posts       │
         │  ├── /comments - Comentarios    │
         │  ├── /tags - Etiquetas         │
         │  └── /ai - OpenAI integration  │
         └────────────────┬────────────────┘
                          │
    ┌─────────────────────┼─────────────────────┐
    │                     │                     │
┌───▼────┐        ┌──────▼──────┐      ┌──────▼──────┐
│MongoDB │        │    Redis    │      │   OpenAI    │
│:27017  │        │   :6379     │      │   API       │
└────────┘        └─────────────┘      └─────────────┘
```

## Modelo de Datos

### Colecciones MongoDB

```javascript
// Posts
{
  _id: ObjectId,
  title: String,
  slug: String (unique),
  content: String (Markdown),
  excerpt: String,
  coverImage: String,
  author: ObjectId (ref: users),
  tags: [String],
  status: 'draft' | 'published',
  seo: {
    metaTitle: String,
    metaDescription: String
  },
  aiSummary: String,
  readingTime: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}

// Users
{
  _id: ObjectId,
  email: String (unique),
  passwordHash: String,
  name: String,
  avatar: String,
  role: 'admin' | 'author' | 'reader',
  createdAt: Date
}

// Comments
{
  _id: ObjectId,
  postId: ObjectId (ref: posts),
  author: ObjectId (ref: users),
  content: String,
  parentId: ObjectId (for replies),
  createdAt: Date
}
```

## API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registro |
| POST | `/auth/login` | Login |
| GET | `/auth/me` | Perfil actual |

### Posts
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/posts` | Listar posts (paginados) |
| GET | `/posts/:slug` | Obtener post |
| POST | `/posts` | Crear post |
| PUT | `/posts/:id` | Actualizar post |
| DELETE | `/posts/:id` | Eliminar post |

### Comentarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/posts/:id/comments` | Comentarios de post |
| POST | `/posts/:id/comments` | Añadir comentario |

### IA
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/ai/summary` | Generar resumen |
| POST | `/ai/seo` | Optimizar SEO |
| POST | `/ai/tags` | Suggest tags |
| POST | `/ai/improve` | Mejorar contenido |

## Instalación

### Con Docker Compose
```bash
cd proyectos-integracion/02-blog-ai
docker-compose up -d
```

### Desarrollo Local
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### Acceso
- Frontend: http://localhost:4321
- API: http://localhost:3000
- API Docs: http://localhost:3000/api-docs

## Funcionalidades

### 1. CMS con Markdown
- Editor de Markdown completo
- Preview en tiempo real
- Imágenes con drag & drop
- Shortcodes personalizables

### 2. Integración IA
- **Resumen automático**: Genera resumen del post
- **Optimización SEO**: Sugiere meta title/description
- **Etiquetas inteligentes**: Propone tags basados en contenido
- **Mejora de texto**: Reescribe y mejora el contenido

### 3. Rendimiento
- SSG para posts publicados
- SSR para páginas dinámicas
- Cache Redis para queries frecuentes
- Image optimization con Astro

### 4. SEO
- Meta tags automáticas
- Sitemap.xml
- Robots.txt
- Schema.org markup

### 5. Comentarios
- Sistema de comentarios anidados
- Moderación con IA
- Notificaciones

## Estructura de Archivos

```
02-blog-ai/
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes
│   │   │   ├── react/        # React islands
│   │   │   └── astro/       # Componentes Astro
│   │   ├── layouts/         # Layouts
│   │   ├── pages/           # Páginas
│   │   ├── content/         # Markdown files
│   │   │   └── blog/
│   │   └── lib/             # Utilidades
│   ├── astro.config.mjs
│   ├── package.json
│   └── tailwind.config.mjs
│
├── backend/
│   ├── src/
│   │   ├── routes/         # Endpoints
│   │   ├── models/          # Modelos Mongoose
│   │   ├── middleware/      # Middleware auth
│   │   ├── services/        # Lógica de negocio
│   │   └── utils/           # Utilidades
│   ├── package.json
│   └── .env.example
│
├── docker-compose.yml
└── README.md
```

## Uso del Editor

### Escribir un Post
```markdown
---
title: "Mi Primer Post"
date: 2024-01-15
tags: ["tutorial", "astro"]
excerpt: "Una introducción a Astro..."
---

# Contenido del post

Puedo usar **markdown** normal...

## Código
```javascript
console.log('Hola mundo');
```
```

### Integración IA desde el Editor

1. Escribir contenido
2. Click en "AI Assist"
3. Elegir acción:
   - Generar resumen
   - Sugerir tags
   - Optimizar SEO
   - Mejorar texto

## Caché con Redis

```javascript
// Ejemplo de cache
const cachedPosts = await redis.get('posts:page:1');
if (cachedPosts) {
  return JSON.parse(cachedPosts);
}

const posts = await getPostsFromDB();
await redis.setex('posts:page:1', 3600, JSON.stringify(posts));
return posts;
```

## Contribuir
1. Fork del repositorio
2. Crear rama: `git checkout -b fix/bug-fix`
3. Commit: `git commit -m 'Fix bug'`
4. Push: `git push origin fix/bug-fix`
5. Pull Request
