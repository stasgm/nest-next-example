import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Comment } from '../interfaces/comment.entity';

export class CreateCommentDto extends PickType(Comment, ['body'] as const) {
  @ApiProperty()
  @IsNotEmpty()
  readonly discussionId: string;
}
