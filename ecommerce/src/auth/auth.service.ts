import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import userRoleEnum from 'src/users/enums/userRoleEnum';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    return await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: userRoleEnum.User,
    });
  }

  async login(loginDto: LoginDto, password: string) {
    const findUser = await this.usersService.findOneByMobile(loginDto.mobile);

    const confirmPassword = await bcrypt.compare(
      password,
      findUser.user.password,
    );
    if (!confirmPassword) {
      throw new UnauthorizedException('اطلاعات شما صحیح نمی باشد');
    }

    const paylod = {
      mobile: findUser.user.mobile,
      role: findUser.user.role,
      id: findUser.user.id,
    };
    const token = this.jwtService.sign(paylod);

    return {
      accessToken: token,
    };
  }
}
