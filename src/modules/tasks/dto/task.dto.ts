import { Task } from '../interfaces/task.entity';
import { TaskStatus } from '../interfaces/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/interfaces/user.entity';
import { IsDateString } from 'class-validator';
import { Role } from '../../users/interfaces/role.enum';

export class TaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly status: TaskStatus;

  @ApiProperty()
  readonly user: User;

  @ApiProperty()
  @IsDateString()
  readonly createdAt: Date;

  @ApiProperty()
  @IsDateString()
  readonly updatedAt: Date;

  constructor(task: Task) {
    this.id = task.id;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.user = task.user;
  }
}
