# Ejercicio 2: Autenticación con NextAuth

## Caso Real
Trabajas en una app que necesita autenticación. Implementa NextAuth.js con múltiples proveedores y protección de rutas.

## Requisitos
1. Autenticación con Credentials
2. Autenticación con Google OAuth
3. Protección de rutas
4. Sesión de usuario
5. Dashboard protegido

## Estructura de Archivos
```
02-autenticacion-nextauth/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   └── SessionProvider.tsx
│   └── lib/
│       └── auth.ts
├── .env.local.example
└── package.json
```

## Conceptos a Practicar
- NextAuth.js configuration
- Session management
- Protected routes
- Middleware de autenticación
