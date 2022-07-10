import { MediaService } from './media.service';

export const mediaProvider = [
  {
    provide: 'Media_Service',
    useValue: MediaService,
  },
];
