import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import tasksStatusEnum from '../enums/taskStatusEnum';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: tasksStatusEnum, default: tasksStatusEnum.Set })
  status: tasksStatusEnum;
}
