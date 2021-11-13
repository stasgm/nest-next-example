import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Task } from '../../tasks/interfaces/task.entity';
import { Role } from './role.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @ApiProperty({ uniqueItems: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  // @ApiProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ enum: Role })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Exclude()
  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
