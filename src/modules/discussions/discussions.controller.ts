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
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { GetDiscussionsFilterDiscussionDto } from './dto/get-discussions-filter.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { Discussion } from './interfaces/discussion.entity';
import { DiscussionsService } from './discussions.service';
import { Comment } from '../comments/interfaces/comment.entity';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { GetCommentsFilterCommentsDto } from '../comments/dto/get-comments-filter.dto';

@Controller('discussions')
@ApiTags('Discussions')
@UseGuards(AuthGuard('jwt'))
export class DiscussionsController {
  private readonly logger = new Logger('DiscussionController');

  constructor(
    private readonly discussionService: DiscussionsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [Discussion] })
  @ApiBearerAuth()
  getAll(
    @Query() getDiscussionsFilterDiscussionDto: GetDiscussionsFilterDiscussionDto,
    @GetUser() user: User,
  ): Promise<Discussion[]> {
    this.logger.verbose(
      `User "${user?.username}" retrieving all discussions. Filters: ${JSON.stringify(
        getDiscussionsFilterDiscussionDto,
      )}`,
    );
    return this.discussionService.getAll(getDiscussionsFilterDiscussionDto, user);
  }

  @Get(':id')
  @ApiOkResponse({ type: Discussion })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  getById(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() user: User): Promise<Discussion> {
    return this.discussionService.getById(id, user);
  }

  @Post()
  @ApiCreatedResponse({ type: Discussion })
  @ApiBearerAuth()
  create(@Body() createDiscussionDto: CreateDiscussionDto, @GetUser() user: User): Promise<Discussion> {
    return this.discussionService.create(createDiscussionDto, user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Discussion })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDiscussionDto: UpdateDiscussionDto,
    @GetUser() user: User,
  ): Promise<Discussion> {
    return this.discussionService.updateById(id, updateDiscussionDto, user);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  deleteById(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() user: User): Promise<void> {
    return this.discussionService.deleteById(id, user);
  }

  //** Comments */

  @Get(':discussionId/comments')
  @ApiOkResponse({ type: [Comment] })
  @ApiParam({ name: 'discussionId', required: true })
  @ApiBearerAuth()
  async getAllCommentsByDiscussionId(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() getCommentsFilterCommentsDto: GetCommentsFilterCommentsDto,
    @GetUser() user: User,
  ): Promise<Comment[]> {
    const discussion: Discussion = await this.getById(id, user);
    return this.commentsService.getAll(getCommentsFilterCommentsDto, user, discussion);
  }

  @Get(':discussionId/comments/:commentId')
  @ApiOkResponse({ type: Comment })
  @ApiParam({ name: 'discussionId', required: true })
  @ApiBearerAuth()
  async getCommentByIdAndByDiscussionId(
    @Param('discussionId', new ParseUUIDPipe()) discussionId: string,
    @Param('commentId', new ParseUUIDPipe()) commentId: string,
    @Query() getCommentsFilterCommentsDto: GetCommentsFilterCommentsDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    // const discussion: Discussion = await this.getById(id, user);
    return this.commentsService.getById(commentId, user);
  }

  @Post(':id/comments')
  @ApiCreatedResponse({ type: Comment })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ required: true })
  async createComment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    const discussion: Discussion = await this.getById(id, user);
    return this.commentsService.create(createCommentDto, user, discussion);
  }
}
