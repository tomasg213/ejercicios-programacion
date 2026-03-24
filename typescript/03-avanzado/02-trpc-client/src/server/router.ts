import { z } from 'zod'
import { router, publicProcedure } from './procedures'

const users = new Map<string, { id: string; name: string; email: string }>()

users.set('1', { id: '1', name: 'John', email: 'john@test.com' })
users.set('2', { id: '2', name: 'Jane', email: 'jane@test.com' })

export const appRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const user = users.get(input.id)
      if (!user) throw new Error('User not found')
      return user
    }),

  getUsers: publicProcedure
    .input(z.object({ limit: z.number().optional() }))
    .mutation(async ({ input }) => {
      const allUsers = Array.from(users.values())
      return input.limit ? allUsers.slice(0, input.limit) : allUsers
    }),

  createUser: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email()
    }))
    .mutation(async ({ input }) => {
      const id = String(users.size + 1)
      const user = { id, ...input }
      users.set(id, user)
      return user
    }),

  updateUser: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      email: z.string().email().optional()
    }))
    .mutation(async ({ input }) => {
      const user = users.get(input.id)
      if (!user) throw new Error('User not found')
      
      const updated = { ...user, ...input }
      users.set(input.id, updated)
      return updated
    }),

  deleteUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const user = users.get(input.id)
      if (!user) throw new Error('User not found')
      users.delete(input.id)
      return { success: true }
    })
})

export type AppRouter = typeof appRouter
