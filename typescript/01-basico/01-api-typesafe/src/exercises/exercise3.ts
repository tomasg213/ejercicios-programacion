import { ApiResponse } from '../types/api'

// Exercise 3: Type Guards for API responses

export function isSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.status >= 200 && response.status < 300 && 'data' in response
}

export function isError<T>(response: ApiResponse<T>): response is ApiResponse<T> & { error: string } {
  return 'error' in response
}

export function assertSuccess<T>(response: ApiResponse<T>): T {
  if (!isSuccess(response)) {
    throw new Error(response.error ?? 'Unknown error')
  }
  return response.data!
}

// Test
const response: ApiResponse<{ id: number }> = {
  data: { id: 1 },
  status: 200,
  timestamp: new Date()
}

if (isSuccess(response)) {
  console.log(response.data.id) // Should work
}
