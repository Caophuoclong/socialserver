import { Inject, Injectable } from '@nestjs/common';
import { ProvideEnum } from '~/shared/configs/ProvideEnum';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject(ProvideEnum.MessageRepository)
    private readonly messageRepository: MessageEntity,
  ) {}
}
