import type { OrderResponseDTO } from './orderResponseDTO';

export interface OrderByUserResponseDTO {
  user_id: number;
  name: string;
  orders?: OrderResponseDTO[];
}
