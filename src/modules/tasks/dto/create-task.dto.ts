import { PickType } from '@nestjs/swagger';
import { Task } from '../interfaces/task.entity';

export class CreateTaskDto extends PickType(Task, ['title', 'description'] as const) {}
