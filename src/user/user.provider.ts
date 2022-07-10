import { ProvideEnum } from '~/shared/configs/ProvideEnum';
import { UserEntity } from './user.entity';
export const userProvider = [
  {
    provide: ProvideEnum.UserRepository,
    useValue: UserEntity,
  },
];
