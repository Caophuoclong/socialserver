import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './profile/profile.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { MediaModule } from './media/media.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { ReactModule } from './react/react.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ProfileModule,
    ConversationModule,
    MessageModule,
    MediaModule,
    CommentModule,
    PostModule,
    ReactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
