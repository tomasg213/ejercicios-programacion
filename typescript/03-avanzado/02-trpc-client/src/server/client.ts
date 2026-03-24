import { appRouter, AppRouter } from './router'

interface QueryOptions {
  queryKey?: any[]
}

export function createTRPCClient<T extends AppRouter>() {
  const router = appRouter

  async function query<
    K extends keyof T['queries']
  >(
    key: K,
    input?: any,
    options?: QueryOptions
  ): Promise<any> {
    const procedure = router.queries[key as string]
    if (!procedure) {
      throw new Error(`Query ${String(key)} not found`)
    }
    return procedure.resolver(input || {})
  }

  async function mutation<
    K extends keyof T['mutations']
  >(
    key: K,
    input?: any
  ): Promise<any> {
    const procedure = router.mutations[key as string]
    if (!procedure) {
      throw new Error(`Mutation ${String(key)} not found`)
    }
    return procedure.resolver(input || {})
  }

  return {
    query,
    mutation,
    router
  }
}

export type TRPCClient<T extends AppRouter> = ReturnType<typeof createTRPCClient<T>>
