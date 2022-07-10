import { UUIDV4 } from 'sequelize';
import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  IsNull,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import * as argon2 from 'argon2';
import { ConversationEntity } from '../conversation/conversation.entity';
import { MessageEntity } from '~/message/message.entity';
import { MediaEntity } from '~/media/media.entity';
import { ProfileEntity } from '~/profile/profile.entity';
@Table({
  tableName: 'users',
})
export class UserEntity extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  userId: string;

  @Unique
  @Column
  username: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Default(new Date())
  @Column
  createdAt: Date;

  @BeforeCreate
  static async hashPassword(user: UserEntity) {
    console.log(user.password);
    if (user.password) user.password = await argon2.hash(user.password);
  }

  @BeforeUpdate
  @BeforeCreate
  static async makeLowerCase(user: UserEntity) {
    user.username = user.username.toLocaleLowerCase();
  }
  @BelongsToMany(() => UserEntity, 'hasFriend', 'sourceId', 'targetId')
  friends: UserEntity[];
  @BelongsToMany(() => UserEntity, 'hasRequested', 'sourceId', 'targetId')
  friendRequested: UserEntity[];
  @BelongsToMany(
    () => ConversationEntity,
    'inConversation',
    'userId',
    'conversationId'
  )
  conversations: ConversationEntity[];
  @HasMany(() => MessageEntity, 'messageId')
  message: string[];
  @HasMany(() => MediaEntity, 'ownerUser')
  media: string[];
  @HasOne(() => ProfileEntity, 'userId')
  profile: ProfileEntity;
}
