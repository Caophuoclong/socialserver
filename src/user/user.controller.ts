import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  HttpException,
  Response,
  Res,
  Put,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { CreateUser } from './dto/CreateUser.dto';
import { UserService } from './user.service';
import { UservalidationPipe } from '@pipes/uservalidation.pipe';
import { LoginDTO } from './dto/Login.dto';
import jwt from 'jsonwebtoken';
import { AddFriendDTO } from './dto/AddFriend.dto';
import { User } from './user.decorator';
import { UserEntity } from './user.entity';
import { UpdateUser } from './dto/UpdateUser.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(UservalidationPipe)
  @Post('register')
  async create(@Body() userData: CreateUser) {
    return await this.userService.createUser(userData);
  }
  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userData: LoginDTO
  ) {
    const user = await this.userService.login(userData);
    const error = { User: 'Not Found' };

    if (!user) throw new HttpException(error, 401);
    const { token, ...data } = await this.userService.generateJWT(user);
    return {
      ...data,
      token,
    };
  }
  @Put('addfriend/:targetId')
  async addFriend(
    @User() user: UserEntity,
    @Param('targetId', new ParseUUIDPipe()) targetId: string
  ) {
    return await this.userService.handleAddFriend(user, targetId);
  }
  @Put('accept/:targetId')
  async acceptFriend(
    @User() user: UserEntity,
    @Param('targetId', new ParseUUIDPipe()) targetId: string
  ) {
    return await this.userService.acceptFriend(user, targetId);
  }
  @Put('decline/:targetId')
  async declineFriend(
    @User() user: UserEntity,
    @Param('targetId', new ParseUUIDPipe()) targetId: string
  ) {
    return await this.userService.declineFriend(user, targetId);
  }
  @Patch('update')
  async updateInformation(
    @User() user: UserEntity,
    @Body() userUpdate: UpdateUser
  ) {
    return this.userService.updateInfomation(user, userUpdate);
  }
  @Put('update/password')
  async updatePassword(
    @User() user: UserEntity,
    @Body() { password }: { password: string }
  ) {
    return this.userService.updatePassword(user, password);
  }
}
