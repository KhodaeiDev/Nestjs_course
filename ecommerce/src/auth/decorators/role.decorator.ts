import { SetMetadata } from '@nestjs/common';
import userRoleEnum from 'src/users/enums/userRoleEnum';

export const ROLE_KEY = 'roles';

export const Role = (...roles: userRoleEnum[]) => SetMetadata(ROLE_KEY, roles);
