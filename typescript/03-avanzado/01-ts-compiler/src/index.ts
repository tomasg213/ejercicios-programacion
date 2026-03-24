import * as ts from 'typescript'
import { parseCode, ParseResult } from './parser'
import { renameVariable, findReferences } from './transformers/rename'
import { extractMethod } from './transformers/extract'
import { findUnusedTypes, analyzeComplexity } from './transformers/unused'

const sampleCode = `
interface User {
  id: number
  name: string
  email: string
}

type UserDTO = {
  id: number
  name: string
}

class UserService {
  getUser(id: number): User {
    return { id, name: 'test', email: 'test@test.com' }
  }

  createUser(name: string, email: string): User {
    return { id: 1, name, email }
  }
}

function processUser(user: User): UserDTO {
  return { id: user.id, name: user.name }
}

const user = { id: 1, name: 'John', email: 'john@test.com' }
const processed = processUser(user)
`

console.log('=== TypeScript AST Analysis ===\n')

const result: ParseResult = parseCode(sampleCode)

console.log('Functions found:', result.functions.map(f => f.name?.text))
console.log('Classes found:', result.classes.map(c => c.name?.text))
console.log('Interfaces found:', result.interfaces.map(i => i.name?.text))

console.log('\n=== Rename Variable ===')
const renamed = renameVariable(result.sourceFile, 'user', 'currentUser')
console.log('Renamed code contains "currentUser":', renamed.includes('currentUser'))

console.log('\n=== Find References ===')
const refs = findReferences(result.sourceFile, 'user')
console.log('References to "user":', refs.length)

console.log('\n=== Extract Method ===')
const extracted = extractMethod('const x = 1 + 2;', 'calculateSum', ['a', 'b'])
console.log('Extracted method:', extracted.newCode)

console.log('\n=== Unused Types ===')
const unused = findUnusedTypes(result.sourceFile)
console.log('Unused types:', unused)

console.log('\n=== Complexity Analysis ===')
const complexity = analyzeComplexity(result.sourceFile)
console.log('Function complexity:', complexity.functions)

console.log('\n=== Parse Complete ===')
