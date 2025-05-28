import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import userRoleEnum from '../enums/userRoleEnum';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  name: string;

  @IsEnum(userRoleEnum)
  @IsOptional()
  role: userRoleEnum;
}
