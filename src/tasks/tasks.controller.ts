import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAll(@Query() getTasksFilterTaskDto: GetTasksFilterTaskDto): Promise<Task[]> {
    return this.taskService.getAll(getTasksFilterTaskDto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Put('/:id')
  updateById(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateById(id, updateTaskDto);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteById(id);
  }
}
