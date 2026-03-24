export function logged<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext
): T {
  const methodName = String(context.name)

  return function(this: any, ...args: Parameters<T>): ReturnType<T> {
    console.log(`[LOG] Entering ${methodName}`, args)
    const result = target.apply(this, args)
    console.log(`[LOG] Exiting ${methodName}`, result)
    return result
  } as T
}

export function loggedClass<T extends new (...args: any[]) => any>(
  constructor: T,
  context: ClassDecoratorContext<T>
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      console.log(`[LOG] Instance created: ${constructor.name}`)
    }
  }
}
