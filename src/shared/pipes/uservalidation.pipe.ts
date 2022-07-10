import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUser } from '~/user/dto/CreateUser.dto';
import { MissingProperyException } from '../exceptions/MissingProperty';

@Injectable()
export class UservalidationPipe implements PipeTransform {
  transform(value: CreateUser, metadata: ArgumentMetadata) {
    const valueKey = Object.keys(value);
    const ittt = valueKey.every((key) => !!value[key]);
    if (!ittt) {
      throw new MissingProperyException();
    } else {
      return value;
    }
  }
}
