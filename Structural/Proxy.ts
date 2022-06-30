interface IPaymentApi {
  getPaymentDetail(id: number): IPaymentDetail | undefined
}

interface IPaymentDetail {
  id: number
  sum: number
}

class PaymentApi implements IPaymentApi {
  private data: IPaymentDetail[] = [{ id: 1, sum: 10000 }]

  getPaymentDetail(id: number): IPaymentDetail | undefined {
    return this.data.find((t) => t.id === id)
  }
}

class PaymentApiProxy implements IPaymentApi {
  private acessesUsers: number[] = [1, 2]
  constructor(private api: PaymentApi, private userId: number) {}

  getPaymentDetail(id: number): IPaymentDetail | undefined {
    if (this.acessesUsers.includes(this.userId)) {
      return this.api.getPaymentDetail(id)
    } else {
      console.log('Попытка получить данные платежа')
      return
    }
  }
}
