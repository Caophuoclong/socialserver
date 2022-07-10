import { HttpException } from '@nestjs/common';

export class MissingProperyException extends HttpException {
  constructor() {
    super('Missing some properties!', 400);
  }
}
