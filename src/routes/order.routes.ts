import { makeOrderController } from '@factories/makeOrderController';
import type { Router } from 'express';
import multer from 'multer';

export class OrderRoutes {
  public static setup(router: Router): void {
    const upload = multer();
    const orderController = makeOrderController();
    router.post('/orders/upload', upload.single('file'), (req, res) =>
      orderController.uploadFile(req, res),
    );

    router.get('/orders', (req, res) => orderController.findAll(req, res));
  }
}
