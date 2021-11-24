import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from '../users/interfaces/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOkResponse({ type: User })
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseDto> {
    this.logger.verbose(`User "${authCredentialsDto.username}" makes registration`);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOkResponse({ type: AuthResponseDto })
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseDto> {
    this.logger.verbose(`User "${authCredentialsDto.username}" makes log in`);
    return this.authService.signIn(authCredentialsDto);
  }

  // @Get('me')
  // // @UseGuards(JwtAuthGuard)
  // @ApiOkResponse({ type: User })
  // @ApiBearerAuth()
  // async getMe2(@GetUser() user: User): Promise<User> {
  //   this.logger.verbose(`User "${user.username}" gets his info`);
  //   // Check if a user exists
  //   return user;
  // }

  @Post('me')
  @ApiOkResponse({ type: User })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMe(@GetUser() user: User): Promise<User> {
    this.logger.verbose(`User "${user.username}" gets his info`);
    // Check if a user exists
    return user;
  }
}
