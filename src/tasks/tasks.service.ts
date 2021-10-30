import {Injectable, NotFoundException} from '@nestjs/common';

// import { v4 as uuid } from 'uuid';
import {Task, TaskStatus} from './task.model';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {GetTasksFilterTaskDto} from './dto/get-tasks-filter.dto';
import {AppService} from '../app.service';
import {TaskRepository} from './task.repository';

@Injectable()
export class TasksService extends AppService<Task> {
  constructor(private readonly tasksRepository: TaskRepository) {
    super(tasksRepository);
    // this.tasksRepository = tasksRepository;
  }

  async findAllByFilter(getTasksFilterTaskDto: GetTasksFilterTaskDto): Promise<Task[]> {
    const {search, status} = getTasksFilterTaskDto;

    let tasks = await this.list();

    if (search) {
      tasks = tasks.filter((i) => i.title.includes(search) || i.description.includes(search));
    }

    if (status) {
      tasks = tasks.filter((i) => i.status === status);
    }

    return tasks;
  }

  async findOne(_id: string): Promise<Task> {
    const task = await this.detail(_id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${_id}" not found`);
    }

    return task;
  }

  addOne(createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, description} = createTaskDto;

    const task: Task = {
      // id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    const res = this.save(task);

    return res;
  }

  async updateOne(_id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.detail(_id);
    // const idx = this.tasks.findIndex((i) => i.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${_id}" not found`);
    }

    const newTask = {...task, ...updateTaskDto};

    const res = await this.update(_id, newTask);

    if (!res) return task;

    return newTask;
  }

  async deleteOne(_id: string): Promise<void> {
    const task = await this.detail(_id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${_id}" not found`);
    }

    this.delete(_id);
  }
}
