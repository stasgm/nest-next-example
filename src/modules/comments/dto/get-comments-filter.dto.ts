import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetCommentsFilterCommentsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
