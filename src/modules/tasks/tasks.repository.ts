import { Repository, EntityRepository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './interfaces/task-status.enum';
import { Task } from './entities/task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  addOne(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return this.save(task);
  }

  findMany(getTasksFilterTaskDto: GetTasksFilterTaskDto, user: User): Promise<Task[]> {
    const { search, status } = getTasksFilterTaskDto;

    const query = this.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)', {
        search: `%${search.toLocaleLowerCase()}%`,
      });
    }

    return query.getMany();
  }
}
