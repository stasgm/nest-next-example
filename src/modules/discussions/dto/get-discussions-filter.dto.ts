import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { DiscussionStatus } from '../interfaces/discussion-status.enum';

export class GetDiscussionsFilterDiscussionDto {
  @ApiPropertyOptional({
    type: DiscussionStatus,
  })
  @IsOptional()
  @IsEnum(DiscussionStatus)
  status?: DiscussionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
