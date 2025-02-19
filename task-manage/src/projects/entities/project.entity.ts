import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import projectStatusEnum from '../enums/projectStatusEnum';

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
}
