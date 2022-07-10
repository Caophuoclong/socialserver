import { UserEntity } from '~/user/user.entity';
import { PostEntity } from '~/post/post.entity';
import { MessageEntity } from '~/message/message.entity';
import { ProfileEntity } from '~/profile/profile.entity';
export class MediaCreateDTO {
  readonly url: string;
  readonly type?: string;
  readonly imageType?: string;
  readonly ownerUser: string;
  readonly ownerPost?: string;
  readonly ownerMessage?: string;
  readonly ownerProfile?: number;
  readonly profileAvatar?: number;
  readonly profileCover?: number;
  readonly now?: boolean;
}
