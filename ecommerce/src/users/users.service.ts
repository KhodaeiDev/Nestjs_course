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
      const hashPassword = await bcrypt.hashSync(createUserDto.password, 12);

      const createUser = await this.userRepository.create({
        ...createUserDto,
        password: hashPassword,
      });

      await this.userRepository.save(createUser);

      createUser.password = undefined;
      return { user: createUser };
    } catch (err) {
      console.log(err);

      throw new BadRequestException('Error in create User');
    }
  }

  async findAll() {
    const users = await this.userRepository.find();

    return { users };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`کاربر با آیدی ${id} پیدا نشد`);
    }

    return { user };
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
