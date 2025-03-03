import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import projectStatusEnum from '../enums/projectStatusEnum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEnum(projectStatusEnum)
  @IsOptional()
  status: projectStatusEnum;
}
