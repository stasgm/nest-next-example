import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get()
  findAll(@Query() getTasksFilterTaskDto: GetTasksFilterTaskDto): Promise<Task[]> {
    return this.service.find(getTasksFilterTaskDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.service.findOne(id);
  }

  @Post()
  addOne(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.service.addOne(createTaskDto);
  }

  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.service.updateOne(id, updateTaskDto);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string): Promise<void> {
    return this.service.deleteOne(id);
  }
}
