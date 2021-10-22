import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/гзвфеу-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(): Task[] {
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
