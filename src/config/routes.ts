import { type Express, Router } from 'express';
import { OrderRoutes } from '../routes/order.routes';

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use('/api', router);

  OrderRoutes.setup(router);
};
