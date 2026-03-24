# Ejercicio 2: Sistema de Autenticación JWT

## Caso Real
Trabajas en seguridad. Necesitas implementar autenticación basada en tokens para una API REST.

## Conceptos Clave
- **JWT (JSON Web Token)**: Token stateless para autenticación
- **Bearer Token**: Header `Authorization: Bearer <token>`
- **Refresh Token**: Token para renovar el acceso
- **Password Hashing**: bcrypt para guardar contraseñas

## Estructura del JWT
```
header.payload.signature
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZW1haWxAZXhhbXBsZS5jb20ifQ.signature
```

## Endpoints
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Registro de usuario | No |
| POST | /auth/login | Iniciar sesión | No |
| POST | /auth/refresh | Renovar token | Refresh |
| GET | /users/perfil | Ver perfil | JWT |
| PUT | /users/perfil | Actualizar perfil | JWT |
| GET | /productos | Listar productos | JWT |
| POST | /productos | Crear producto | Admin |

## Requisitos
1. Generar JWT con firma HMAC
2. Middleware de verificación de token
3. Passwords hasheados con bcrypt
4. Rate limiting en login (5 intentos)
5. Refresh tokens con expiración corta
6. Middleware de roles (user/admin)

## Modelo de Usuario
```json
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "password": "$2b$10$...",
  "nombre": "Juan Perez",
  "rol": "user",
  "creadoEn": "2024-01-15T10:00:00Z"
}
```

## Pistas
- `npm install jsonwebtoken bcryptjs`
- `jwt.sign(payload, secret, { expiresIn })`
- `jwt.verify(token, secret)`
- `bcrypt.hash(password, 10)`
- `bcrypt.compare(password, hash)`

## Conceptos a Practicar
- JWT (JSON Web Tokens)
- bcrypt para passwords
- Middleware de autenticación
- Roles y permisos
- Refresh tokens
- Seguridad básica
