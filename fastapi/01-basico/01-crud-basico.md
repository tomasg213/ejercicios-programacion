# Ejercicio 1: API CRUD Básica

## Caso Real
Crea una API REST con FastAPI para gestionar tareas con validación automática.

## Requisitos
1. CRUD de tareas
2. Validación automática con Pydantic
3. Documentación automática (Swagger)
4. Filtros y paginación

## Modelo de Tarea
```python
class Tarea(BaseModel):
    id: Optional[int]
    titulo: str
    descripcion: Optional[str]
    completada: bool = False
    prioridad: str = "media"
```

## Endpoints
```
GET    /tareas          - Listar tareas
GET    /tareas/{id}    - Obtener tarea
POST   /tareas          - Crear tarea
PUT    /tareas/{id}    - Actualizar tarea
DELETE /tareas/{id}    - Eliminar tarea
```

## Estructura de Archivos
```
01-crud-basico/
├── main.py
├── requirements.txt
```
