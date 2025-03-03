import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import tasksStatusEnum from '../enums/taskStatusEnum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsEnum(tasksStatusEnum)
  @IsOptional()
  status: tasksStatusEnum;

  @IsNotEmpty()
  projectId: number;
}
