export interface PaymentMethod {
  pay(amount: number): Promise<boolean>
  refund(transactionId: string): Promise<boolean>
}

export class CreditCard implements PaymentMethod {
  async pay(amount: number): Promise<boolean> {
    console.log(`Processing credit card payment: $${amount}`)
    return true
  }

  async refund(transactionId: string): Promise<boolean> {
    console.log(`Refunding credit card: ${transactionId}`)
    return true
  }
}

export class DebitCard implements PaymentMethod {
  async pay(amount: number): Promise<boolean> {
    console.log(`Processing debit card payment: $${amount}`)
    return true
  }

  async refund(transactionId: string): Promise<boolean> {
    console.log(`Refunding debit card: ${transactionId}`)
    return true
  }
}

export class PayPal implements PaymentMethod {
  async pay(amount: number): Promise<boolean> {
    console.log(`Processing PayPal payment: $${amount}`)
    return true
  }

  async refund(transactionId: string): Promise<boolean> {
    console.log(`Refunding PayPal: ${transactionId}`)
    return true
  }
}

export class PaymentFactory {
  static create(method: 'credit' | 'debit' | 'paypal'): PaymentMethod {
    switch (method) {
      case 'credit':
        return new CreditCard()
      case 'debit':
        return new DebitCard()
      case 'paypal':
        return new PayPal()
    }
  }
}
