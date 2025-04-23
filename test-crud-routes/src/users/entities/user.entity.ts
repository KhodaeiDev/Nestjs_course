import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from './class.entity/class.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @JoinTable()
  @ManyToMany((type) => Class, (cls) => cls.student, { cascade: true })
  classes: Class[];
}
