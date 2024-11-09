import type { Product } from './product';

export class Order {
  constructor(
    public id: number,
    public userId: number,
    public userName: string,
    public products: Product[],
    public total: number,
    public date: Date,
  ) {}
}
