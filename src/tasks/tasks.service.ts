import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  findAllByFilter(getTasksFilterTaskDto: GetTasksFilterTaskDto): Task[] {
    const { search, status } = getTasksFilterTaskDto;

    let tasks = this.findAll();

    if (search) {
      tasks = tasks.filter(
        (i) => i.title.includes(search) || i.description.includes(search),
      );
    }

    if (status) {
      tasks = tasks.filter((i) => i.status === status);
    }

    return tasks;
  }

  findOne(id: string): Task {
    return this.tasks.find((i) => i.id === id);
  }

  addOne(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateOne(id: string, updateTaskDto: UpdateTaskDto): Task {
    const idx = this.tasks.findIndex((i) => i.id === id);
    if (!(idx >= 0)) return;

    const task = { id, ...updateTaskDto };
    this.tasks[idx] = task;

    return task;
  }

  deleteOne(id: string): void {
    const idx = this.tasks.findIndex((i) => i.id === id);
    if (!(idx >= 0)) return;
    this.tasks.splice(idx, 1);
  }
}
