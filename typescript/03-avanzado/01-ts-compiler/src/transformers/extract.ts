import * as ts from 'typescript'

export interface ExtractionResult {
  originalCode: string
  newCode: string
  newMethodName: string
}

export function extractMethod(
  code: string,
  methodName: string,
  params: string[]
): ExtractionResult {
  const sourceFile = ts.createSourceFile(
    'sample.ts',
    code,
    ts.ScriptTarget.Latest,
    true
  )

  const newMethod = ts.factory.createMethodDeclaration(
    undefined,
    undefined,
    undefined,
    methodName,
    undefined,
    undefined,
    params.map(p => ts.factory.createParameterDeclaration(
      undefined,
      undefined,
      undefined,
      p,
      undefined,
      ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
    )),
    undefined,
    ts.factory.createBlock([
      ts.factory.createReturnStatement(
        ts.factory.createNumericLiteral(42)
      )
    ])
  )

  const printer = ts.createPrinter()
  const newMethodCode = printer.printNode(
    ts.EmitHint.Unspecified,
    newMethod,
    sourceFile
  )

  return {
    originalCode: code,
    newCode: newMethodCode,
    newMethodName: methodName
  }
}

export function findDuplicateCode(
  sourceFile: ts.SourceFile
): { start: number; end: number; text: string }[] {
  const blocks: Map<string, { start: number; end: number }> = new Map()

  function visit(node: ts.Node): void {
    if (ts.isBlock(node)) {
      const text = node.getText()
      const start = node.getStart()
      const end = node.getEnd()
      
      if (blocks.has(text)) {
        console.log('Duplicate block found:', text.substring(0, 50))
      } else {
        blocks.set(text, { start, end })
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  
  return Array.from(blocks.entries()).map(([text, pos]) => ({
    start: pos.start,
    end: pos.end,
    text
  }))
}
