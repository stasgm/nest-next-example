import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
// export class UpdateTaskDto {
//   @ApiProperty()
//   @IsOptional()
//   title?: string;

//   @ApiProperty()
//   @IsOptional()
//   description?: string;

//   @ApiProperty()
//   @IsOptional()
//   @IsEnum(TaskStatus)
//   status?: TaskStatus;
// }
