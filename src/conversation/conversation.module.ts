import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationEntity } from './conversation.entity';

@Module({
  providers: [
    ConversationService,
    {
      provide: 'CONVERSATION_REPOSITORY',
      useValue: ConversationEntity,
    },
  ],
  controllers: [ConversationController],
})
export class ConversationModule {}
