import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(@Query() getTasksFilterTaskDto: GetTasksFilterTaskDto): Task[] {
    if (Object.keys(getTasksFilterTaskDto).length > 0) {
      return this.tasksService.findAllByFilter(getTasksFilterTaskDto);
    }
    return this.tasksService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Task {
    const task = this.tasksService.findOne(id);
    if (task) return task;
  }

  @Post()
  addOne(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.addOne(createTaskDto);
  }

  @Put('/:id')
  updateOne(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateOne(id, updateTaskDto);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string): void {
    this.tasksService.deleteOne(id);
  }
}
