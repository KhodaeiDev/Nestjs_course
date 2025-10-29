import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SensSmsDto {
  @IsArray()
  @IsNotEmpty()
  mobiles: string[];

  @IsString()
  text: string;
}
