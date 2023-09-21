import { OrderService } from './OrderService'

class OrderController {
  private orderService: OrderService

  constructor() {
    this.orderService = new OrderService()
  }

  @Controller()
  public async getOne(@Params pathParameters): Promise<HttpResponse> {
    const orderId = pathParameters.id
    return this.orderService.getOne(orderId)
  }
}

const controller = new OrderController()
export const getOne = controller.getOne.bind(controller)
