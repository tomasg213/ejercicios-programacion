import { ValidationRule, ValidationFn } from '../types'

export const isEmail: ValidationFn<any, string> = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

export const isUrl: ValidationFn<any, string> = (value) => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export const minLength = (min: number): ValidationFn<any, string> => (value) => {
  return value.length >= min
}

export const maxLength = (max: number): ValidationFn<any, string> => (value) => {
  return value.length <= max
}

export const matches = (pattern: RegExp): ValidationFn<any, string> => (value) => {
  return pattern.test(value)
}

export const required: ValidationFn<any, any> = (value) => {
  if (typeof value === 'string') return value.trim().length > 0
  if (typeof value === 'number') return !isNaN(value)
  return value !== null && value !== undefined
}

export const pattern = (regex: RegExp, message: string): ValidationRule<any, string> => ({
  validate: (value) => regex.test(value),
  message
})

export const email = (message = 'Email inválido'): ValidationRule<any, string> => ({
  validate: isEmail,
  message
})

export const url = (message = 'URL inválida'): ValidationRule<any, string> => ({
  validate: isUrl,
  message
})

export const length = (min: number, max: number, message?: string): ValidationRule<any, string> => ({
  validate: (value) => value.length >= min && value.length <= max,
  message: message ?? `La longitud debe estar entre ${min} y ${max}`
})
