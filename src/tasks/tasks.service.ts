import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly taskRepository: TasksRepository,
  ) {}

  getAll(getTasksFilterTaskDto: GetTasksFilterTaskDto): Promise<Task[]> {
    return this.taskRepository.findMany(getTasksFilterTaskDto);
  }

  async getById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.addOne(createTaskDto);
  }

  async updateById(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getById(id);

    const newTask = { ...task, ...updateTaskDto };

    return await this.taskRepository.save(newTask);
  }

  async deleteById(id: string): Promise<void> {
    const res = await this.taskRepository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
