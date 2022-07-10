import { Inject, Injectable } from '@nestjs/common';
import { ConversationEntity } from './conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    @Inject('CONVERSATION_REPOSITORY')
    private conversationRepository: ConversationEntity,
  ) {}
}
