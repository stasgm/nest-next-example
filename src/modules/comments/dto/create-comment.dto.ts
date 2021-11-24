import { PickType } from '@nestjs/swagger';
import { Comment } from '../interfaces/comment.entity';

export class CreateCommentDto extends PickType(Comment, ['title', 'body'] as const) {}
