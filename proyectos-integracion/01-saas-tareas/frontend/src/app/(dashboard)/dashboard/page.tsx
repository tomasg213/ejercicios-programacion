'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { tasks as tasksApi, teams as teamsApi, ai } from '@/lib/api'

interface Task {
  id: string
  title: string
  description?: string
  priority: string
  column_id: string
  column_name: string
  assignee?: string
}

interface Team {
  id: string
  name: string
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [aiSuggestions, setAiSuggestions] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/login')
      return
    }
    loadTeams()
  }, [])

  useEffect(() => {
    if (selectedTeam) loadTasks()
  }, [selectedTeam])

  const loadTeams = async () => {
    try {
      const { data } = await teamsApi.list()
      setTeams(data)
      if (data.length > 0) setSelectedTeam(data[0].id)
    } catch {
      localStorage.clear()
      router.push('/login')
    }
  }

  const loadTasks = async () => {
    try {
      const { data } = await tasksApi.list(selectedTeam)
      setTasks(data)
    } catch (e) {
      console.error(e)
    }
  }

  const createTask = async () => {
    if (!newTaskTitle.trim()) return
    try {
      await tasksApi.create({ title: newTaskTitle, column_id: 'default', priority: 'medium' })
      setNewTaskTitle('')
      loadTasks()
    } catch (e) {
      console.error(e)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await tasksApi.delete(id)
      loadTasks()
    } catch (e) {
      console.error(e)
    }
  }

  const getAisuggestions = async () => {
    try {
      const { data } = await ai.suggestTasks(selectedTeam, '')
      setAiSuggestions(data.suggestions)
    } catch (e) {
      console.error(e)
    }
  }

  const columns = ['To Do', 'In Progress', 'Done']

  const getTasksByColumn = (col: string) => tasks.filter(t => t.column_name === col)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SaaS Tasks</h1>
          <div className="flex items-center gap-4">
            <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} className="border p-2 rounded">
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <button onClick={() => { localStorage.clear(); router.push('/login') }} className="text-red-600">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="New task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createTask()}
            className="flex-1 p-2 border rounded"
          />
          <button onClick={createTask} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Task</button>
          <button onClick={getAisuggestions} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">AI Suggestions</button>
        </div>

        {aiSuggestions && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold mb-2">AI Suggestions</h3>
            <pre className="whitespace-pre-wrap">{aiSuggestions}</pre>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {columns.map(col => (
            <div key={col} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold mb-4">{col}</h3>
              <div className="space-y-2">
                {getTasksByColumn(col).map(task => (
                  <div key={task.id} className="bg-white p-3 rounded shadow-sm">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.priority}</p>
                    <button onClick={() => deleteTask(task.id)} className="text-red-500 text-sm mt-2">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
