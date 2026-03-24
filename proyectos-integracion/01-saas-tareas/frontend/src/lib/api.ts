import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, { refresh_token: refresh })
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('refresh_token', data.refresh_token)
          error.config.headers.Authorization = `Bearer ${data.access_token}`
          return api.request(error.config)
        } catch {
          localStorage.clear()
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export const auth = {
  register: (data: { email: string; password: string; name?: string }) => api.post('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
}

export const tasks = {
  list: (boardId?: string) => api.get('/tasks', { params: { board_id: boardId } }),
  create: (data: { title: string; description?: string; column_id: string; priority?: string }) => api.post('/tasks', data),
  update: (id: string, data: any) => api.put(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
  move: (id: string, column_id: string) => api.patch(`/tasks/${id}/move`, { column_id }),
}

export const teams = {
  list: () => api.get('/teams'),
  create: (data: { name: string }) => api.post('/teams', data),
  getMembers: (id: string) => api.get(`/teams/${id}/members`),
  addMember: (id: string, data: { user_email: string; role?: string }) => api.post(`/teams/${id}/members`, data),
}

export const ai = {
  suggestTasks: (board_id: string, context: string) => api.post('/ai/suggest-tasks', { board_id, context }),
  summarizeBoard: (board_id: string) => api.post('/ai/summarize-board', { board_id }),
}

export default api
