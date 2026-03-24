interface RetryOptions {
  maxAttempts: number
  delay: number
  backoff?: boolean
}

export function retry<T extends (...args: any[]) => any>(
  options: RetryOptions
) {
  return function(
    target: T,
    context: ClassMethodDecoratorContext
  ): T {
    const methodName = String(context.name)

    return async function(this: any, ...args: Parameters<T>): ReturnType<T> {
      let lastError: Error | null = null
      let delay = options.delay

      for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
        try {
          console.log(`[RETRY] Attempt ${attempt}/${options.maxAttempts}: ${methodName}`)
          return await target.apply(this, args)
        } catch (error) {
          lastError = error as Error
          console.log(`[RETRY] Attempt ${attempt} failed:`, error.message)
          
          if (attempt < options.maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delay))
            if (options.backoff) {
              delay *= 2
            }
          }
        }
      }

      throw new Error(`[RETRY] All attempts failed for ${methodName}: ${lastError?.message}`)
    } as T
  }
}
