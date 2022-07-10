import { BelongsTo, Table } from 'sequelize-typescript';
import { MessageEntity } from '~/message/message.entity';
import { ReactEntity } from './react.entity';

@Table({
  tableName: 'react_message',
})
export class ReactMessageEntity extends ReactEntity {
  @BelongsTo(() => MessageEntity, 'messageId')
  message: MessageEntity;
}
