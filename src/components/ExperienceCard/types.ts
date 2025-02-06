import { Experience } from '@/types';

export interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export interface StyledExperienceCardProps {
  isCurrentJob?: boolean;
  index: number;
} 