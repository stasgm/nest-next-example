import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/interfaces/user.entity';

export class AuthResponseDto {
  @ApiProperty()
  access_token: string;
  user: User;
}
