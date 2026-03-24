import axios from 'axios'

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000'

const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const auth = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
}

export const posts = {
  list: (page?: number) => api.get('/posts', { params: { page } }),
  get: (slug: string) => api.get(`/posts/${slug}`),
  create: (data: any) => api.post('/posts', data),
  update: (id: string, data: any) => api.put(`/posts/${id}`, data),
  delete: (id: string) => api.delete(`/posts/${id}`),
}

export const comments = {
  list: (postId: string) => api.get(`/comments/${postId}`),
  create: (postId: string, data: any) => api.post(`/comments/${postId}`, data),
}

export const ai = {
  summary: (content: string) => api.post('/ai/summary', { content }),
  seo: (title: string, content: string) => api.post('/ai/seo', { title, content }),
  tags: (title: string, content: string) => api.post('/ai/tags', { title, content }),
  improve: (content: string) => api.post('/ai/improve', { content }),
}

export default api
