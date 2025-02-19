import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'task-managment',
      password: '',
      username: 'root',
      synchronize: true,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
    }),
    ProjectsModule,
    TasksModule,
  ],
})
export class AppModule {}
