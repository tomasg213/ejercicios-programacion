# Ejercicio 2: Servidor de Notas

## Caso Real
Necesitas crear un servidor REST para gestionar notas con categorías y tags.

## Requisitos
1. CRUD de notas
2. Filtrar por categoría
3. Filtrar por completada
4. Búsqueda por texto
5. Paginación

## Datos de Nota
```javascript
{
  id: number,
  titulo: string,
  contenido: string,
  categoria: string,
  tags: string[],
  completada: boolean,
  fechaCreacion: Date
}
```

## Endpoints
```
GET    /notas              - Listar notas (con filtros)
GET    /notas/:id          - Obtener nota por ID
POST   /notas              - Crear nota
PUT    /notas/:id          - Actualizar nota
DELETE /notas/:id          - Eliminar nota
```

## Parámetros de Query
```
?categoria=trabajo&completada=false&busqueda=reunion&pagina=1&limite=10
```

## Estructura de Archivos
```
02-servidor-notas/
├── src/
│   ├── index.js
│   ├── routes/notas.js
│   └── data/notas.js
├── package.json
```
