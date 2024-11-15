import type { Order } from './order';

export class User {
  constructor(
    public id: number,
    public name: string,
    public orders?: Order[],
  ) {}
}
