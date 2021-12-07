import { PartialType, PickType } from '@nestjs/swagger';
import { Task } from '../interfaces/task.entity';

export class UpdateTaskDto extends PartialType(PickType(Task, ['title', 'description', 'status'] as const)) {}
