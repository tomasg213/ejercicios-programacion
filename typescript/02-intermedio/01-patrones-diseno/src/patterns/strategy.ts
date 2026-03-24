export interface SortStrategy<T> {
  sort(items: T[]): T[]
}

export class AscendingSort<T> implements SortStrategy<T> {
  sort(items: T[]): T[] {
    return [...items].sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
  }
}

export class DescendingSort<T> implements SortStrategy<T> {
  sort(items: T[]): T[] {
    return [...items].sort((a, b) => {
      if (a > b) return -1
      if (a < b) return 1
      return 0
    })
  }
}

export class RandomSort<T> implements SortStrategy<T> {
  sort(items: T[]): T[] {
    return [...items].sort(() => Math.random() - 0.5)
  }
}

export class Sorter<T> {
  private strategy: SortStrategy<T>

  constructor(strategy: SortStrategy<T>) {
    this.strategy = strategy
  }

  setStrategy(strategy: SortStrategy<T>): void {
    this.strategy = strategy
  }

  sort(items: T[]): T[] {
    return this.strategy.sort(items)
  }
}
