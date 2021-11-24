import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { GetDiscussionsFilterDiscussionDto } from './dto/get-discussions-filter.dto';
import { DiscussionsRepository } from './discussions.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Discussion } from './interfaces/discussion.entity';
import { User } from '../users/interfaces/user.entity';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectRepository(DiscussionsRepository)
    private readonly discussionRepository: DiscussionsRepository,
  ) {}

  getAll(getDiscussionsFilterDiscussionDto: GetDiscussionsFilterDiscussionDto, user: User): Promise<Discussion[]> {
    return this.discussionRepository.findMany(getDiscussionsFilterDiscussionDto, user);
  }

  async getById(id: string, user: User): Promise<Discussion> {
    const discussion = await this.discussionRepository.findOne({ where: { id, user } });

    if (!discussion) {
      throw new NotFoundException(`Discussion with ID "${id}" not found`);
    }

    return discussion;
  }

  create(createDiscussionDto: CreateDiscussionDto, user: User): Promise<Discussion> {
    return this.discussionRepository.addOne(createDiscussionDto, user);
  }

  async updateById(id: string, updateDiscussionDto: UpdateDiscussionDto, user: User): Promise<Discussion> {
    const discussion = await this.getById(id, user);

    const newDiscussion = { ...discussion, ...updateDiscussionDto };

    return await this.discussionRepository.save(newDiscussion);
  }

  async deleteById(id: string, user: User): Promise<void> {
    const res = await this.discussionRepository.delete({ id, user });

    if (res.affected === 0) {
      throw new NotFoundException(`Discussion with ID "${id}" not found`);
    }
  }
}
