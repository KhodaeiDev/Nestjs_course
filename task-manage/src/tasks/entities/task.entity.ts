import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import tasksStatusEnum from '../enums/taskStatusEnum';
import { Project } from 'src/projects/entities/project.entity';

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

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
