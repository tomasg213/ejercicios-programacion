import { z } from 'zod'

export type inferProcedureInputs<T> = T extends Procedure<any, any, infer I, any, any> 
  ? I 
  : never

export type inferProcedureOutputs<T> = T extends Procedure<any, any, any, infer O, any> 
  ? O 
  : never

export const publicProcedure = {
  input: <T extends z.ZodType>(schema: T) => ({
    schema,
    _mock: null as z.infer<T>
  }),
  
  query: <T extends z.ZodType, O>(schema: T, resolver: (input: z.infer<T>) => O) => {
    return { type: 'query' as const, input: schema, resolver }
  },
  
  mutation: <T extends z.ZodType, O>(schema: T, resolver: (input: z.infer<T>) => O) => {
    return { type: 'mutation' as const, input: schema, resolver }
  }
}

export interface ProcedureContext {
  session?: { userId: string }
}

export interface Procedure<
  TContext extends ProcedureContext,
  TInput extends z.ZodType,
  TOutput extends z.ZodType,
  TMeta extends Record<string, any>
> {
  type: 'query' | 'mutation'
  input: TInput
  resolver: (input: z.infer<TInput>) => z.infer<TOutput>
  meta?: TMeta
}

export interface Router {
  queries: Record<string, any>
  mutations: Record<string, any>
}

export function router<T extends Router>(routes: T) {
  return routes
}
