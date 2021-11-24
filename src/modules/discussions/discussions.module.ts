import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscussionsRepository } from './discussions.repository';
import { DiscussionsController } from './discussions.controller';
import { DiscussionsService } from './discussions.service';
import { AuthModule } from '../auth/auth.module';
import { CommentsService } from '../comments/comments.service';
import { CommentsRepository } from '../comments/comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscussionsRepository]),
    TypeOrmModule.forFeature([CommentsRepository]),
    AuthModule,
  ],
  controllers: [DiscussionsController],
  providers: [DiscussionsService, CommentsService],
})
export class DiscussionsModule {}
