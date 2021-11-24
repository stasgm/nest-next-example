import { PickType } from '@nestjs/swagger';
import { Discussion } from '../interfaces/discussion.entity';

export class CreateDiscussionDto extends PickType(Discussion, ['title', 'body'] as const) {}
