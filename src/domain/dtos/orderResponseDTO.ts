import type { ProductResponseDTO } from './productResponseDTO';

export interface OrderResponseDTO {
  order_id: number;
  total: string;
  date: Date;
  products?: ProductResponseDTO[];
}
