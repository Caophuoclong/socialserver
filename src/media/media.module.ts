import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ProvideEnum } from '@configs/ProvideEnum';
import { MediaEntity } from './media.entity';

@Module({
  providers: [
    MediaService,
    {
      provide: ProvideEnum.MediaRepository,
      useValue: MediaEntity,
    },
  ],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
