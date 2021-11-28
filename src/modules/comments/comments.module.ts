import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DiscussionsRepository } from '../discussions/discussions.repository';
import { DiscussionsService } from '../discussions/discussions.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsRepository]),
    TypeOrmModule.forFeature([DiscussionsRepository]),
    AuthModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, DiscussionsService],
})
export class CommentsModule {}
