import * as ts from 'typescript'

export function findUnusedTypes(sourceFile: ts.SourceFile): string[] {
  const definedTypes = new Set<string>()
  const usedTypes = new Set<string>()

  function visit(node: ts.Node): void {
    if (ts.isInterfaceDeclaration(node) && node.name) {
      definedTypes.add(node.name.text)
    } else if (ts.isTypeAliasDeclaration(node) && node.name) {
      definedTypes.add(node.name.text)
    } else if (ts.isTypeReferenceNode(node) && node.name) {
      usedTypes.add(node.name.text)
    } else if (ts.isExportAssignment(node)) {
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  const unused: string[] = []
  for (const type of definedTypes) {
    if (!usedTypes.has(type)) {
      unused.push(type)
    }
  }

  return unused
}

export function findUnusedVariables(sourceFile: ts.SourceFile): string[] {
  const declaredVariables = new Set<string>()
  const usedVariables = new Set<string>()

  function visit(node: ts.Node): void {
    if (ts.isVariableDeclaration(node) && node.name) {
      declaredVariables.add(node.name.getText())
    } else if (ts.isIdentifier(node)) {
      usedVariables.add(node.getText())
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  const unused: string[] = []
  for (const variable of declaredVariables) {
    if (!usedVariables.has(variable)) {
      unused.push(variable)
    }
  }

  return unused
}

export function analyzeComplexity(sourceFile: ts.SourceFile): {
  functions: { name: string; complexity: number }[]
} {
  const functionComplexity: { name: string; complexity: number }[] = []

  function calculateComplexity(node: ts.Node): number {
    let complexity = 1
    
    if (ts.isIfStatement(node)) complexity++
    if (ts.isForStatement(node)) complexity++
    if (ts.isWhileStatement(node)) complexity++
    if (ts.isCaseClause(node)) complexity++
    if (ts.isConditionalExpression(node)) complexity++

    return complexity
  }

  function visit(node: ts.Node): void {
    if (ts.isFunctionDeclaration(node) && node.name) {
      const name = node.name.text
      let totalComplexity = 1

      function countNodes(n: ts.Node): void {
        totalComplexity += calculateComplexity(n)
        ts.forEachChild(n, countNodes)
      }

      if (node.body) {
        countNodes(node.body)
      }

      functionComplexity.push({ name, complexity: totalComplexity })
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return { functions: functionComplexity }
}
