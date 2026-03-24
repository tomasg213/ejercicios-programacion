import * as ts from 'typescript'

export function renameVariable(
  sourceFile: ts.SourceFile,
  oldName: string,
  newName: string
): string {
  const renameScope = ts.getRenameLocation 编辑器

  const renameInfos: { node: ts.Identifier; kind: ts.SyntaxKind }[] = []

  function visit(node: ts.Node): void {
    if (ts.isIdentifier(node) && node.text === oldName) {
      renameInfos.push({ node, kind: node.kind })
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  const newSourceText = sourceFile.getFullText()
  let result = newSourceText

  const sortedInfos = renameInfos.reverse()
  
  for (const info of sortedInfos) {
    const start = info.node.getStart()
    const end = info.node.getEnd()
    result = result.slice(0, start) + newName + result.slice(end)
  }

  return result
}

export function findReferences(
  sourceFile: ts.SourceFile,
  symbolName: string
): ts.Identifier[] {
  const references: ts.Identifier[] = []

  function visit(node: ts.Node): void {
    if (ts.isIdentifier(node) && node.text === symbolName) {
      references.push(node)
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return references
}
