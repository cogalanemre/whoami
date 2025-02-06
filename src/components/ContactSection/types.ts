import { ContactFormData } from '@/types';

export interface ContactSectionProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface StyledFormProps {
  isSubmitting: boolean;
} 