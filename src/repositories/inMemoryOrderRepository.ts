import type { IOrderRepository } from '@domain-repositories/iOrderRepository';
import type { OrderFilter } from '@dtos/orderFilter';
import type { Order } from '@entities/order';

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  async saveOrders(orders: Order[]): Promise<void> {
    this.orders = orders;
  }

  async findOrders(filter?: OrderFilter): Promise<Order[]> {
    let filteredOrders = this.orders;

    if (filter?.id) {
      filteredOrders = filteredOrders.filter((order) => order.id === filter.id);
    }

    if (filter?.startDate) {
      filteredOrders = filteredOrders.filter(
        (order) => order.date >= filter.startDate!,
      );
    }

    if (filter?.endDate) {
      filteredOrders = filteredOrders.filter(
        (order) => order.date <= filter.endDate!,
      );
    }

    return filteredOrders;
  }
}
