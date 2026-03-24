# Proyecto 3: Asistente de Código con IA

## Descripción
Aplicación web para asistencia en programación con IA. Incluye editor de código avanzado, chat conversacional para dudas de código, análisis estático, y code review automático utilizando modelos de lenguaje.

## Stack Tecnológico
- **Frontend**: React + Monaco Editor + TypeScript
- **Backend**: FastAPI (Python 3.11)
- **IA**: OpenAI GPT-4 para chat y code review
- **ML**: TensorFlow.js para análisis en tiempo real
- **Contenedores**: Docker + Docker Compose

## Requisitos del Sistema
- Node.js 18+
- Python 3.11+
- Docker y Docker Compose
- API Key de OpenAI

## Variables de Entorno
```env
# Backend
OPENAI_API_KEY=sk-...
TENSORFLOW_MODEL_PATH=/models
ALLOWED_ORIGINS=http://localhost:5173

# Frontend
VITE_API_URL=http://localhost:8000
```

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│  Port: 5173                                                  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Monaco     │  │    Chat      │  │  Analysis    │      │
│  │   Editor     │  │   Panel      │  │   Panel      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────┬──────────────────────────────────┘
                           │ WebSocket + HTTP
         ┌─────────────────┴──────────────────┐
         │         BACKEND (FastAPI)         │
         │        Port: 8000                │
         │                                   │
         │  ├── /chat - Chat con IA         │
         │  ├── /analyze - Análisis código  │
         │  ├── /review - Code review       │
         │  ├── /explain - Explicar código  │
         │  └── /complete - Autocomplete    │
         └────────────────┬────────────────┘
                           │
     ┌─────────────────────┼─────────────────────┐
     │                     │                     │
┌────▼─────┐        ┌──────▼──────┐      ┌──────▼──────┐
│  OpenAI  │        │ TensorFlow │      │   SQLite    │
│   API    │        │    .js     │      │  (cache)    │
└──────────┘        └────────────┘      └─────────────┘
```

## Características

### 1. Editor de Código
- Monaco Editor (mismo VS Code)
- Soporte multi-lenguaje
- Syntax highlighting avanzado
- IntelliSense básico
- Temas personalizables

### 2. Chat con IA
- Conversación contextual sobre código
- Historial de conversación
- Comandos especiales:
  - `/explain` - Explicar selección
  - `/refactor` - Refactorizar
  - `/test` - Generar tests
  - `/bug` - Encontrar bugs

### 3. Análisis de Código
- Detección de errores potenciales
- Análisis de complejidad
- Sugerencias de rendimiento
- Security scanning básico

### 4. Code Review
- Revisión automática de código
- Sugerencias de mejora
- Best practices detection
- Seguridad

### 5. Autocomplete IA
- Sugerencias de código contexto-aware
- Completar funciones
- Generar boilerplate

## API Endpoints

### Chat
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/chat/message` | Enviar mensaje |
| GET | `/chat/history` | Historial |
| DELETE | `/chat/history` | Limpiar |

### Análisis
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/analyze` | Analizar código |
| POST | `/analyze/performance` | Análisis rendimiento |
| POST | `/analyze/security` | Análisis seguridad |

### Code Review
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/review` | Revisar código |
| GET | `/review/:id` | Ver revisión |

### Utilities
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/explain` | Explicar código |
| POST | `/refactor` | Refactorizar |
| POST | `/generate-test` | Generar tests |

## Modelo de Datos

```python
# Sessions
class Session(BaseModel):
    id: str
    language: str
    created_at: datetime
    messages: list[Message]

# Messages
class Message(BaseModel):
    role: str  # "user" | "assistant"
    content: str
    code_snippet: str | None
    timestamp: datetime

# Analysis Results
class Analysis(BaseModel):
    session_id: str
    issues: list[Issue]
    suggestions: list[str]
    metrics: dict
```

## Instalación

### Con Docker Compose
```bash
cd proyectos-integracion/03-asistente-codigo
docker-compose up -d
```

### Desarrollo Local
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

### Acceso
- Frontend: http://localhost:5173
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

## Estructura de Archivos

```
03-asistente-codigo/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor/         # Monaco wrapper
│   │   │   ├── Chat/           # Chat panel
│   │   │   ├── Analysis/       # Analysis results
│   │   │   └── Sidebar/       # Navigation
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilities
│   │   │   ├── api.ts         # API client
│   │   │   └── websocket.ts   # WebSocket client
│   │   ├── stores/             # State management
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI app
│   │   ├── router/            # Endpoints
│   │   │   ├── chat.py
│   │   │   ├── analyze.py
│   │   │   └── review.py
│   │   ├── services/          # Lógica de negocio
│   │   │   ├── openai_service.py
│   │   │   ├── analysis_service.py
│   │   │   └── tensorflow_service.py
│   │   └── models/            # Modelos Pydantic
│   ├── requirements.txt
│   └── .env.example
│
├── tensorflow/                 # Modelos TensorFlow
│   └── models/
│
├── docker-compose.yml
└── README.md
```

## Uso

### Chat
1. Escribir código en el editor
2. Seleccionar código relevante
3. Usar comandos en chat:
   - `/explain this` - Explicar selección
   - `/write tests` - Generar tests
   - `/find bugs` - Encontrar bugs

### Análisis
1. Escribir o pegar código
2. Click en "Analyze"
3. Ver resultados en panel lateral

### Code Review
1. Escribir función a revisar
2. Click en "Review"
3. Recibir sugerencias

## Comandos del Chat

| Comando | Descripción |
|---------|-------------|
| `/explain` | Explica el código seleccionado |
| `/refactor` | Propone refactorización |
| `/test` | Genera tests unitarios |
| `/optimize` | Optimiza el código |
| `/bug` | Encuentra potenciales bugs |
| `/docs` | Genera documentación |
| `/translate` | Traduce a otro lenguaje |

## Análisis de Rendimiento

```javascript
// Métricas que el modelo analiza
const metrics = {
  complexity: 'O(n log n)',
  linesOfCode: 150,
  functions: 5,
  maintainability: 'good',
  performance: {
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  }
};
```

## Contribuir
1. Fork del repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Añadir feature'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Pull Request
