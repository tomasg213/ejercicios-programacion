export class Singleton<T extends new () => InstanceType<T>, InstanceType<T>> {
  private static instances = new Map<Function, any>()

  static getInstance<T>(constructor: { new (): T }): T {
    if (!Singleton.instances.has(constructor)) {
      Singleton.instances.set(constructor, new constructor())
    }
    return Singleton.instances.get(constructor)
  }
}

export class Database {
  private connection: string = 'default'

  private constructor() {}

  query(sql: string): string {
    return `Executing: ${sql}`
  }

  connect(): void {
    this.connection = 'connected'
  }
}

export const db = Singleton.getInstance(Database)
