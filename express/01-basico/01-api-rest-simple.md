# Ejercicio 1: API REST Simple

## Caso Real
Trabajas en el backend. Necesitas crear una API REST básica con Express.js que exponga endpoints CRUD.

## Requisitos
1. GET /usuarios - Listar usuarios
2. GET /usuarios/:id - Obtener usuario por ID
3. POST /usuarios - Crear usuario
4. PUT /usuarios/:id - Actualizar usuario
5. DELETE /usuarios/:id - Eliminar usuario

## Estructura de Datos
```javascript
// Usuario
{
  id: number,
  nombre: string,
  email: string,
  edad: number
}
```

## Ejemplo de Uso
```bash
# Listar usuarios
GET http://localhost:3000/usuarios

# Crear usuario
POST http://localhost:3000/usuarios
{ "nombre": "Juan", "email": "juan@email.com", "edad": 25 }

# Actualizar usuario
PUT http://localhost:3000/usuarios/1
{ "nombre": "Juan Updated" }
```

## Estructura de Archivos
```
01-api-rest-simple/
├── src/
│   ├── index.js
│   ├── routes/usuarios.js
│   └── data/usuarios.js
├── package.json
└── README.md
```

## Pistas
- Usa express.json() middleware
- Implementa validación básica
- Usa router de express
- Maneja errores apropiadamente
