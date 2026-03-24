import { PaymentFactory } from './patterns/factory'
import { EventEmitter, UserObserver } from './patterns/observer'
import { Sorter, AscendingSort, DescendingSort } from './patterns/strategy'
import { Calculator } from './patterns/decorator'

async function main() {
  console.log('=== Factory Pattern ===')
  const payment = PaymentFactory.create('credit')
  await payment.pay(100)

  console.log('\n=== Observer Pattern ===')
  const emitter = new EventEmitter<{ userId: string; action: string }>()
  const observer = new UserObserver()
  emitter.subscribe(observer)
  emitter.notify({ userId: '1', action: 'login' })

  console.log('\n=== Strategy Pattern ===')
  const sorter = new Sorter<number>(new AscendingSort())
  console.log(sorter.sort([3, 1, 2]))
  
  sorter.setStrategy(new DescendingSort())
  console.log(sorter.sort([3, 1, 2]))

  console.log('\n=== Decorator Pattern ===')
  const calc = new Calculator()
  console.log(calc.add(2, 3))
  console.log(calc.divide(10, 2))
}

main()
