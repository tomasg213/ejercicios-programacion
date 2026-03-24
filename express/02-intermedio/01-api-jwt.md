# Ejercicio 1: API con JWT

## Caso Real
Crea una API segura con autenticación JWT, registro de usuarios y acceso a recursos protegidos.

## Requisitos
1. Registro de usuarios
2. Login con JWT
3. Middleware de autenticación
4. Rutas protegidas
5. Refresh tokens

## Endpoints de Auth
```
POST /auth/register  - Registro
POST /auth/login    - Login (retorna access + refresh token)
POST /auth/refresh  - Refresh token
GET  /profile       - Perfil (protegido)
```

## Estructura de Archivos
```
01-api-jwt/
├── src/
│   ├── index.js
│   ├── routes/auth.js
│   ├── routes/profile.js
│   ├── middleware/auth.js
│   └── data/usuarios.js
├── package.json
```
