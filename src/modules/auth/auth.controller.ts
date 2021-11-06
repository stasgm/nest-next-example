import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthResponseDto } from './dto/auth-request.dto';
import { User } from '../users/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOkResponse({ type: User })
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseDto> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOkResponse({ type: AuthResponseDto })
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseDto> {
    return this.authService.signIn(authCredentialsDto);
  }
}
