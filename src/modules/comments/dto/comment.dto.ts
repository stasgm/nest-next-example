import { Comment } from '../interfaces/comment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto extends Comment {
  // @ApiProperty()
  // readonly id: string;

  @ApiProperty()
  readonly discussionId: string;

  @ApiProperty()
  readonly userId: string;

  constructor(comment: Comment) {
    super();
    this.id = comment.id;
    this.body = comment.body;
    this.discussionId = comment.discussion.id;
    this.userId = comment.user.id;
  }
}
