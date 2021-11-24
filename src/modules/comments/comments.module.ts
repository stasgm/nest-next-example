import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository]), AuthModule],
  controllers: [],
  providers: [CommentsService],
})
export class CommentsModule {}
