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
    private repository: TasksRepository,
  ) {}

  find(getTasksFilterTaskDto: GetTasksFilterTaskDto): Promise<Task[]> {
    return this.repository.findMany(getTasksFilterTaskDto);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.repository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  addOne(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.repository.addOne(createTaskDto);
  }

  async updateOne(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    const newTask = { ...task, ...updateTaskDto };

    return await this.repository.save(newTask);
  }

  async deleteOne(id: string): Promise<void> {
    const res = await this.repository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
