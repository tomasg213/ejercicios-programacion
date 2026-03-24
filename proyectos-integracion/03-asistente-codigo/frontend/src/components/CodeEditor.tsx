import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  initialCode?: string
  language?: string
  onChange?: (code: string) => void
}

export default function CodeEditor({ initialCode = '', language = 'javascript', onChange }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  const handleChange = (value: string | undefined) => {
    const newCode = value || ''
    setCode(newCode)
    onChange?.(newCode)
  }

  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}
