import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: '09141574097', description: 'شماره موبایل ' })
  @IsString()
  @Matches(/^.{11}$/, { message: 'فرمت شماره موبایل معتبر نیست' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
