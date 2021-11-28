import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';

import { User } from '../../users/interfaces/user.entity';
import { Discussion } from '../../discussions/interfaces/discussion.entity';
import { BaseEntity } from '../../shared/baseEntity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Comment extends BaseEntity {
  @ApiProperty()
  @Column()
  @IsNotEmpty()
  body: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(() => Discussion, (discussion) => discussion.comments, { eager: false })
  @Exclude({ toPlainOnly: true })
  discussion: Discussion;
}
