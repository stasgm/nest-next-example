import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Task } from '../../tasks/interfaces/task.entity';
import { Role } from './role.enum';
import { Exclude } from 'class-transformer';
import { Discussion } from '../../discussions/interfaces/discussion.entity';
import { Comment } from '../../comments/interfaces/comment.entity';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '../../shared/baseEntity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column()
  @Exclude()
  @IsNotEmpty()
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

  @Exclude()
  @OneToMany(() => Discussion, (discussion) => discussion.user, { eager: true })
  discussions: Discussion[];

  @Exclude()
  @OneToMany(() => Comment, (comment) => comment.user, { eager: true })
  comments: Comment[];
}
