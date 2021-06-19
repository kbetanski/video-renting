import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  videoItemId: number;
}
