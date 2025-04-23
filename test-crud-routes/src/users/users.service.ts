import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity/class.entity';
import { PaganationDto } from 'src/common/dto/paganation.dto/paganation.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async getAll(paganationQuery: PaganationDto): Promise<User[]> {
    const { limit, offset } = paganationQuery;

    return this.userRepository.find({
      relations: ['classes'],
      take: limit,
      skip: offset,
    });
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['classes'],
    });
  }

  async createUser(data: CreateUserDto) {
    const classes = await Promise.all(
      data.classes.map((name) => this.preloadClassByName(name)),
    );

    const newUser = this.userRepository.create({ ...data, classes });
    return await this.userRepository.save(newUser);
  }

  async preloadClassByName(className: string) {
    const existingClass = await this.classRepository.findOne({
      where: { name: className },
    });
    if (existingClass) {
      return existingClass;
    }

    const newClass = this.classRepository.create({ name: className });
    return await this.classRepository.save(newClass);
  }
}
