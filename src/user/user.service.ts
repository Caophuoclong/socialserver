import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProvideEnum } from '~/shared/configs/ProvideEnum';
import { UserEntity } from '~/user/user.entity';
import { CreateUser } from './dto/CreateUser.dto';
import { LoginDTO } from './dto/Login.dto';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { SECRET, REFRESH_SECRET } from '@configs/SerectKey';
import { Op } from 'sequelize';
import { ProfileEntity } from '~/profile/profile.entity';
import { UpdateUser } from './dto/UpdateUser.dto';
import { MediaEntity } from '~/media/media.entity';
import { MediaService } from '~/media/media.service';
@Injectable()
export class UserService {
  constructor(
    private mediaRepository: MediaService,
    @Inject(ProvideEnum.UserRepository)
    private userRepository: typeof UserEntity
  ) {}

  async createUser(data: CreateUser) {
    console.log(data);
    const users = await this.userRepository.findAll({
      where: {
        [Op.or]: [
          {
            username: data.username,
          },
          {
            email: data.email,
          },
        ],
      },
    });
    if (users.length > 0) {
      const errorMessage = 'Username and email must be uniqe!';
      throw new HttpException(
        {
          message: 'Invalid user input! ' + errorMessage,
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const user = await this.userRepository.create({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    const profile = await ProfileEntity.create({
      firstName: data.firstName,
      lastName: data.lastName,
      userId: user.userId,
    });
    return 'Create user sucessfully!';
  }
  async login(data: LoginDTO) {
    const user = await this.userRepository.findOne({
      where: {
        username: data.username,
      },
    });
    console.log(user);

    if (!user)
      throw new HttpException(
        'Username or password is incorrect!',
        HttpStatus.FORBIDDEN
      );
    if (await argon2.verify(user.password, data.password)) return user;
    throw new HttpException(
      'Username or password is incorrect!',
      HttpStatus.FORBIDDEN
    );
  }
  public async generateJWT(user: UserEntity) {
    let today = new Date();
    let expired = new Date(today);
    expired.setDate(today.getDate() + 60);
    const token = jwt.sign(
      {
        userId: user.userId,
        username: user.username,
        email: user.email,
        exp: expired.getTime() / 1000,
      },
      SECRET
    );

    return {
      ...(await this.buildUserRO(user)),
      token,
    };
  }
  async handleAddFriend(user: UserEntity, targetId: string) {
    const xxx = await user.$add('friendRequested', targetId);
    if (xxx) return 'Add friend successfully!';
    return 'Add friend failure!';
  }
  async acceptFriend(user: UserEntity, targetId: string) {
    await user.$remove('friendRequested', targetId);
    const xxx = await user.$add('friends', targetId);
    if (xxx) return 'Add friend successfully!';
    return 'Add friend failure!';
  }
  async declineFriend(user: UserEntity, targetId: string) {
    await user.$remove('friendRequested', targetId);
    return 'Decline friend request successfully!';
  }
  // async updateAvatar(user: UserEntity, updateUser: UpdateUser){

  // }
  async updatePassword(user: UserEntity, password: string) {
    return await this.userRepository.update(
      {
        password: await argon2.hash(password),
      },
      {
        where: {
          userId: user.userId,
        },
      }
    );
  }
  async updateInfomation(user: UserEntity, updateUser: UpdateUser) {
    const userSearched = await this.userRepository.findByPk(user.userId, {
      include: [ProfileEntity],
    });
    const profile = await ProfileEntity.findByPk(
      userSearched.profile.profileId
    );
    await userSearched.update({
      email: updateUser.email,
    });
    await profile.update({
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      date: updateUser.dob?.date,
      month: updateUser.dob?.month,
      year: updateUser.dob?.year,
    });
    let newAvatar: MediaEntity = null;
    let newCover: MediaEntity = null;
    let oldAvatar: MediaEntity = null;
    let oldCover: MediaEntity = null;
    oldAvatar = await this.mediaRepository.findMedia({
      ownerUser: userSearched.userId,
      profileAvatar: profile.profileId,
      now: true,
      imageType: 'avatar',
    });
    oldCover = await this.mediaRepository.findMedia({
      ownerUser: userSearched.userId,
      profileCover: profile.profileId,
      now: true,
      imageType: 'cover',
    });
    if (updateUser.avatarUrl && !updateUser.avatarId)
      newAvatar = await this.mediaRepository.createMedia({
        url: updateUser.avatarUrl,
        ownerUser: userSearched.userId,
        imageType: 'avatar',
        type: 'image',
        profileAvatar: profile.profileId,
      });
    else if (updateUser.avatarId)
      newAvatar = await this.mediaRepository.findAvatarOrCover({
        mediaId: updateUser.avatarId,
        user: userSearched,
        type: 'avatar',
      });
    if (updateUser.coverUrl && !updateUser.avatarId)
      newCover = await this.mediaRepository.createMedia({
        url: updateUser.coverUrl,
        ownerUser: userSearched.userId,
        imageType: 'cover',
        profileCover: profile.profileId,
      });
    else if (updateUser.coverId)
      newCover = await this.mediaRepository.findAvatarOrCover({
        mediaId: updateUser.coverId,
        user: userSearched,
        type: 'cover',
      });
    newCover !== null &&
      (await newCover.update({
        now: true,
      }));
    newAvatar !== null &&
      (await newAvatar.update({
        now: true,
      }));

    if (
      newAvatar !== null &&
      oldAvatar !== null &&
      newAvatar.mediaId !== oldAvatar.mediaId
    ) {
      await oldAvatar.update({
        now: false,
      });
    }
    if (newCover !== null && oldCover !== null) {
      await oldCover.update({
        now: false,
      });
    }
    return 'Update successfully!';
  }
  async findByPK(pk: string) {
    return this.userRepository.findByPk(pk);
  }

  private async buildUserRO(user: UserEntity) {
    const conversations = await user.$get('conversations');
    const profile = await user.$get('profile');
    const avatar = await profile.$get('avatar', {
      where: {
        imageType: 'avatar',
      },
      attributes: ['mediaId', 'url', 'type', 'imageType', 'now'],
    });
    const cover = await profile.$get('cover', {
      where: {
        imageType: 'cover',
      },
      attributes: ['mediaId', 'url', 'type', 'imageType', 'now'],
    });
    return {
      id: user.userId,
      username: user.username,
      email: user.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      dob: {
        date: profile.date,
        month: profile.month,
        year: profile.year,
      },
      avatar: avatar,
      cover: cover,
      conversations,
      friends: user.friends,
    };
  }
}
