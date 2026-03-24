import { logged } from './decorators/logged'
import { cached, clearCache } from './decorators/cached'
import { retry } from './decorators/retry'
import { debounce } from './decorators/debounce'
import { rateLimit } from './decorators/rateLimit'

class UserService {
  @logged
  getUser(id: string): string {
    return `User ${id}`
  }

  @cached({ ttl: 5000 })
  fetchUserData(id: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => resolve(`Data for ${id}`), 100)
    })
  }

  @debounce({ delay: 300 })
  search(query: string): void {
    console.log(`Searching: ${query}`)
  }
}

class ApiService {
  @retry({ maxAttempts: 3, delay: 500 })
  async fetchData(): Promise<string> {
    throw new Error('Network error')
  }

  @rateLimit({ maxCalls: 3, windowMs: 10000 })
  submitForm(data: string): string {
    return `Submitted: ${data}`
  }
}

async function main() {
  const userService = new UserService()
  console.log(userService.getUser('1'))

  console.log(await userService.fetchUserData('1'))
  console.log(await userService.fetchUserData('1'))

  const apiService = new ApiService()
  try {
    await apiService.fetchData()
  } catch (e: any) {
    console.log('Expected error:', e.message)
  }

  console.log(apiService.submitForm('form1'))
  console.log(apiService.submitForm('form2'))
  console.log(apiService.submitForm('form3'))
  
  try {
    console.log(apiService.submitForm('form4'))
  } catch (e: any) {
    console.log('Rate limit error:', e.message)
  }
}

main()
