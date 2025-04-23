import { ArrayNotEmpty, IsArray, IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsBoolean()
  isActive: boolean = false;

  @IsArray()
  @IsString({ each: true })
  classes: string[];
}
