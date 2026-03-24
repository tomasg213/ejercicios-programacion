export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
  timestamp: Date
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
}

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  created_at: string
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
  published: boolean
}
