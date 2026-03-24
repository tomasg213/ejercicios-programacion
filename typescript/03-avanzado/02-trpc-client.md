# Ejercicio 2: Type-safe API Client (tRPC)

## Caso Real
Trabajas en un proyecto full-stack. Necesitas crear un cliente API typesafe que infiera tipos automáticamente del servidor, similar a tRPC.

## Requisitos
1. Definir procedimientos (queries, mutations)
2. Inferir tipos desde la definición
3. Client con type inference
4. Validación con Zod

## Arquitectura
```
servidor: define Router → genera tipos → cliente: infiere tipos
```

## Estructura del Router
```typescript
const appRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => userService.find(input.id)),
  
  createUser: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(({ input }) => userService.create(input)),
})

type AppRouter = typeof appRouter
```

## Cliente Type-safe
```typescript
const client = createTRPCClient<AppRouter>()

const user = await client.getUser.query({ id: '1' })
// user type is inferred: { id: string, name: string, ... }

await client.createUser.mutate({ name: 'John', email: 'john@...' })
// Input is validated at compile time!
```

## Estructura de Archivos
```
02-trpc-client/
├── src/
│   ├── server/
│   │   ├── router.ts
│   │   ├── procedures.ts
│   │   └── index.ts
│   ├── client/
│   │   ├── client.ts
│   │   └── types.ts
│   ├── index.ts
│   └── example.ts
├── package.json
└── tsconfig.json
```

## Conceptos a Practicar
- Type inference con infer
- Procedural router definition
- Zod validation inference
- Full-stack type sharing

## Desafío Extra
- Añade subscription support (WebSockets)
- Implementa middlewares de autenticación
- Crea un queryoptions hook system
- Soporta batching de requests
