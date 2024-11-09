import { expect, describe, test, beforeEach, jest, mock } from 'bun:test';
import { ProcessOrderFileUseCase } from '@use-cases/order/processOrderFileUseCase';

import { FileParserUseCase } from '@use-cases/file/fileParserUseCase';
import { GetOrdersUseCase } from '@use-cases/order/getOrderFileUseCase';
import type { OrderFilter } from '@dtos/orderFilter';

describe('ProcessOrderFileUseCase', () => {
  let processOrderFileUseCase: ProcessOrderFileUseCase;
  let getOrderUseCase: GetOrdersUseCase;
  const fileParser = new FileParserUseCase();

  const mockOrderRepository = {
    saveOrders: jest.fn(),
    findOrders: jest.fn(),
  };

  const mockFileContent = `0000000056                              Jonathon Marvin00000006080000000001      1421.220211016`;
  let filter: OrderFilter;

  beforeEach(() => {
    jest.clearAllMocks();
    processOrderFileUseCase = new ProcessOrderFileUseCase(
      mockOrderRepository,
      fileParser,
    );
    getOrderUseCase = new GetOrdersUseCase(mockOrderRepository);
  });

  describe('execute process file', () => {
    test('should process the file content and return a list of users', async () => {
      mockOrderRepository.findOrders.mockResolvedValueOnce([
        {
          id: 608,
          userId: 56,
          userName: 'Jonathon Marvin',
          total: 1421.22,
          date: new Date('2021-10-16'),
          products: [
            {
              id: 1,
              value: 1421.22,
            },
          ],
        },
      ]);

      await processOrderFileUseCase.execute(mockFileContent);
      const result = await getOrderUseCase.execute(filter);
      expect(result).toEqual([
        {
          id: 56,
          name: 'Jonathon Marvin',
          orders: [
            {
              id: 608,
              userId: 56,
              userName: 'Jonathon Marvin',
              total: 1421.22,
              date: new Date('2021-10-16'),
              products: [
                {
                  id: 1,
                  value: 1421.22,
                },
              ],
            },
          ],
        },
      ]);
    });

    test('should handle empty file correctly', async () => {
      mockOrderRepository.findOrders.mockResolvedValue([]);

      await processOrderFileUseCase.execute('');
      const result = await getOrderUseCase.execute(filter);
      expect(result).toBeEmpty();
    });
  });
});
