import { Module } from '@nestjs/common';
import { ProvideEnum } from '~/shared/configs/ProvideEnum';
import { ProfileEntity } from './profile.entity';

@Module({
  providers: [
    {
      provide: ProvideEnum.ProfileRepository,
      useValue: ProfileEntity,
    },
  ],
})
export class ProfileModule {}
