import { ApiResponse } from '../types/api'

export function isSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.status >= 200 && response.status < 300 && response.data !== undefined
}

export function isError<T>(response: ApiResponse<T>): response is ApiResponse<T> & { error: string } {
  return response.error !== undefined
}

export function hasData<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.data !== undefined
}
