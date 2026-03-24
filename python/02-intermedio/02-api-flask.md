# Ejercicio 2: API REST con Flask

## Caso Real
Trabajas en backend. Necesitas crear una API REST para gestionar libros de una biblioteca.

## Modelo de Libro
```python
{
    "id": 1,
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "anio": 2008,
    "genero": "Programacion",
    "disponible": True
}
```

## Endpoints
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /libros | Lista todos los libros |
| GET | /libros/<id> | Obtiene libro por ID |
| POST | /libros | Crea un nuevo libro |
| PUT | /libros/<id> | Actualiza un libro |
| DELETE | /libros/<id> | Elimina un libro |
| GET | /libros/buscar?autor=&genero= | Busca libros |

## Requisitos
1. Instalar Flask: `pip install flask`
2. Validación de datos en POST/PUT
3. Códigos de estado HTTP correctos
4. Búsqueda con filtros (autor, género)
5. Documentación de endpoints en la raíz

## Ejecutar
```bash
python api.py
# Servidor en http://localhost:5000
```

## Probar con curl
```bash
curl http://localhost:5000/libros
curl -X POST http://localhost:5000/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Python Crash Course","autor":"Eric Matthes","anio":2015,"genero":"Programacion"}'
```

## Pistas
- `@app.route('/libros', methods=['GET'])` define rutas
- `request.get_json()` para obtener body JSON
- `jsonify()` para respuestas JSON
- `abort(404)` para errores
- Lista en memoria para almacenar libros

## Conceptos a Practicar
- Flask framework
- Routing
- Request/Response
- Validación
- HTTP methods
- Decoradores
