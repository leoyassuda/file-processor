import type { Order } from '@entities/order';
import { User } from '@entities/user';

export function toUsers(orders: Order[]): User[] {
  const users = new Array<User>();
  orders.forEach((order) => {
    users.push(new User(order.userId, order.userName, new Array<Order>()));
  });

  orders.forEach((order) => {
    const userOrders = users.find((user) => user.id === order.userId);
    if (userOrders) {
      userOrders.orders?.push(order);
    } else {
      users.push(new User(order.userId, order.userName, [order]));
    }
  });

  return users;
}
