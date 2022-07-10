import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { MediaEntity } from '~/media/media.entity';
import { UserEntity } from '~/user/user.entity';
@Table({
  tableName: 'profile',
})
export class ProfileEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  profileId: number;
  @Column
  firstName: string;
  @Column
  lastName: string;
  @Default(1)
  @Column
  date: number;
  @Default(1)
  @Column
  month: number;
  @Default(2001)
  @Column
  year: number;
  @BelongsTo(() => UserEntity, 'userId')
  owner: UserEntity;
  @HasMany(() => MediaEntity, 'profileAvatar')
  avatar: MediaEntity[];
  @HasMany(() => MediaEntity, 'profileCover')
  cover: MediaEntity[];
}
