import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private readonly logger = new Logger('TaskController');

  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAll(@Query() getTasksFilterTaskDto: GetTasksFilterTaskDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(getTasksFilterTaskDto)}`,
    );
    return this.taskService.getAll(getTasksFilterTaskDto, user);
  }

  @Get(':id')
  getById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getById(id, user);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.taskService.create(createTaskDto, user);
  }

  @Put(':id')
  updateById(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.taskService.updateById(id, updateTaskDto, user);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteById(id, user);
  }
}
