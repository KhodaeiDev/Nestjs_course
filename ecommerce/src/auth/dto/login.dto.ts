import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsString()
  @Matches(/^.{11}$/, { message: 'فرمت شماره موبایل معتبر نیست' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
