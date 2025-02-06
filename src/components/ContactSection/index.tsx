'use client';

import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import type { ContactFormData } from '@/types';
import { StyledForm, StyledFieldset } from './styles';

export default function ContactSection({ onSubmit, isLoading }: {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmitHandler = async (data: ContactFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <StyledForm 
      onSubmit={handleSubmit(onSubmitHandler)}
      isSubmitting={isSubmitting || !!isLoading}
    >
      <StyledFieldset>
        <TextField
          {...register('name', { required: 'İsim alanı zorunludur' })}
          label="İsim"
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />

        <TextField
          {...register('email', { 
            required: 'E-posta alanı zorunludur',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Geçerli bir e-posta adresi giriniz',
            },
          })}
          label="E-posta"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          {...register('phone')}
          label="Telefon (Opsiyonel)"
          fullWidth
        />

        <TextField
          {...register('message', { required: 'Mesaj alanı zorunludur' })}
          label="Mesaj"
          multiline
          rows={4}
          error={!!errors.message}
          helperText={errors.message?.message}
          fullWidth
        />
      </StyledFieldset>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={isSubmitting || isLoading}
        startIcon={isSubmitting || isLoading ? <CircularProgress size={20} /> : null}
      >
        Gönder
      </Button>
    </StyledForm>
  );
} 