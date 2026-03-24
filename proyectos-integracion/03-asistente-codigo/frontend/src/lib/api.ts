import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({ baseURL: API_URL })

export const chat = {
  send: (message: string, code?: string, sessionId?: string) => 
    api.post('/chat/message', { message, code, session_id: sessionId }),
  history: (sessionId: string) => api.get(`/chat/history/${sessionId}`),
  clear: (sessionId: string) => api.delete(`/chat/history/${sessionId}`),
}

export const analyze = {
  code: (code: string, language: string) => api.post('/analyze', { code, language }),
  performance: (code: string, language: string) => api.post('/analyze/performance', { code, language }),
  security: (code: string, language: string) => api.post('/analyze/security', { code, language }),
}

export const review = {
  code: (code: string, language: string) => api.post('/review', { code, language }),
  explain: (code: string) => api.post('/review/explain', { code }),
  refactor: (code: string) => api.post('/review/refactor', { code }),
  generateTest: (code: string) => api.post('/review/generate-test', { code }),
}
