import { useState, useCallback } from 'react'
import CodeEditor from './components/CodeEditor'
import ChatPanel from './components/ChatPanel'
import AnalysisPanel from './components/AnalysisPanel'
import { chat, analyze, review } from './lib/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function App() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [messages, setMessages] = useState<Message[]>([])
  const [issues, setIssues] = useState<any[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async (message: string) => {
    setLoading(true)
    setMessages(prev => [...prev, { role: 'user', content: message }])
    try {
      const { data } = await chat.send(message, code)
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + e }])
    }
    setLoading(false)
  }

  const handleCommand = async (cmd: string) => {
    setLoading(true)
    try {
      let response
      switch (cmd) {
        case 'explain':
          response = await review.explain(code)
          break
        case 'refactor':
          response = await review.refactor(code)
          break
        case 'test':
          response = await review.generateTest(code)
          break
        case 'bug':
          response = await analyze.security(code, language)
          setIssues(response.data.issues || [])
          setSuggestions(response.data.suggestions || [])
          setLoading(false)
          return
        default:
          setLoading(false)
          return
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.explanation || response.data.refactored || response.data.tests }])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleAnalyze = async () => {
    setAnalyzing(true)
    try {
      const { data } = await analyze.code(code, language)
      setIssues(data.issues || [])
      setSuggestions(data.suggestions || [])
    } catch (e) {
      console.error(e)
    }
    setAnalyzing(false)
  }

  return (
    <div className="h-screen flex">
      <div className="w-1/2 h-full flex flex-col">
        <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
          <span className="font-bold">Code Editor</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-700 rounded px-2 py-1">
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
        <div className="flex-1">
          <CodeEditor initialCode={code} language={language} onChange={setCode} />
        </div>
      </div>
      <div className="w-1/4 h-full flex flex-col border-l">
        <ChatPanel messages={messages} onSend={handleSendMessage} onCommand={handleCommand} />
      </div>
      <div className="w-1/4 h-full flex flex-col border-l">
        <AnalysisPanel issues={issues} suggestions={suggestions} loading={analyzing} onAnalyze={handleAnalyze} />
      </div>
    </div>
  )
}
