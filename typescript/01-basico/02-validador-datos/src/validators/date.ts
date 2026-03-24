import { ValidationRule, ValidationFn } from '../types'

export const isDate: ValidationFn<any, string | Date> = (value) => {
  const date = new Date(value)
  return !isNaN(date.getTime())
}

export const isFuture: ValidationFn<any, string | Date> = (value) => {
  const date = new Date(value)
  return date > new Date()
}

export const isPast: ValidationFn<any, string | Date> = (value) => {
  const date = new Date(value)
  return date < new Date()
}

export const minDate = (minDate: Date): ValidationFn<any, string | Date> => (value) => {
  const date = new Date(value)
  return date >= minDate
}

export const maxDate = (maxDate: Date): ValidationFn<any, string | Date> => (value) => {
  const date = new Date(value)
  return date <= maxDate
}

export const date = (message = 'Fecha inválida'): ValidationRule<any, string | Date> => ({
  validate: isDate,
  message
})

export const future = (message = 'La fecha debe ser futura'): ValidationRule<any, string | Date> => ({
  validate: isFuture,
  message
})

export const past = (message = 'La fecha debe ser pasada'): ValidationRule<any, string | Date> => ({
  validate: isPast,
  message
})
