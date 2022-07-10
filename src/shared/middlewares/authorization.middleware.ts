import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '@configs/SerectKey';
import { UserEntity } from '~/user/user.entity';
import { UserService } from '~/user/user.service';
@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new HttpException('Missing token!', HttpStatus.FORBIDDEN);
    const token = authHeader.split(' ')[1];
    try {
      const { userId } = jwt.verify(token, SECRET) as Pick<
        UserEntity,
        'userId' | 'username' | 'email'
      >;
      console.log(userId);
      const user = await this.userService.findByPK(userId);
      if (!user) {
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Expired token! Please login again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
