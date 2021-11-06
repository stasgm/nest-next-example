import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { GetUser } from '../auth/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard())
export class UsersController {
  private readonly logger = new Logger('UsersController');

  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOkResponse({ type: [User] })
  getAll(@GetUser() user: User): Promise<User[]> {
    this.logger.verbose(`User "${user.username}" retrieving all Users}`);
    return this.usersService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id', required: true })
  getById(@Param('id') id: string, @GetUser() user: User): Promise<User> {
    this.logger.verbose(`User "${user.username}" retrieving a user by id ${id}`);
    return this.usersService.getById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto, @GetUser() user: User): Promise<User> {
    this.logger.verbose(`User "${user.username}" creates a new user. ${JSON.stringify(createUserDto)}`);
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @GetUser() user: User): Promise<User> {
    this.logger.verbose(`User "${user.username}" updates a user by id: ${id}. ${JSON.stringify(updateUserDto)}`);
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  deleteById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`User "${user.username}" deletes a user by id: ${id}`);
    return this.usersService.deleteById(id);
  }
}
