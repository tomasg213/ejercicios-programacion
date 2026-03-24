# Ejercicio 2: Cliente HTTP - API de Rick and Morty

## Caso Real
Trabajas en frontend. Necesitas consumir una API pública para obtener datos de personajes y mostrarlos en tu aplicación.

## API a Usar
**Base URL:** `https://rickandmortyapi.com/api`

### Endpoints
- `GET /character` - Lista todos los personajes
- `GET /character/{id}` - Obtiene un personaje por ID
- `GET /character/?name={name}` - Busca por nombre

### Respuesta Ejemplo
```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "gender": "Male",
  "origin": { "name": "Earth" },
  "image": "https://..."
}
```

## Requisitos
1. Crear cliente HTTP que consuma la API
2. Función para obtener personaje por ID
3. Función para buscar personajes por nombre
4. Mostrar información formateada del personaje
5. Manejar errores (personaje no encontrado, error de red)

## Ejemplo de Salida
```
=== Rick and Morty API Client ===

Buscando personaje con ID 1...
---
Nombre: Rick Sanchez
Estado: Alive
Especie: Human
Género: Male
Origen: Earth
---
```

## Estructura de Archivos
```
proyecto/
├── cliente.js
├── api.js
└── main.js
```

## Pistas
- Instala `node-fetch` o usa `fetch` nativo (Node 18+)
- `fetch(url).then(res => res.json())`
- Usa `try/catch` para manejar errores
- `async/await` para código más limpio

## Conceptos a Practicar
- Fetch API
- Async/Await
- Promesas
- Manejo de errores
- APIs REST
- JSON
