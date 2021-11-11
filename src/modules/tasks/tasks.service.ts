import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './interfaces/task.entity';
import { User } from '../users/interfaces/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly taskRepository: TasksRepository,
  ) {}

  getAll(getTasksFilterTaskDto: GetTasksFilterTaskDto, user: User): Promise<Task[]> {
    return this.taskRepository.findMany(getTasksFilterTaskDto, user);
  }

  async getById(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.addOne(createTaskDto, user);
  }

  async updateById(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.getById(id, user);

    const newTask = { ...task, ...updateTaskDto };

    return await this.taskRepository.save(newTask);
  }

  async deleteById(id: string, user: User): Promise<void> {
    const res = await this.taskRepository.delete({ id, user });

    if (res.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
