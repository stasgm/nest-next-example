import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Logger,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/interfaces/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsFilterCommentsDto } from './dto/get-comments-filter.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './interfaces/comment.entity';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
@ApiTags('Comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  private readonly logger = new Logger('CommentController');

  constructor(private readonly commentService: CommentsService, private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOkResponse({ type: [CommentDto] })
  @ApiBearerAuth()
  async getAll(
    @Query() getCommentsFilterCommentDto: GetCommentsFilterCommentsDto,
    @GetUser() user: User,
  ): Promise<CommentDto[]> {
    this.logger.verbose(
      `User "${user?.username}" retrieving all comments. Filters: ${JSON.stringify(getCommentsFilterCommentDto)}`,
    );
    const comments = await this.commentService.getAll(getCommentsFilterCommentDto);
    return comments.map((i) => new CommentDto(i));
  }

  @Get(':id')
  @ApiOkResponse({ type: CommentDto })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  async getById(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() user: User): Promise<CommentDto> {
    return new CommentDto(await this.commentService.getById(id, user));
  }

  // @Post()
  // @ApiCreatedResponse({ type: Comment })
  // @ApiBearerAuth()
  // create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User): Promise<Comment> {
  //   return this.commentService.create(createCommentDto, user);
  // }

  // @Patch(':id')
  // @ApiOkResponse({ type: Comment })
  // @ApiParam({ name: 'id', required: true })
  // @ApiBearerAuth()
  // updateById(
  //   @Param('id', new ParseUUIDPipe()) id: string,
  //   @Body() updateCommentDto: UpdateCommentDto,
  //   @GetUser() user: User,
  // ): Promise<Comment> {
  //   return this.commentService.updateById(id, updateCommentDto, user);
  // }

  @Delete(':id')
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  deleteById(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() user: User): Promise<void> {
    return this.commentService.deleteById(id, user);
  }

  //** Comments */

  // @Get(':id')
  // @ApiOkResponse({ type: [CommentDto] })
  // @ApiParam({ name: 'id', required: true })
  // @ApiBearerAuth()
  // async getAllCommentsByCommentId(
  //   @Param('id', new ParseUUIDPipe()) id: string,
  //   @Query() getCommentsFilterCommentsDto: GetCommentsFilterCommentsDto,
  //   @GetUser() user: User,
  // ): Promise<CommentDto[]> {
  //   const comment: Comment = await this.getById(id, user);
  //   return comment;
  // }

  // @Get(':id')
  // @ApiOkResponse({ type: Comment })
  // @ApiParam({ name: 'id', required: true })
  // @ApiBearerAuth()
  // async getCommentByIdAndByCommentId(
  //   @Param('commentId', new ParseUUIDPipe()) commentId: string,
  //   @Query() getCommentsFilterCommentsDto: GetCommentsFilterCommentsDto,
  //   @GetUser() user: User,
  // ): Promise<Comment> {
  //   // const comment: Comment = await this.getById(id, user);
  //   return this.commentsService.getById(commentId, user);
  // }

  @Post()
  @ApiCreatedResponse({ type: Comment })
  @ApiBearerAuth()
  @ApiBody({ required: true })
  async createComment(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User): Promise<Comment> {
    this.logger.verbose(
      `User "${user?.username}" retrieving add a new comment. Filters: ${JSON.stringify(createCommentDto)}`,
    );
    return this.commentsService.create(createCommentDto, user);
  }
}
