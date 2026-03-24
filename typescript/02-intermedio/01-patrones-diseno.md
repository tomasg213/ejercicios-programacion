# Ejercicio 1: Patrones de Diseño

## Caso Real
Trabajas en una librería de utilidades. Necesitas implementar patrones de diseño comunes en TypeScript para crear una biblioteca reusable.

## Requisitos
1. Implementar Singleton, Factory, Observer
2. Implementar Strategy, Adapter, Decorator
3. Tipos genéricos para cada patrón
4. Tests básicos de funcionalidad

## Patrones a Implementar

### 1.1 Singleton
```typescript
class Database {
  private static instance: Database
  
  private constructor() {}
  
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}
```

### 1.2 Factory
```typescript
interface PaymentMethod {
  pay(amount: number): Promise<boolean>
}

class PaymentFactory {
  static create(method: 'credit' | 'debit' | 'paypal'): PaymentMethod {
    // ...
  }
}
```

### 1.3 Observer
```typescript
interface Observer<T> {
  update(data: T): void
}

class EventEmitter<T> {
  subscribe(observer: Observer<T>): () => void
  emit(data: T): void
}
```

### 1.4 Strategy
```typescript
interface SortStrategy<T> {
  sort(items: T[]): T[]
}

class Sorter<T> {
  setStrategy(strategy: SortStrategy<T>)
  sort(items: T[]): T[]
}
```

### 1.5 Adapter
```typescript
interface NewAPI {
  getData(): Promise<{ items: string[] }>
}

interface OldAPI {
  getData(): Promise<string[]>
}

class Adapter implements OldAPI {
  constructor(private api: NewAPI) {}
  async getData(): Promise<string[]> {
    const result = await this.api.getData()
    return result.items
  }
}
```

### 1.6 Decorator
```typescript
function log<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext
) {
  return function(...args: Parameters<T>): ReturnType<T> {
    console.log(`Calling ${String(context.kind)}...`)
    const result = target.apply(this, args)
    console.log(`Called ${String(context.kind)}`)
    return result
  }
}
```

## Estructura de Archivos
```
01-patrones-diseno/
├── src/
│   ├── patterns/
│   │   ├── singleton.ts
│   │   ├── factory.ts
│   │   ├── observer.ts
│   │   ├── strategy.ts
│   │   ├── adapter.ts
│   │   └── decorator.ts
│   ├── index.ts
│   └── tests.ts
├── package.json
└── tsconfig.json
```

## Conceptos a Practicar
- Clases y modificadores de acceso
- Interfaces y contracts
- Generics en patrones
- Decorator metadata

## Desafío Extra
- Implementa el patrón Builder con fluent API
- Crea un proxy typesafe
- Implementa patrón Repository con TypeScript
- Añade decorators de validación
