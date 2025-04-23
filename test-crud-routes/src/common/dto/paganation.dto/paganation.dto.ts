import { IsOptional, IsPositive } from 'class-validator';

export class PaganationDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
