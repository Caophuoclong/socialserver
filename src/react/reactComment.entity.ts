import { BelongsTo, Table } from 'sequelize-typescript';
import { CommentEntity } from '~/comment/comment.entity';
import { ReactEntity } from './react.entity';
@Table({
  tableName: 'react_comment',
})
export class ReactCommentEntity extends ReactEntity {
  @BelongsTo(() => CommentEntity, 'commentId')
  comment: CommentEntity;
}
