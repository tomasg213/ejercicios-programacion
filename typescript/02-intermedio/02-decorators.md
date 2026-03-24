# Ejercicio 2: Decorators y Metaprogramming

## Caso Real
Trabajas en un framework. Necesitas implementar decorators para logging, validación, caché, y inyección de dependencias.

## Requisitos
1. Decorators de clase y método
2. Decorator factory functions
3. Metadata reflection
4. Interceptar y modificar comportamiento

## Decorators a Implementar

### 2.1 @logged - Logging automático
```typescript
@logged
class UserService {
  @logged
  async getUser(id: string) {
    // calls will be logged
  }
}
```

### 2.2 @cached - Cache de resultados
```typescript
@cached({ ttl: 60000 })
async function getUser(id: string): Promise<User> {
  // result will be cached
}
```

### 2.3 @retry - Reintentos automáticos
```typescript
@retry({ maxAttempts: 3, delay: 1000 })
async function fetchData() {
  // will retry on failure
}
```

### 2.4 @debounce - Debounce en métodos
```typescript
@debounce(300)
handleSearch(query: string) {
  // will debounce calls
}
```

### 2.5 @rateLimit - Rate limiting
```typescript
@rateLimit({ maxCalls: 10, windowMs: 60000 })
submitForm(data: FormData) {
  // limited calls
}
```

### 2.6 Dependency Injection
```typescript
class Container {
  static register(key: string, value: any)
  static resolve(key: string): any
}

@injectable()
class UserService {
  constructor(@inject('db') private db: Database) {}
}
```

## Estructura de Archivos
```
02-decorators/
├── src/
│   ├── decorators/
│   │   ├── logged.ts
│   │   ├── cached.ts
│   │   ├── retry.ts
│   │   ├── debounce.ts
│   │   ├── rateLimit.ts
│   │   └── injectable.ts
│   ├── index.ts
│   └── tests.ts
├── package.json
└── tsconfig.json
```

## Conceptos a Practicar
- Class decorators
- Method decorators
- Parameter decorators
- Reflect metadata
- Decorator factories

## Desafío Extra
- Crea un ORM simple con decorators (@entity, @column, @primaryKey)
- Implementa middleware de validación con decorators
- Crea un router basado en decorators (@route, @get, @post)
