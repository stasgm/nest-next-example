import { Repository, EntityRepository } from 'typeorm';
import { Discussion } from '../discussions/interfaces/discussion.entity';
import { User } from '../users/interfaces/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsFilterCommentsDto } from './dto/get-comments-filter.dto';
import { Comment } from './interfaces/comment.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  addOne(createCommentsDto: CreateCommentDto, discussion: Discussion, user: User): Promise<Comment> {
    const { body } = createCommentsDto;

    const comments = this.create({
      body,
      discussion,
      user,
    });

    return this.save(comments);
  }

  findMany(getCommentssFilterCommentsDto: GetCommentsFilterCommentsDto): Promise<Comment[]> {
    const { search, discussionId } = getCommentssFilterCommentsDto;

    const query = this.createQueryBuilder('comments')
      .innerJoinAndSelect('comments.discussion', 'd')
      .innerJoinAndSelect('comments.user', 'u');
    query.where({ discussion: discussionId });

    if (search) {
      query.andWhere('LOWER(comments.body) LIKE :search', {
        search: `%${search.toLocaleLowerCase()}%`,
      });
    }

    if (search) {
      query.andWhere('d.id = :discussionId', {
        search: discussionId,
      });
    }

    return query.getMany();
  }
}
