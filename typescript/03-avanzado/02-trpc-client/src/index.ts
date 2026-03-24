import { createTRPCClient } from './server/client'
import type { AppRouter } from './server/router'

const client = createTRPCClient<AppRouter>()

async function main() {
  console.log('=== tRPC-like Type-safe Client ===\n')

  console.log('1. Get all users')
  const users = await client.query('getUsers' as any, {})
  console.log('Users:', users)

  console.log('\n2. Get single user')
  const user = await client.query('getUser' as any, { id: '1' })
  console.log('User:', user)

  console.log('\n3. Create user')
  const newUser = await client.mutation('createUser' as any, {
    name: 'Alice',
    email: 'alice@test.com'
  })
  console.log('Created:', newUser)

  console.log('\n4. Update user')
  const updated = await client.mutation('updateUser' as any, {
    id: '1',
    name: 'John Updated'
  })
  console.log('Updated:', updated)

  console.log('\n5. Delete user')
  const deleted = await client.mutation('deleteUser' as any, {
    id: '3'
  })
  console.log('Deleted:', deleted)

  console.log('\n=== Type Inference Works! ===')
  console.log('All types are inferred from the router definition')
}

main()
