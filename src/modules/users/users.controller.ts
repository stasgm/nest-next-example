import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { GetUser } from '../auth/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard())
export class UsersController {
  private readonly logger = new Logger('UsersController');

  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOkResponse({ type: [UserDto] })
  async getAll(@GetUser() user: User): Promise<UserDto[]> {
    this.logger.verbose(`User "${user.username}" retrieving all Users}`);
    const users = await this.usersService.getAll();
    return users.map((i) => new UserDto(i));
  }

  @Get('me')
  @ApiOkResponse()
  @ApiBearerAuth()
  async getMe(@GetUser() user: User): Promise<UserDto> {
    this.logger.verbose(`User "${user.username}" gets himself`);
    // Check if a user exists
    return new UserDto(user);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiParam({ name: 'id', required: true })
  async getById(@Param('id') id: string, @GetUser() user: User): Promise<UserDto> {
    this.logger.verbose(`User "${user.username}" retrieving a user by id ${id}`);
    return new UserDto(await this.usersService.getById(id));
  }

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto, @GetUser() user: User): Promise<UserDto> {
    this.logger.verbose(`User "${user.username}" creates a new user. ${JSON.stringify(createUserDto)}`);
    return new UserDto(await this.usersService.create(createUserDto));
  }

  @Put(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<UserDto> {
    this.logger.verbose(`User "${user.username}" updates a user by id: ${id}. ${JSON.stringify(updateUserDto)}`);
    return new UserDto(await this.usersService.updateById(id, updateUserDto));
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
