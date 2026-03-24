export interface NewAPI {
  getUsers(): Promise<{ users: { id: string; name: string }[] }>
  getPosts(): Promise<{ posts: { id: string; title: string }[] }>
}

export interface OldAPI {
  getUsers(): Promise<string[]>
  getPosts(): Promise<string[]>
}

class UserAdapter implements OldAPI {
  constructor(private api: NewAPI) {}

  async getUsers(): Promise<string[]> {
    const result = await this.api.getUsers()
    return result.users.map(u => u.name)
  }

  async getPosts(): Promise<string[]> {
    const result = await this.api.getPosts()
    return result.posts.map(p => p.title)
  }
}

class PostAdapter implements OldAPI {
  constructor(private api: NewAPI) {}

  async getUsers(): Promise<string[]> {
    const result = await this.api.getUsers()
    return result.users.map(u => u.id)
  }

  async getPosts(): Promise<string[]> {
    const result = await this.api.getPosts()
    return result.posts.map(p => p.id)
  }
}

export function createAdapter<T extends NewAPI>(api: T, type: 'users' | 'posts'): OldAPI {
  if (type === 'users') {
    return new UserAdapter(api)
  }
  return new PostAdapter(api)
}
