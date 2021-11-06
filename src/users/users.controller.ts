import { Controller } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {}
