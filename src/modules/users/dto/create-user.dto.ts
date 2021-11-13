import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../interfaces/user.entity';

export class CreateUserDto extends PickType(User, ['username'] as const) {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
// export class CreateUserDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   username: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   password: string;
// }
