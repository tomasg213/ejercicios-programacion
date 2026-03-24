import { ValidationRule, ValidationFn } from '../types'

export const min = (minValue: number): ValidationFn<any, number> => (value) => {
  return value >= minValue
}

export const max = (maxValue: number): ValidationFn<any, number> => (value) => {
  return value <= maxValue
}

export const range = (minValue: number, maxValue: number): ValidationFn<any, number> => (value) => {
  return value >= minValue && value <= maxValue
}

export const positive: ValidationFn<any, number> = (value) => {
  return value > 0
}

export const integer: ValidationFn<any, number> => (value) => {
  return Number.isInteger(value)
}

export const minNum = (minValue: number, message?: string): ValidationRule<any, number> => ({
  validate: min(minValue),
  message: message ?? `El valor debe ser mayor o igual a ${minValue}`
})

export const maxNum = (maxValue: number, message?: string): ValidationRule<any, number> => ({
  validate: max(maxValue),
  message: message ?? `El valor debe ser menor o igual a ${maxValue}`
})

export const rangeNum = (minValue: number, maxValue: number, message?: string): ValidationRule<any, number> => ({
  validate: range(minValue, maxValue),
  message: message ?? `El valor debe estar entre ${minValue} y ${maxValue}`
})
