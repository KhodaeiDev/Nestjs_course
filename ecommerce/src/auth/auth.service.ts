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
    await this.usersService.existMobile(registerDto.mobile);

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    const createUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: userRoleEnum.User,
    });
    createUser.password = undefined;

    return createUser;
  }

  async login(loginDto: LoginDto, password: string) {
    const findUser = await this.usersService.findOneByMobile(loginDto.mobile);

    const confirmPassword = await bcrypt.compare(password, findUser.password);
    if (!confirmPassword) {
      throw new UnauthorizedException('اطلاعات شما صحیح نمی باشد');
    }

    const paylod = {
      mobile: findUser.mobile,
      role: findUser.role,
      id: findUser.id,
    };
    const token = this.jwtService.sign(paylod);

    return {
      accessToken: token,
    };
  }
}
