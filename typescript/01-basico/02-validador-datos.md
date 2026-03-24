# Ejercicio 2: Validador de Datos

## Caso Real
Trabajas en validación de formularios. Necesitas crear un validador de datos genérico y typesafe que soporte diferentes tipos de datos y reglas de validación.

## Requisitos
1. Validar strings (email, URL, regex personalizado)
2. Validar números (mín, máx, rango)
3. Validar fechas
4. Validar objetos anidados
5. Definir reglas con generics
6. Mensajes de error personalizados

## Estructura de Validador
```typescript
type ValidationRule<T, V> = {
  validate: (value: V, allValues: T) => boolean
  message: string
}

type FieldValidator<T, K extends keyof T> = {
  field: K
  rules: ValidationRule<T, T[K]>[]
}
```

## Ejemplo de Uso
```typescript
const schema = createValidator<UserForm>({
  email: [
    { validate: (v) => !!v, message: 'Email es requerido' },
    { validate: (v) => isEmail(v), message: 'Email inválido' }
  ],
  edad: [
    { validate: (v) => v >= 18, message: 'Debes ser mayor de edad' },
    { validate: (v) => v <= 100, message: 'Edad inválida' }
  ]
})

const result = validate<UserForm>(schema, formData)
```

## Estructura de Archivos
```
02-validador-datos/
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── validators/
│   │   ├── string.ts
│   │   ├── number.ts
│   │   └── date.ts
│   ├── createValidator.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Pistas
- Usa generics `<T>` para el tipo del formulario
- Crea funciones helper para reglas comunes
- Implementa composabilidad con `and`, `or`
- Usa type inference para inferir tipos

## Conceptos a Practicar
- Function overloads
- Type inference
- Discriminated unions
- Functional programming

## Desafío Extra
- Añade validación asíncrona
- Implementa validaciones condicionales
- Crea un schema builder fluently
- Añade sanitización de datos
