import type { IOrderRepository } from '@domain-repositories/iOrderRepository';
import type { OrderFilter } from '@dtos/orderFilter';
import type { User } from '@entities/user';
import { toUsers } from '@mappers/users/userMapper';

export class GetOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(filter?: OrderFilter): Promise<User[]> {
    const orders = await this.orderRepository.findOrders(filter);
    return toUsers(orders);
  }
}
