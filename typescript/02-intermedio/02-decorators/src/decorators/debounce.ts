interface DebounceOptions {
  delay: number
  leading?: boolean
}

export function debounce<T extends (...args: any[]) => any>(
  options: DebounceOptions
) {
  return function(
    target: T,
    context: ClassMethodDecoratorContext
  ): T {
    const methodName = String(context.name)
    let timeoutId: NodeJS.Timeout | null = null
    let lastArgs: Parameters<T> | null = null

    return function(this: any, ...args: Parameters<T>): void {
      lastArgs = args
      
      if (options.leading && !timeoutId) {
        target.apply(this, args)
      }

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        if (!options.leading || timeoutId) {
          target.apply(this, lastArgs!)
        }
        timeoutId = null
      }, options.delay)
    } as T
  }
}
