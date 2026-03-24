// Exercise 2: DeepPartial and DeepReadonly

// Make all properties optional recursively
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Make all properties readonly recursively
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// Test
type Nested = {
  user: {
    profile: {
      name: string
      settings: {
        theme: string
      }
    }
  }
}

type PartialNested = DeepPartial<Nested>
// Should have all nested properties as optional

type ReadonlyNested = DeepReadonly<Nested>
// Should have all nested properties as readonly
