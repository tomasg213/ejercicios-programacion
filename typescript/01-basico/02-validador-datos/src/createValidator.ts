import { ValidatorSchema, ValidationResult, ValidationError, ValidationRule } from './types'

export function validate<T>(schema: ValidatorSchema<T>, data: T): ValidationResult<T> {
  const errors: ValidationError[] = []
  
  for (const key in schema) {
    const field = key as keyof T
    const rules = schema[field]
    
    if (!rules) continue
    
    const value = data[field]
    
    for (const rule of rules) {
      const isValid = rule.validate(value as any, data)
      
      if (!isValid) {
        errors.push({
          field: String(field),
          message: rule.message
        })
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    data: errors.length === 0 ? data : undefined
  }
}

export function createRule<T, V>(
  validate: (value: V, allValues: T) => boolean,
  message: string
): ValidationRule<T, V> {
  return { validate, message }
}

export function and<T, V>(...rules: ValidationRule<T, V>[]): ValidationRule<T, V> {
  return {
    validate: (value, allValues) => rules.every(r => r.validate(value, allValues)),
    message: rules.map(r => r.message).join(' y ')
  }
}

export function or<T, V>(...rules: ValidationRule<T, V>[]): ValidationRule<T, V> {
  return {
    validate: (value, allValues) => rules.some(r => r.validate(value, allValues)),
    message: rules.map(r => r.message).join(' o ')
  }
}

export function not<T, V>(rule: ValidationRule<T, V>, message: string): ValidationRule<T, V> {
  return {
    validate: (value, allValues) => !rule.validate(value, allValues),
    message
  }
}
