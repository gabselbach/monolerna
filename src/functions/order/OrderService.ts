import { Service } from '@monorepo/sdk'
import { Order, OrderModel } from './Order'

export class OrderService extends Service<Order> {
  constructor() {
    super(OrderModel)
  }

  public async getOne(_id: string): Promise<any> {
    return await super.getOne({ _id: '64dd1b7e6e2e75000850223d' })
  }
}
