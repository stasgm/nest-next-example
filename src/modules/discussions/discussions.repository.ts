import { Repository, EntityRepository } from 'typeorm';
import { User } from '../users/interfaces/user.entity';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { GetDiscussionsFilterDiscussionDto } from './dto/get-discussions-filter.dto';
import { DiscussionStatus } from './interfaces/discussion-status.enum';
import { Discussion } from './interfaces/discussion.entity';

@EntityRepository(Discussion)
export class DiscussionsRepository extends Repository<Discussion> {
  addOne(createDiscussionDto: CreateDiscussionDto, user: User): Promise<Discussion> {
    const { title, body } = createDiscussionDto;

    const discussion = this.create({
      title,
      body,
      status: DiscussionStatus.OPEN,
      user,
    });

    return this.save(discussion);
  }

  findMany(getDiscussionsFilterDiscussionDto: GetDiscussionsFilterDiscussionDto, user: User): Promise<Discussion[]> {
    const { search, status } = getDiscussionsFilterDiscussionDto;

    const query = this.createQueryBuilder('discussion');

    query.where({ user });

    if (status) {
      query.andWhere('discussion.status = :status', { status });
    }

    if (search) {
      query.andWhere('(LOWER(discussion.title) LIKE :search OR LOWER(discussion.description) LIKE :search)', {
        search: `%${search.toLocaleLowerCase()}%`,
      });
    }

    return query.getMany();
  }
}
