import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatPanelProps {
  messages: Message[]
  onSend: (message: string) => void
  onCommand: (cmd: string) => void
}

export default function ChatPanel({ messages, onSend, onCommand }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const commands = ['/explain', '/refactor', '/test', '/bug', '/docs']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const cmd = commands.find(c => input.startsWith(c))
    if (cmd) {
      onCommand(cmd.replace('/', ''))
    } else {
      onSend(input)
    }
    setInput('')
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Start a conversation...</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`${msg.role === 'user' ? 'ml-auto bg-blue-600' : 'mr-auto bg-gray-700'} p-3 rounded-lg max-w-[80%]`}>
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message or /command..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Send</button>
        </div>
        <div className="mt-2 flex gap-2 text-xs text-gray-500">
          {commands.map(cmd => (
            <span key={cmd} className="cursor-pointer hover:text-white">{cmd}</span>
          ))}
        </div>
      </form>
    </div>
  )
}
