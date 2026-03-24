import * as ts from 'typescript'

export interface ParseResult {
  sourceFile: ts.SourceFile
  functions: ts.FunctionDeclaration[]
  classes: ts.ClassDeclaration[]
  interfaces: ts.InterfaceDeclaration[]
  types: ts.TypeAliasDeclaration[]
}

export function parseCode(code: string): ParseResult {
  const sourceFile = ts.createSourceFile(
    'sample.ts',
    code,
    ts.ScriptTarget.Latest,
    true
  )

  const functions: ts.FunctionDeclaration[] = []
  const classes: ts.ClassDeclaration[] = []
  const interfaces: ts.InterfaceDeclaration[] = []
  const types: ts.TypeAliasDeclaration[] = []

  function visit(node: ts.Node): void {
    if (ts.isFunctionDeclaration(node) && node.name) {
      functions.push(node)
    } else if (ts.isClassDeclaration(node) && node.name) {
      classes.push(node)
    } else if (ts.isInterfaceDeclaration(node) && node.name) {
      interfaces.push(node)
    } else if (ts.isTypeAliasDeclaration(node) && node.name) {
      types.push(node)
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return { sourceFile, functions, classes, interfaces, types }
}

export function printNode(node: ts.Node): string {
  return ts.getTextOfNode(node)
}

export function getNodeKind(node: ts.Node): string {
  return ts.SyntaxKind[node.kind]
}
