import { IsString, Min } from 'class-validator';
import projectStatusEnum from '../enums/projectStatusEnum';

export class CreateProjectDto {
  @IsString()
  name: string;

  status: projectStatusEnum;
}
