import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import projectStatusEnum from '../enums/projectStatusEnum';
import { Task } from 'src/tasks/entities/task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: projectStatusEnum,
    default: projectStatusEnum.Enable,
  })
  status: projectStatusEnum;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
