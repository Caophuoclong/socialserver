import {
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { UserEntity } from '../user/user.entity';
import { MessageEntity } from '~/message/message.entity';
@Table({
  tableName: 'coversation',
})
export class ConversationEntity extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Unique
  @Column
  conversationId: string;
  @Column
  conversationName: string;
  @Column
  conversationType: string;
  @BelongsTo(() => UserEntity, 'ownerId')
  owner: UserEntity;
  @BelongsToMany(
    () => UserEntity,
    'conversationMember',
    'userId',
    'conversationId',
  )
  members: UserEntity[];
  @HasMany(() => MessageEntity, 'conversationId')
  messages: MessageEntity[];
}
