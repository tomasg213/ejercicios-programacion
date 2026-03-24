type Constructor<T = any> = new (...args: any[]) => T
type Proto = { constructor: Constructor }

function log<T extends Proto, Args extends any[], R>(
  target: T,
  context: ClassMethodDecoratorContext<T, (...args: Args) => R>
) {
  const methodName = String(context.name)
  
  return function(this: any, ...args: Args): R {
    console.log(`[LOG] Calling ${methodName} with:`, args)
    const result = target.prototype[methodName].apply(this, args)
    console.log(`[LOG] ${methodName} returned:`, result)
    return result
  }
}

function validate<T extends Proto, Args extends any[], R>(
  target: T,
  context: ClassMethodDecoratorContext<T, (...args: Args) => R>
) {
  const methodName = String(context.name)
  
  return function(this: any, ...args: Args): R {
    console.log(`[VALIDATE] Checking params for ${methodName}`)
    if (args.some(a => a === undefined || a === null)) {
      throw new Error(`Invalid arguments for ${methodName}`)
    }
    return target.prototype[methodName].apply(this, args)
  }
}

class Calculator {
  @log
  @validate
  add(a: number, b: number): number {
    return a + b
  }

  @log
  divide(a: number, b: number): number {
    return a / b
  }
}

export { Calculator, log, validate }
