import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '~/user/user.service';
import { userProvider } from './user.provider';
import { AuthorizationMiddleware } from '@middlewares/authorization.middleware';
import { MediaModule } from '~/media/media.module';

@Module({
  controllers: [UserController],
  imports: [MediaModule],
  providers: [UserService, ...userProvider],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        {
          path: '/api/v1/user/login',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/user/register',
          method: RequestMethod.POST,
        }
      )
      .forRoutes(UserController);
  }
}
