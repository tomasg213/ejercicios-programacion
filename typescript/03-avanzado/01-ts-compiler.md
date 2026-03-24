# Ejercicio 1: TypeScript Compiler (AST)

## Caso Real
Trabajas en herramientas de desarrollo. Necesitas manipular el AST de TypeScript para análisis estático, refactorizaciones automáticas, y generación de código.

## Requisitos
1. Parsear código TypeScript a AST
2. Traversar y buscar nodos
3. Transformar nodos
4. Generar código desde AST

## Herramientas
- `@typescript-eslint/parser` - Parseo de AST
- `typescript` - API del compilador

## Ejercicios

### 1.1 Encontrar todas las funciones
```typescript
// Encuentra todas las declaraciones de funciones
function findFunctions(sourceFile: SourceFile): FunctionDeclaration[] {
  // Recorrer el AST y encontrar nodos FunctionDeclaration
}
```

### 1.2 Renombrar variables automáticamente
```typescript
// Renombra todas las ocurrencias de una variable
function renameVariable(
  sourceFile: SourceFile,
  oldName: string,
  newName: string
): string {
  // Encontrar todos los referencias y cambiarlas
}
```

### 1.3 Extraer método
```typescript
// Extrae código重复ado a un nuevo método
function extractMethod(
  sourceFile: SourceFile,
  startLine: number,
  endLine: number,
  newMethodName: string
): string {
  // Crear un nuevo método y reemplazar código
}
```

### 1.4 Encontrar tipos no utilizados
```typescript
// Encuentra interfaces/types que no se usan
function findUnusedTypes(sourceFile: SourceFile): string[] {
  // Analizar el AST para encontrar tipos sin referencias
}
```

## Estructura de Archivos
```
01-ts-compiler/
├── src/
│   ├── parser.ts
│   ├── transformers/
│   │   ├── rename.ts
│   │   ├── extract.ts
│   │   └── unused.ts
│   ├── index.ts
│   └── sample.ts
├── package.json
└── tsconfig.json
```

## Conceptos a Practicar
- TypeScript Compiler API
- Nodos del AST
- Traversing del árbol
- SourceMap generation

## Desafío Extra
- Crea un linter custom que detecte código smell
- Implementa auto-import de módulos
- Crea un generador de documentación desde código
