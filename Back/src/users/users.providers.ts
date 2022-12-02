import { USER_REPOSITORY } from 'src/core/constants';
import { User } from 'src/entities/users.entity';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
