export class FindMediaDTO {
  ownerUser: string;
  profileAvatar?: number;
  profileCover?: number;
  type: string;
  imageType: string;
  now?: boolean = false;
}
