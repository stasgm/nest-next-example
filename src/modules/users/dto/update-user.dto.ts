import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
// export class UpdateUserDto {
//   @ApiProperty()
//   @IsOptional()
//   username?: string;

//   @ApiProperty()
//   @IsOptional()
//   passport?: string;
// }
