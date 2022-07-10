import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  if (!!req.user) {
    return req.user;
  } else {
    throw new HttpException('Please login again', HttpStatus.BAD_REQUEST);
  }
});
