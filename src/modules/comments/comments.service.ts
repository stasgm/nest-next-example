import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetCommentsFilterCommentsDto } from './dto/get-comments-filter.dto';
import { CommentsRepository } from './comments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './interfaces/comment.entity';
import { User } from '../users/interfaces/user.entity';
import { DiscussionsService } from '../discussions/discussions.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private readonly commentRepository: CommentsRepository,
    private readonly discussionService: DiscussionsService,
  ) {}

  async getAll(getCommentsFilterCommentDto: GetCommentsFilterCommentsDto): Promise<Comment[]> {
    return this.commentRepository.findMany(getCommentsFilterCommentDto);
  }

  async getById(id: string, user: User): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id, user } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }

    return comment;
  }

  async create(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const discussion = await this.discussionService.getById(createCommentDto.discussionId, user);
    return this.commentRepository.addOne(createCommentDto, discussion, user);
  }

  async updateById(id: string, updateCommentDto: UpdateCommentDto, user: User): Promise<Comment> {
    const comment = await this.getById(id, user);

    const newComment = { ...comment, ...updateCommentDto };

    return await this.commentRepository.save(newComment);
  }

  async deleteById(id: string, user: User): Promise<void> {
    const res = await this.commentRepository.delete({ id, user });

    if (res.affected === 0) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
  }
}
