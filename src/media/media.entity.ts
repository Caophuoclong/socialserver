import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { UserEntity } from '~/user/user.entity';
import { MessageEntity } from '~/message/message.entity';
import { PostEntity } from '~/post/post.entity';
import { ENUM } from 'sequelize';
import { ProfileEntity } from '../profile/profile.entity';
@Table({
  tableName: 'medias',
})
export class MediaEntity extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column
  mediaId: string;
  @Column
  url: string;
  @Default('image')
  @Column(ENUM('image', 'mp3', 'mp4', 'gif'))
  type;
  @Default('default')
  @Column(ENUM('default', 'avatar', 'cover'))
  imageType;
  @Default(false)
  @Column
  now: boolean;
  @BelongsTo(() => UserEntity, 'ownerUser')
  user: UserEntity;
  @BelongsTo(() => MessageEntity, 'ownerMessage')
  message: MessageEntity;
  @BelongsTo(() => PostEntity, 'ownerPost')
  post: PostEntity;
  @BelongsTo(() => ProfileEntity, 'profileAvatar')
  avatar: ProfileEntity;
  @BelongsTo(() => ProfileEntity, 'profileCover')
  cover: ProfileEntity;
}
