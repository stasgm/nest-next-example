import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/baseEntity';

import { User } from '../../users/interfaces/user.entity';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
  @ApiProperty()
  @Column()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TaskStatus })
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;

  // @ApiProperty()
  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
