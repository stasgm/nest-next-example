import { Injectable } from '@nestjs/common';
import { AppRepository } from '../app.repository';
import { Task } from './tasks.model';

@Injectable()
export class TaskRepository extends AppRepository<Task> {
  constructor() {
    super('tasks');
  }
}
