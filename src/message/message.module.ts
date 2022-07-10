import { Module } from '@nestjs/common';
import { ProvideEnum } from '~/shared/configs/ProvideEnum';
import { MessageController } from './message.controller';
import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  providers: [
    MessageService,
    {
      provide: ProvideEnum.MessageRepository,
      useValue: MessageEntity,
    },
  ],
})
export class MessageModule {}
