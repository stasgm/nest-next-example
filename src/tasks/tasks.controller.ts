import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppController } from '../app.controller';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController extends AppController<Task> {
  constructor(private readonly tasksService: TasksService) {
    super(tasksService);
    // this.bookService = bookService;
  }

  @Get()
  findAll(@Query() getTasksFilterTaskDto: GetTasksFilterTaskDto): Promise<Task[]> {
    if (Object.keys(getTasksFilterTaskDto).length > 0) {
      return this.tasksService.findAllByFilter(getTasksFilterTaskDto);
    }
    return this.tasksService.list();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  addOne(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.addOne(createTaskDto);
  }

  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.updateOne(id, updateTaskDto);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteOne(id);
  }
}
