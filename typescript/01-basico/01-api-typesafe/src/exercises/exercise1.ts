import { ApiResponse } from '../types/api'

// Exercise 1: Extract the data type from ApiResponse
// Expected: type DataType = User
export type ExtractData<T> = T extends ApiResponse<infer D> ? D : never

// Test
type User = { id: number; name: string }
type TestResponse = ApiResponse<User>
type ExtractedUser = ExtractData<TestResponse>
// Should be: type ExtractedUser = User
