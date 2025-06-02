import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import userRoleEnum from '../enums/userRoleEnum';
import { Address } from 'src/address/entities/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  mobile: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: userRoleEnum, default: userRoleEnum.User })
  role: userRoleEnum;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
