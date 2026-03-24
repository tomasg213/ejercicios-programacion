const container = new Map<string, any>()

export class Container {
  static register(key: string, value: any): void {
    container.set(key, value)
  }

  static resolve<T>(key: string): T {
    const value = container.get(key)
    if (!value) {
      throw new Error(`[INJECT] No dependency found for: ${key}`)
    }
    return value
  }

  static clear(): void {
    container.clear()
  }
}

export function injectable(target: any): any {
  const originalConstructor = target
  const paramTypes = Reflect.getMetadata('design:paramtypes', target) || []

  return class extends originalConstructor {
    constructor(...args: any[]) {
      const resolvedArgs = paramTypes.map((type: any, index: number) => {
        const paramKey = `${originalConstructor.name}_param_${index}`
        try {
          return Container.resolve(paramKey)
        } catch {
          return args[index]
        }
      })
      super(...resolvedArgs)
    }
  }
}

export function inject(key: string) {
  return function(target: any, context: ParameterDecoratorContext) {
    const paramIndex = context.index
    const className = target.constructor?.name || 'Unknown'
    const paramKey = `${className}_param_${paramIndex}`
    
    Container.register(paramKey, key)
  }
}
