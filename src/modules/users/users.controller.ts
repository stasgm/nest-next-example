import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { GetUser } from '../auth/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.entity';
import { Role } from './interfaces/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { hasRoles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  private readonly logger = new Logger('UsersController');
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @hasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: [User] })
  async getAll(@GetUser() user: User): Promise<User[]> {
    this.logger.verbose(`User "${user.username}" retrieving all Users}`);
    return await this.usersService.getAll();
  }

  @Get(':id')
  @hasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  async getById(@Param('id') id: string, @GetUser() user: User): Promise<User> {
    this.logger.verbose(`User "${user.username}" retrieving a user by id ${id}`);
    return this.usersService.getById(id);
  }

  @Post()
  @hasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiCreatedResponse({ type: User })
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto, @GetUser() user: User): Promise<User> {
    this.logger.verbose(`User "${user.username}" creates a new user. ${JSON.stringify(createUserDto)}`);
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @hasRoles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    this.logger.verbose(`User "${user.username}" updates a user by id: ${id}. ${JSON.stringify(updateUserDto)}`);
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  @hasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  deleteById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`User "${user.username}" deletes a user by id: ${id}`);
    return this.usersService.deleteById(id);
  }
}
