import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { AuthResponseDto } from './dto/auth-response.dto';
// import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/interfaces/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(authCredentialsDto);
    // return the user and the token
    return this.generateResponse(user);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseDto> {
    const { username, password } = authCredentialsDto;
    const user = await this.userService.getByName(username);

    if (!(user && (await bcrypt.compare(password, user.password)))) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    return this.generateResponse(user);
  }

  private generateToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private generateResponse(user: User): AuthResponseDto {
    const { username, id: userid, role } = user;
    const payload: JwtPayload = { username, userid, role };
    // generate token
    const token = this.generateToken(payload);
    // // generate user dto
    // const userDto = new UserDto(user);
    // return the user and the token
    return { access_token: token };
  }
}
