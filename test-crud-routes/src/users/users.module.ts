import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Class } from './entities/class.entity/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Class])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
