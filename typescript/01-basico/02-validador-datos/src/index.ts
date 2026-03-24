import { validate } from './createValidator'
import { ValidatorSchema } from './types'
import { required, email, minLength, maxLength } from './validators/string'
import { minNum, maxNum, rangeNum } from './validators/number'

interface UserForm {
  username: string
  email: string
  password: string
  confirmPassword: string
  age: number
}

const userSchema: ValidatorSchema<UserForm> = {
  username: [
    { validate: required, message: 'El nombre de usuario es requerido' },
    { validate: minLength(3), message: 'El nombre debe tener al menos 3 caracteres' },
    { validate: maxLength(20), message: 'El nombre debe tener máximo 20 caracteres' }
  ],
  email: [
    { validate: required, message: 'El email es requerido' },
    { validate: email(), message: 'El email no es válido' }
  ],
  password: [
    { validate: required, message: 'La contraseña es requerida' },
    { validate: minLength(8), message: 'La contraseña debe tener al menos 8 caracteres' }
  ],
  age: [
    { validate: (v) => v >= 18, message: 'Debes ser mayor de edad' },
    { validate: (v) => v <= 100, message: 'Edad inválida' }
  ]
}

const formData: UserForm = {
  username: 'john',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123',
  age: 25
}

const result = validate(userSchema, formData)

console.log('Validation result:', result)

if (result.isValid) {
  console.log('Form is valid!')
} else {
  console.log('Validation errors:', result.errors)
}
