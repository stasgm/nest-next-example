import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
// import { AuthService } from '../auth.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { JwtPayload } from './jwt-payload.interface';
// import { User } from '../../users/user.entity';
// import { UsersRepository } from '../../users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(
  //   @InjectRepository(UsersRepository)
  //   private readonly userRepository: UsersRepository,
  // ) {
  //   super({
  //     secretOrKey: 'secret123456789',
  //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //   });
  // }

  // async validate(payload: JwtPayload): Promise<User> {
  //   const { username } = payload;
  //   const user: User = await this.userRepository.findOne({ username });

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }

  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user: User = await this.userService.getByName(username);
    if (!user) {
      throw new UnauthorizedException('You are not authorized to perform the operation');
    }
    return payload;
  }
}
