import type { IOrderRepository } from '@domain-repositories/iOrderRepository';
import type { FileInputLineDTO } from '@dtos/fileInputDto';
import type { Order } from '@entities/order';
import type { FileParserUseCase } from '@use-cases/file/fileParserUseCase';

export class ProcessOrderFileUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly fileParser: FileParserUseCase,
  ) {}

  async execute(fileContent: string): Promise<void> {
    const parsedLines = this.fileParser.parseFile(fileContent);
    const orders = this.transformToOrders(parsedLines);
    await this.orderRepository.saveOrders(orders);
  }

  private transformToOrders(lines: FileInputLineDTO[]): Order[] {
    const orders: Order[] = [];

    for (const line of lines) {
      const existingOrder = orders.find(
        (order) => order.userId === line.userId && order.id === line.orderId,
      );
      if (existingOrder) {
        existingOrder.products.push({ id: line.productId, value: line.value });
        existingOrder.total += line.value;
      } else {
        const newOrder = {
          id: line.orderId,
          userId: line.userId,
          userName: line.userName,
          total: line.value,
          date: line.date,
          products: [{ id: line.productId, value: line.value }],
        };
        orders.push(newOrder);
      }
    }

    return orders;
  }
}
