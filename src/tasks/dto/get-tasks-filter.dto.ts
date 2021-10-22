import { TaskStatus } from '../tasks.model';

export class GetTasksFilterTaskDto {
  status?: TaskStatus;
  search?: string;
}
