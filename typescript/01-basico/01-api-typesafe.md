# Ejercicio 1: API Typesafe

## Caso Real
Trabajas en el backend. Necesitas crear utilidades TypeScript para manejar tipos de API responses de manera typesafe, con generics y utility types.

## Requisitos
1. Tipos genéricos para responses de API
2. Utility types para transformar tipos
3. Type guards para validación
4. Mapped types para transformación

## Estructura de Tipos
```typescript
interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
  timestamp: Date
}

interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
}
```

## Ejercicios

### 1.1 Crea tipos genéricos básicos
```typescript
// Crea un tipo que extraiga el tipo de data de una response
type ExtractData<T> = ...

// Resultado esperado
type DataType = ExtractData<ApiResponse<User>> // User
```

### 1.2 Utility Types
```typescript
// Crea un tipo que haga todas las propiedades opcionales recursivamente
type DeepPartial<T> = ...

// Crea un tipo que transforme un tipo a solo lectura recursiva
type DeepReadonly<T> = ...
```

### 1.3 Type Guards
```typescript
// Crea un type guard para verificar si una response tiene datos
function isSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  // ...
}
```

### 1.4 Mapped Types
```typescript
// Crea un tipo que transforme las claves de un objeto a camelCase
type MapKeysToCamelCase<T> = ...

// Crea un tipo que filtre propiedades opcionales
type RequiredKeys<T> = ...
```

## Solución Esperada
```typescript
// Archivo: src/types/api.ts
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
  timestamp: Date
}

// Usage
type UserResponse = ApiResponse<{ id: number; name: string; email: string }>

function handleResponse<T>(response: ApiResponse<T>): T | null {
  if (response.data) {
    return response.data
  }
  return null
}
```

## Estructura de Archivos
```
01-api-typesafe/
├── src/
│   ├── types/
│   │   └── api.ts
│   ├── utils/
│   │   └── typeGuards.ts
│   └── exercises/
│       ├── exercise1.ts
│       ├── exercise2.ts
│       ├── exercise3.ts
│       └── exercise4.ts
├── package.json
└── tsconfig.json
```

## Conceptos a Practicar
- Generic types `<T>`
- Utility types (Partial, Required, Pick, Omit)
- Conditional types
- Mapped types
- Type guards
- Template literal types

## Desafío Extra
- Implementa un serializer/deserializer typesafe
- Crea un tipo que infiera el tipo de error de la API
- Implementa discriminated union para diferentes tipos de response
