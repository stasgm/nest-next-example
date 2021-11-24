import { Repository, EntityRepository } from 'typeorm';
import { Discussion } from '../discussions/interfaces/discussion.entity';
import { User } from '../users/interfaces/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsFilterCommentsDto } from './dto/get-comments-filter.dto';
import { Comment } from './interfaces/comment.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  addOne(createCommentsDto: CreateCommentDto, user: User, discussion: Discussion): Promise<Comment> {
    const { title, body } = createCommentsDto;

    const comments = this.create({
      body,
      title,
      discussion,
      user,
    });

    return this.save(comments);
  }

  findMany(
    getCommentssFilterCommentsDto: GetCommentsFilterCommentsDto,
    user: User,
    discussion: Discussion,
  ): Promise<Comment[]> {
    const { search } = getCommentssFilterCommentsDto;

    const query = this.createQueryBuilder('comments');

    query.where({ discussion: discussion.id });

    if (search) {
      query.andWhere('LOWER(comments.body) LIKE :search', {
        search: `%${search.toLocaleLowerCase()}%`,
      });
    }

    return query.getMany();
  }
}
