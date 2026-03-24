# Proyecto 1: SaaS de Gestión de Tareas

## Descripción
Plataforma SaaS para gestión de tareas en equipo con tableros Kanban, colaboración en tiempo real e integración de IA para sugerencias inteligentes.

## Stack Tecnológico
- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: FastAPI (Python 3.11)
- **Base de Datos**: PostgreSQL 15
- **Cache**: Redis
- **Autenticación**: JWT con refresh tokens
- **IA**: OpenAI GPT-4 para sugerencias
- **Contenedores**: Docker + Docker Compose

## Requisitos del Sistema

### Servicios Requeridos
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker y Docker Compose

### Variables de Entorno
```env
# Backend
DATABASE_URL=postgresql://app:secret@db:5432/app
REDIS_URL=redis://redis:6379
JWT_SECRET=your-jwt-secret
OPENAI_API_KEY=sk-...

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                  │
│  Port: 3000                                             │
│  ├── /app - Páginas de la aplicación                    │
│  ├── /components - Componentes React                   │
│  └── /lib - Utilidades y API client                    │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTP/WebSocket
         ┌────────────────┴────────────────┐
         │         BACKEND (FastAPI)        │
         │        Port: 4000               │
         │                                 │
         │  ├── /auth - Endpoints auth    │
         │  ├── /tasks - CRUD tareas      │
         │  ├── /teams - Gestión equipos  │
         │  └── /ai - Integración OpenAI  │
         └────────────────┬────────────────┘
                          │
    ┌─────────────────────┼─────────────────────┐
    │                     │                     │
┌───▼────┐        ┌──────▼──────┐      ┌──────▼──────┐
│PostgreSQL│        │    Redis    │      │   OpenAI    │
│:5432    │        │   :6379     │      │   API       │
└─────────┘        └─────────────┘      └─────────────┘
```

## Modelo de Datos

### Tablas Principales

```sql
-- Usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Equipos
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    owner_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Miembros de equipo
CREATE TABLE team_members (
    team_id UUID REFERENCES teams(id),
    user_id UUID REFERENCES users(id),
    role VARCHAR(20) DEFAULT 'member',
    PRIMARY KEY (team_id, user_id)
);

-- Tableros
CREATE TABLE boards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Columnas (ej: To Do, In Progress, Done)
CREATE TABLE columns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id UUID REFERENCES boards(id),
    name VARCHAR(50) NOT NULL,
    position INTEGER DEFAULT 0
);

-- Tareas
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    column_id UUID REFERENCES columns(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assignee_id UUID REFERENCES users(id),
    priority VARCHAR(20) DEFAULT 'medium',
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registrar usuario |
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/logout` | Cerrar sesión |

### Tareas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/tasks` | Listar tareas |
| POST | `/tasks` | Crear tarea |
| PUT | `/tasks/{id}` | Actualizar tarea |
| DELETE | `/tasks/{id}` | Eliminar tarea |
| PATCH | `/tasks/{id}/move` | Mover entre columnas |

### Equipos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/teams` | Listar equipos |
| POST | `/teams` | Crear equipo |
| GET | `/teams/{id}/members` | Miembros del equipo |

### IA
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/ai/suggest-tasks` | Sugerencias de tareas |
| POST | `/ai/summarize-board` | Resumen del tablero |

## Instalación

### 1. Clonar el repositorio
```bash
cd proyectos-integracion/01-saas-tareas
```

### 2. Configurar variables de entorno
```bash
# Backend
cp backend/.env.example backend/.env
# Editar backend/.env con tus valores

# Frontend
cp frontend/.env.example frontend/.env
```

### 3. Ejecutar con Docker Compose
```bash
docker-compose up -d
```

### 4. Acceso
- Frontend: http://localhost:3000
- API: http://localhost:4000
- Swagger: http://localhost:4000/docs

## Funcionalidades Detalladas

### 1. Autenticación
- Registro con email/password
- Login con JWT
- Refresh tokens automáticos
- Protección de rutas

### 2. Gestión de Equipos
- Crear equipos
- Invitar miembros por email
- Roles: owner, admin, member

### 3. Tableros Kanban
- Crear tableros
- Columnas personalizables
- Arrastrar y soltar tareas
- Filtrar por usuario/prioridad

### 4. Integración IA
- **Sugerencias de tareas**: GPT-4 analiza el contexto del proyecto
- **Priorización inteligente**: Sugiere orden de tareas
- **Resumen de progreso**: Reporte semanal generado por IA

## Estructura de Archivos

```
01-saas-tareas/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   │   ├── (auth)/      # Rutas de autenticación
│   │   │   ├── (dashboard)/ # Dashboard principal
│   │   │   └── api/          # API routes
│   │   ├── components/       # Componentes React
│   │   ├── lib/              # Utilidades
│   │   └── hooks/             # Custom hooks
│   ├── package.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app
│   │   ├── router/           # Endpoints
│   │   ├── models/           # Modelos Pydantic
│   │   ├── db/                # Conexión a DB
│   │   └── services/          # Lógica de negocio
│   ├── requirements.txt
│   └── .env.example
│
├── docker-compose.yml
└── README.md
```

## Desarrollo Local

### Sin Docker
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Screenshots y Demo
> Capturas de pantalla de la aplicación en funcionamiento.

## Contribuir
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request
