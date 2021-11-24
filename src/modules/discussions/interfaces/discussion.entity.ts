import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Comment } from '../../comments/interfaces/comment.entity';
import { BaseEntity } from '../../shared/baseEntity';

import { User } from '../../users/interfaces/user.entity';
import { DiscussionStatus } from './discussion-status.enum';

@Entity()
export class Discussion extends BaseEntity {
  @ApiProperty()
  @Column()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ enum: DiscussionStatus })
  @Column({
    type: 'enum',
    enum: DiscussionStatus,
    default: DiscussionStatus.OPEN,
  })
  status: DiscussionStatus;

  @ManyToOne(() => User, (user) => user.discussions, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @Exclude()
  @ManyToOne(() => Comment, (comment) => comment.discussion, { eager: true })
  comments: Comment[];
}
