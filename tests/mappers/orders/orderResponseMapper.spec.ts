import type { Order } from '@entities/order';
import type { Product } from '@entities/product';
import type { User } from '@entities/user';
import { toResponse } from '@mappers/orders/orderResponseMapper';
import { expect, test, describe } from 'bun:test';

describe('formatResponse', () => {
  test('should return the correct response', () => {
    const users = [
      {
        id: 1,
        name: 'User 1',
        orders: [
          {
            id: 11,
            userId: 1,
            userName: 'User 1',
            total: 1234.56,
            date: new Date(),
            products: [
              {
                id: 101,
                value: 10.99,
              },
              {
                id: 102,
                value: 11.99,
              },
            ] as Product[],
          },
        ] as Order[],
      },
    ] as User[];
    const response = toResponse(users);
    expect(response).toEqual([
      {
        user_id: 1,
        name: 'User 1',
        orders: [
          {
            order_id: 11,
            total: '1,234.56',
            date: expect.any(Date),
            products: [
              {
                product_id: 101,
                value: '10.99',
              },
              {
                product_id: 102,
                value: '11.99',
              },
            ],
          },
        ],
      },
    ]);
  });
});
