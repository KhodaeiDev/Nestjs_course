import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import userRoleEnum from 'src/users/enums/userRoleEnum';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: userRoleEnum.User,
    });
  }
}
