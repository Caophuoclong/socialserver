import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { MessageEntity } from '~/message/message.entity';
import { PostEntity } from '~/post/post.entity';
import { MediaEntity } from '~/media/media.entity';
import { ReactEntity } from '~/react/react.entity';
import { ReactCommentEntity } from '~/react/reactComment.entity';
@Table({
  tableName: 'comments',
})
export class CommentEntity extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column
  commentId: string;

  @Column
  commentContent: string;

  @BelongsTo(() => MessageEntity, 'messageId')
  message: MessageEntity;
  @BelongsTo(() => PostEntity, 'postId')
  post: PostEntity;
  @HasMany(() => MediaEntity, 'ownerComment')
  media: MediaEntity[];
  @HasMany(() => ReactCommentEntity, 'commentId')
  reactComments: ReactEntity[];
}
