import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, Logger, Patch } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/interfaces/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './interfaces/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('Tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  private readonly logger = new Logger('TaskController');

  constructor(private readonly taskService: TasksService) {}

  @Get()
  @ApiOkResponse({ type: [Task] })
  @ApiBearerAuth()
  getAll(@Query() getTasksFilterTaskDto: GetTasksFilterTaskDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(getTasksFilterTaskDto)}`,
    );
    return this.taskService.getAll(getTasksFilterTaskDto, user);
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  getById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getById(id, user);
  }

  @Post()
  @ApiCreatedResponse({ type: Task })
  @ApiBearerAuth()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.taskService.create(createTaskDto, user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Task })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  updateById(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.taskService.updateById(id, updateTaskDto, user);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  deleteById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteById(id, user);
  }
}
