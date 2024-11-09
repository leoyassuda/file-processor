import type { OrderByUserResponseDTO } from '@dtos/orderByUserResponseDTO';
import type { User } from '@entities/user';
import { formatMoney } from '@utils/moneyUtils';

export function toResponse(users: User[]): OrderByUserResponseDTO[] {
  return users.map((user) => ({
    user_id: user.id,
    name: user.name,
    orders: user.orders?.map((order) => ({
      order_id: order.id,
      total: formatMoney(order.total),
      date: order.date,
      products: order.products.map((product) => ({
        product_id: product.id,
        value: formatMoney(product.value),
      })),
    })),
  }));
}
