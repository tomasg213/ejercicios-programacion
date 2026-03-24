export interface Observer<T> {
  update(data: T): void
}

export interface Subject<T> {
  subscribe(observer: Observer<T>): () => void
  unsubscribe(observer: Observer<T>): void
  notify(data: T): void
}

export class EventEmitter<T> implements Subject<T> {
  private observers: Set<Observer<T>> = new Set()

  subscribe(observer: Observer<T>): () => void {
    this.observers.add(observer)
    return () => this.unsubscribe(observer)
  }

  unsubscribe(observer: Observer<T>): void {
    this.observers.delete(observer)
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data))
  }
}

export class UserObserver implements Observer<{ userId: string; action: string }> {
  update(data: { userId: string; action: string }): void {
    console.log(`User ${data.userId} performed: ${data.action}`)
  }
}
