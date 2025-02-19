import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import StatusEnum from '../enums/statusEnums';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.enable })
  status: StatusEnum;
}
