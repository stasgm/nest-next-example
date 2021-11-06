import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterTaskDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;
}
