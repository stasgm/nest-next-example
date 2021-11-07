import { Task } from '../interfaces/task.entity';
import { TaskStatus } from '../interfaces/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/user.entity';

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

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.user = task.user;
  }
}
