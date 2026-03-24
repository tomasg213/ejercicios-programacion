# Ejercicio 4: Servidor REST con Express

## Caso Real
Trabajas en backend. Necesitas crear un API REST para gestionar tareas (TODO) con todas las operaciones CRUD.

## Endpoints Requeridos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /tareas | Lista todas las tareas |
| GET | /tareas/:id | Obtiene una tarea por ID |
| POST | /tareas | Crea una nueva tarea |
| PUT | /tareas/:id | Actualiza una tarea |
| DELETE | /tareas/:id | Elimina una tarea |

## Modelo de Tarea
```json
{
  "id": 1,
  "titulo": "Comprar groceries",
  "descripcion": "Leche, pan, huevos",
  "completada": false,
  "prioridad": "alta",
  "fechaCreacion": "2024-01-15T10:00:00Z"
}
```

## Requisitos
1. Instalar Express: `npm install express`
2. Middleware JSON: `express.json()`
3. Validación de datos en POST/PUT
4. Manejo de errores 404 y 500
5. Códigos de estado HTTP correctos
6. Almacenamiento en memoria (no persistencia)

## Ejemplo de Requests
```bash
# Crear tarea
curl -X POST http://localhost:3000/tareas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Nueva tarea","prioridad":"media"}'

# Listar tareas
curl http://localhost:3000/tareas

# Marcar como completada
curl -X PUT http://localhost:3000/tareas/1 \
  -H "Content-Type: application/json" \
  -d '{"completada":true}'
```

## Estructura
```
proyecto/
├── server.js
├── package.json
└── routes/
    └── tareas.js
```

## Pistas
- `app.use(express.json())` para parsear JSON
- `res.status(201).json()` para respuestas
- Valida con `if (!dato)` antes de procesar
- Usa `findIndex()` para buscar por ID

## Conceptos a Practicar
- Express.js
- Routing
- Middleware
- CRUD operations
- HTTP status codes
- Validación de datos
