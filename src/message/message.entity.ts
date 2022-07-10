import {
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { UserEntity } from '~/user/user.entity';
import { ConversationEntity } from '~/conversation/conversation.entity';
import { MediaEntity } from '~/media/media.entity';
import { ReactEntity } from '~/react/react.entity';
import { ReactMessageEntity } from '~/react/reactMessage.entity';
@Table({
  tableName: 'messages',
})
export class MessageEntity extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column
  messageId: string;
  @Column
  messageContent: string;
  @BelongsTo(() => UserEntity, 'sourceId')
  sourceUser: UserEntity;
  @BelongsToMany(
    () => ConversationEntity,
    'shareMessage',
    'messageId',
    'conversationId'
  )
  targetConvesation: ConversationEntity;
  @HasMany(() => MediaEntity, 'ownerMessage')
  media: MediaEntity[];
  @HasMany(() => ReactMessageEntity, 'messageId')
  reactMessage: ReactMessageEntity[];
}
