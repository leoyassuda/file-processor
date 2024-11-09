import type { OrderFilter } from '../dtos/orderFilter';
import type { Order } from '../entities/order';

export interface IOrderRepository {
  saveOrders(orders: Order[]): Promise<void>;
  findOrders(filter?: OrderFilter): Promise<Order[]>;
}
