import { BelongsTo, Table } from 'sequelize-typescript';
import { PostEntity } from '~/post/post.entity';
import { ReactEntity } from './react.entity';
@Table({
  tableName: 'react_post',
})
export class ReactPostEntity extends ReactEntity {
  @BelongsTo(() => PostEntity, 'postId')
  post: PostEntity;
}
