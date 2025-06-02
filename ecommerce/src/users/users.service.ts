import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);

      await this.userRepository.save(user);

      user.password = undefined;
      return user;
    } catch (err) {
      console.log(err);

      throw new BadRequestException('Error in create User');
    }
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`کاربر با آیدی ${id} پیدا نشد`);
    }

    return user;
  }

  async findOneByMobile(mobile: string) {
    const user = await this.userRepository.findOneBy({ mobile });
    if (!user) {
      throw new NotFoundException('کاربر با مشخصات فوق پیدا نشد');
    }

    return user;
  }

  async existMobile(mobile: string) {
    const user = await this.userRepository.findOneBy({ mobile });
    if (user) {
      throw new BadRequestException('Mobile phone has already exist');
    }

    return true;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const updateUser = await this.userRepository.update(id, updateUserDto);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    await this.userRepository.delete(id);
  }
}
