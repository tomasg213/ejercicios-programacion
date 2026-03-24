import { useState } from 'react'
import { posts, ai } from '../lib/api'

export default function Editor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiResult, setAiResult] = useState('')

  const handleSave = async () => {
    setLoading(true)
    try {
      await posts.create({ title, content, tags: tags.split(',').map(t => t.trim()) })
      alert('Post saved!')
    } catch (e) {
      alert('Error saving post')
    }
    setLoading(false)
  }

  const handleAiAction = async (action: string) => {
    setLoading(true)
    setAiResult('')
    try {
      let res
      if (action === 'summary') res = await ai.summary(content)
      else if (action === 'tags') res = await ai.tags(title, content)
      else if (action === 'improve') res = await ai.improve(content)
      setAiResult(res.data[action] || res.data.suggestions || res.data.improved || res.data.tags)
    } catch (e) {
      alert('AI error')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Write a Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-xl font-bold"
      />
      <textarea
        placeholder="Write your post in Markdown..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 p-2 border rounded mb-4 font-mono"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="flex gap-4 mb-4">
        <button onClick={handleSave} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Saving...' : 'Save Draft'}
        </button>
        <button onClick={() => handleAiAction('summary')} disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded">
          AI Summary
        </button>
        <button onClick={() => handleAiAction('tags')} disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded">
          AI Tags
        </button>
        <button onClick={() => handleAiAction('improve')} disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded">
          Improve
        </button>
      </div>
      {aiResult && (
        <div className="bg-purple-50 p-4 rounded">
          <h3 className="font-bold mb-2">AI Result</h3>
          <pre className="whitespace-pre-wrap">{aiResult}</pre>
        </div>
      )}
    </div>
  )
}
