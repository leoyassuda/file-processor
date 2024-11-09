import { OrderController } from '@controllers/orders/orderController';
import { InMemoryOrderRepository } from '@repositories/inMemoryOrderRepository';
import { FileParserUseCase } from '@use-cases/file/fileParserUseCase';
import { GetOrdersUseCase } from '@use-cases/order/getOrderFileUseCase';
import { ProcessOrderFileUseCase } from '@use-cases/order/processOrderFileUseCase';

export const makeOrderController = (): OrderController => {
  const orderRepository = new InMemoryOrderRepository(); //TODO: verificar se utilizar memória ou banco via docker
  const fileParser = new FileParserUseCase();

  const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
  const processOrderFileUseCase = new ProcessOrderFileUseCase(
    orderRepository,
    fileParser,
  );

  return new OrderController(getOrdersUseCase, processOrderFileUseCase);
};
