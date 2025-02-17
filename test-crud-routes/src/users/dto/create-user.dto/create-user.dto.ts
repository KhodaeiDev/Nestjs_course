import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsBoolean()
  isActive: boolean = false;
}
