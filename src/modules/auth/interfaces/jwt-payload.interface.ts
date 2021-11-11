import { Role } from '../../users/interfaces/role.enum';

export interface JwtPayload {
  username: string;
  userid: string;
  role: Role;
}
