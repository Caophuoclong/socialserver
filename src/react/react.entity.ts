import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '~/post/post.entity';
import { ENUM } from 'sequelize';
import { MessageEntity } from '~/message/message.entity';
import { CommentEntity } from '~/comment/comment.entity';
@Table({
  tableName: 'reacts',
})
export class ReactEntity extends Model {
  @BelongsTo(() => UserEntity, 'userId')
  user: UserEntity;
  @Column(ENUM('like', 'haha', 'love', 'cry', 'angry'))
  type;
  //   @BelongsTo(() => MessageEntity, 'messageId')
  //   message: MessageEntity;
  //   @BelongsTo(() => CommentEntity, 'commentId')
  //   comment: CommentEntity;
  //   @BelongsTo(() => PostEntity, 'postId')
  //   post: PostEntity;
}
