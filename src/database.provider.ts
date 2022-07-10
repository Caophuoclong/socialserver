import { Sequelize } from 'sequelize-typescript';
import { UserEntity } from '~/user/user.entity';
import { ProfileEntity } from '~/profile/profile.entity';
import { ConversationEntity } from '~/conversation/conversation.entity';
import { MessageEntity } from '~/message/message.entity';
import { MediaEntity } from './media/media.entity';
import { PostEntity } from './post/post.entity';
import { CommentEntity } from './comment/comment.entity';

import { ReactEntity } from './react/react.entity';
import { ReactPostEntity } from './react/reactPost.entity';
import { ReactCommentEntity } from './react/reactComment.entity';
import { ReactMessageEntity } from './react/reactMessage.entity';
export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: '516489C@k',
        database: 'socialNest',
      });
      sequelize.addModels([
        UserEntity,
        ProfileEntity,
        ConversationEntity,
        MessageEntity,
        MediaEntity,
        PostEntity,
        CommentEntity,
        ReactPostEntity,
        ReactMessageEntity,
        ReactCommentEntity,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
