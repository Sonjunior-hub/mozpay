import { IsUUID } from 'class-validator';

export class BuyProductDto {
  @IsUUID()
  productId: string;
}