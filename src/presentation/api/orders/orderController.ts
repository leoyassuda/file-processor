import type { OrderFilter } from '@dtos/orderFilter';
import { toResponse } from '@mappers/orders/orderResponseMapper';
import type { GetOrdersUseCase } from '@use-cases/order/getOrderFileUseCase';
import type { ProcessOrderFileUseCase } from '@use-cases/order/processOrderFileUseCase';
import type { Request, Response } from 'express';

export class OrderController {
  constructor(
    private readonly getOrdersUseCase: GetOrdersUseCase,
    private readonly processOrderFileUseCase: ProcessOrderFileUseCase,
  ) {}

  async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      const fileContent = req.file?.buffer.toString();

      if (!fileContent) {
        res.status(400).json({
          success: false,
          error: 'No file content provided',
        });
        return;
      }

      await this.processOrderFileUseCase.execute(fileContent);

      res.status(200).json({
        success: true,
        message: 'File processed successfully',
      });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while processing file',
      });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const filter: OrderFilter = this.parseOrderFilter(req);
      let usersWithOrders = await this.getOrdersUseCase.execute(filter);
      let ordersResponse = toResponse(usersWithOrders);

      res.status(200).json({
        success: true,
        data: ordersResponse,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching orders',
      });
    }
  }

  private parseOrderFilter(req: Request): OrderFilter {
    return {
      id: req.query.orderId ? Number(req.query.orderId) : undefined,
      startDate: req.query.startDate
        ? new Date(req.query.startDate as string)
        : undefined,
      endDate: req.query.endDate
        ? new Date(req.query.endDate as string)
        : undefined,
    };
  }
}
