// Exercise 4: Mapped Types

// Transform keys to camelCase
type CamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<CamelCase<U>>}`
  : S

export type MapKeysToCamelCase<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K]
}

// Extract required keys
export type RequiredKeys<T> = {
  [K in keyof T]: T[K] extends Required<T>[K] ? K : never
}[keyof T]

// Filter to only required properties
export type FilterRequired<T> = Pick<T, RequiredKeys<T>>

// Test
type DbUser = {
  user_id: number
  first_name: string
  last_name: string
  email_address: string
  created_at: string
  is_active?: boolean
}

type ApiUser = MapKeysToCamelCase<DbUser>
// Should transform snake_case to camelCase

type RequiredDbUser = FilterRequired<DbUser>
// Should only include required fields (without optional)
