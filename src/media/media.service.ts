import { Inject, Injectable } from '@nestjs/common';
import { ProvideEnum } from '~/shared/configs/ProvideEnum';
import { MediaCreateDTO } from './dto/MediaCreate.dto';
import { MediaEntity } from './media.entity';
import { UserEntity } from '~/user/user.entity';
import { ProfileEntity } from '~/profile/profile.entity';
import { FindMediaDTO } from './dto/FindMedia.dto';

@Injectable()
export class MediaService {
  constructor(
    @Inject(ProvideEnum.MediaRepository)
    private readonly MediaRepository: typeof MediaEntity
  ) {}
  async createMedia({ ownerUser, url, ...data }: MediaCreateDTO) {
    // profileId = null,
    // imageType = 'default',
    // messageId = null,
    // now = false,
    // postId = null,
    // type = 'image',
    // console.log(
    //   userId,
    //   url,
    //   profileId,
    //   imageType,
    //   messageId,
    //   now,
    //   postId,
    //   type
    // );
    return this.MediaRepository.create({
      url,
      ownerUser: ownerUser,
      ...data,
    });
  }
  async findAvatarOrCover({
    user,
    mediaId,
    type,
  }: {
    user: UserEntity;
    type: 'cover' | 'avatar';
    mediaId: string;
  }) {
    return this.MediaRepository.findOne({
      where: {
        mediaId,
        ownerUser: user.userId,
        imageType: type,
      },
    });
  }
  async findMedia(data: Partial<FindMediaDTO>) {
    return await this.MediaRepository.findOne({
      where: {
        ...data,
      },
    });
  }
}
