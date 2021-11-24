import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, Logger, Patch } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/interfaces/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsFilterCommentsDto } from './dto/get-comments-filter.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './interfaces/comment.entity';
import { CommentsService } from './comments.service';

@Controller('comments')
@ApiTags('Comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  private readonly logger = new Logger('CommentController');

  constructor(private readonly commentService: CommentsService) {}
  /*
    @Get()
    @ApiOperation({ summary: 'Get all comments' })
    @ApiOkResponse({ type: [Comment], description: 'Return all comments.' })
    @ApiBearerAuth()
    getAll(
      @Query() getCommentsFilterCommentDto: GetCommentsFilterCommentsDto,
      @GetUser() user: User,
    ): Promise<Comment[]> {
      this.logger.verbose(
        `User "${user?.username}" retrieving all comments. Filters: ${JSON.stringify(getCommentsFilterCommentDto)}`,
      );
      return this.commentService.getAll(getCommentsFilterCommentDto, user);
    }

    @Get(':id')
    @ApiOkResponse({ type: Comment })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    getById(@Param('id') id: string, @GetUser() user: User): Promise<Comment> {
      return this.commentService.getById(id, user);
    }

    @Post()
    @ApiCreatedResponse({ type: Comment })
    @ApiBearerAuth()
    create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User): Promise<Comment> {
      return this.commentService.create(createCommentDto, user);
    }

    @Patch(':id')
    @ApiOkResponse({ type: Comment })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    updateById(
      @Param('id') id: string,
      @Body() updateCommentDto: UpdateCommentDto,
      @GetUser() user: User,
    ): Promise<Comment> {
      return this.commentService.updateById(id, updateCommentDto, user);
    }

    @Delete(':id')
    @ApiOkResponse()
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    deleteById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
      return this.commentService.deleteById(id, user);
    } */
}
