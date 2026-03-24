# Ejercicio 1: FastAPI con Async/Await

## Caso Real
Trabajas en backend de alta disponibilidad. Necesitas una API asíncrona para procesar múltiples requests simultáneos eficientemente.

## Por qué Async
- **Sincrónico**: 1000 requests = 1000 segundos (si cada uno tarda 1s)
- **Asíncrono**: 1000 requests = ~10 segundos (con 100 workers)

## Endpoints
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /productos | Lista productos (async) |
| POST | /productos | Crear producto |
| GET | /productos/{id} | Obtener producto |
| PUT | /productos/{id} | Actualizar producto |
| DELETE | /productos/{id} | Eliminar producto |
| GET | /productos/{id}/stats | Estadísticas (simula DB lenta) |
| POST | /procesar | Procesamiento pesado async |

## Modelo
```python
class Producto(BaseModel):
    id: Optional[int] = None
    nombre: str
    precio: float
    stock: int = 0
    categoria: str
```

## Requisitos
1. Instalar: `pip install fastapi uvicorn`
2. Usar `async def` para operaciones I/O
3. Simular latencia con `asyncio.sleep()`
4. Manejo de errores con `HTTPException`
5. Validación con Pydantic
6. Documentación automática en `/docs`

## Ejecutar
```bash
pip install fastapi uvicorn
uvicorn main:app --reload
# Documentacion: http://localhost:8000/docs
```

## Probar concurrencia
```python
import asyncio
import aiohttp

async def hacer_requests():
    async with aiohttp.ClientSession() as session:
        tasks = [session.get('http://localhost:8000/health') for _ in range(100)]
        responses = await asyncio.gather(*tasks)
        return len([r for r in responses if r.status == 200])

asyncio.run(hacer_requests())
```

## Pistas
- `async def` marca funciones asíncronas
- `await` espera resultados
- `asyncio.gather()` ejecuta múltiples corutinas
- `BackgroundTasks` para tareas en segundo plano

## Conceptos a Practicar
- async/await
- FastAPI
- Corutinas
- Pydantic
- Concurrencia
- Background tasks
