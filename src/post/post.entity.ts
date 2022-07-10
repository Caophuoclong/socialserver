import {
  AllowNull,
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
import { CommentEntity } from '~/comment/comment.entity';
import { ReactEntity } from '~/react/react.entity';
import { ENUM } from 'sequelize';
import { ReactPostEntity } from '~/react/reactPost.entity';
import { MediaEntity } from '../media/media.entity';
@Table({
  tableName: 'posts',
})
export class PostEntity extends Model {
  @Default(UUIDV4)
  @PrimaryKey
  @Column
  postId: string;

  @Column(ENUM('post', 'share'))
  postType;
  @Column
  postContent: string;
  @AllowNull
  @Column
  shareContent: string;
  @BelongsTo(() => UserEntity, 'userId')
  user: UserEntity;
  @BelongsToMany(() => PostEntity, 'sharePost', 'postId', 'shareId')
  shareBy: PostEntity[];
  @HasMany(() => CommentEntity, 'postId')
  comments: CommentEntity[];
  @HasMany(() => ReactPostEntity, 'postId')
  reacts: ReactPostEntity[];
  @HasMany(() => MediaEntity, 'ownerPost')
  media: MediaEntity[];
}
