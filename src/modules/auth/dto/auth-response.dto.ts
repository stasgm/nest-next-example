import { ApiProperty } from '@nestjs/swagger';
// import { UserDto } from '../../users/dto/user.dto';

export class AuthResponseDto {
  @ApiProperty()
  access_token: string;
}
