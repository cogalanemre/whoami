import { SocialMedia } from './index';

export interface Hero {
  name: string;
  avatar: string;
  socialMedia: SocialMedia;
  titles: {
    tr: string[];
    en: string[];
  };
}
