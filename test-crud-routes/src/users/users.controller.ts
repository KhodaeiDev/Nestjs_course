import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { MobilePipe } from 'src/pipes/validation/mobile/mobile.pipe';
import { get } from 'http';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): object {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: number): object {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }
}
