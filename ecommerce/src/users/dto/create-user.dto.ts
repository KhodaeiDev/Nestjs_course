import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import userRoleEnum from '../enums/userRoleEnum';
import { Transform } from 'class-transformer';

export class CreateUserDto {
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
  password: string;

  @IsEnum(userRoleEnum)
  @IsOptional()
  role: userRoleEnum;
}
