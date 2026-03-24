interface RateLimitOptions {
  maxCalls: number
  windowMs: number
}

const rateLimitStore = new Map<string, { calls: number; resetTime: number }>()

export function rateLimit<T extends (...args: any[]) => any>(
  options: RateLimitOptions
) {
  return function(
    target: T,
    context: ClassMethodDecoratorContext
  ): T {
    const methodName = String(context.name)

    return function(this: any, ...args: Parameters<T>): ReturnType<T> | void {
      const key = `${methodName}`
      const now = Date.now()
      let record = rateLimitStore.get(key)

      if (!record || now > record.resetTime) {
        record = { calls: 0, resetTime: now + options.windowMs }
        rateLimitStore.set(key, record)
      }

      if (record.calls >= options.maxCalls) {
        throw new Error(`[RATE_LIMIT] ${methodName} rate limit exceeded`)
      }

      record.calls++
      return target.apply(this, args)
    } as T
  }
}
