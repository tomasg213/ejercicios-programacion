export type ValidationRule<T, V> = {
  validate: (value: V, allValues: T) => boolean
  message: string
}

export type FieldRules<T, K extends keyof T> = {
  field: K
  rules: ValidationRule<T, T[K]>[]
}

export type ValidatorSchema<T> = {
  [K in keyof T]?: ValidationRule<T, T[K]>[]
}

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult<T> {
  isValid: boolean
  errors: ValidationError[]
  data?: T
}

export type ValidationFn<T, V> = (value: V, allValues: T) => boolean
