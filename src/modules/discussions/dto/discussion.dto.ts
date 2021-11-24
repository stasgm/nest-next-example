/* import { Discussion } from '../interfaces/discussion.entity';
import { DiscussionStatus } from '../interfaces/discussion-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/interfaces/user.entity';
import { IsDateString } from 'class-validator';
import { Role } from '../../users/interfaces/role.enum';

export class DiscussionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly status: DiscussionStatus;

  @ApiProperty()
  readonly user: User;

  @ApiProperty()
  @IsDateString()
  readonly createdAt: Date;

  @ApiProperty()
  @IsDateString()
  readonly updatedAt: Date;

  constructor(discussion: Discussion) {
    this.id = discussion.id;
    this.createdAt = discussion.createdAt;
    this.updatedAt = discussion.updatedAt;
    this.title = discussion.title;
    this.description = discussion.description;
    this.status = discussion.status;
    this.user = discussion.user;
  }
}
 */
