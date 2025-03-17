import { z } from 'zod';

export const translationSchema = z.object({
  sections: z.object({
    experience: z.string(),
    education: z.string(),
    blog: z.string(),
    contact: z.string(),
    skills: z.string(),
    social: z.string()
  }),
  contact: z.object({
    info: z.string(),
    sendMessage: z.string(),
    form: z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      phoneOptional: z.string(),
      message: z.string(),
      send: z.string(),
      sending: z.string()
    }),
    success: z.string(),
    error: z.string()
  }),
  blog: z.object({
    readMore: z.string(),
    loading: z.string(),
    noPosts: z.string(),
    readingTime: z.object({
      minute: z.string(),
      minutes: z.string()
    }),
    aria: z.object({
      coverImage: z.string(),
      readPost: z.string()
    })
  }),
  education: z.object({
    aria: z.object({
      card: z.string(),
      logo: z.string(),
      duration: z.string(),
      dates: z.string()
    })
  }),
  theme: z.object({
    dark: z.string(),
    light: z.string()
  }),
  experience: z.object({
    current: z.string(),
    fullTime: z.string(),
    workingModel: z.object({
      hybrid: z.string(),
      remote: z.string(),
      office: z.string()
    }),
    employmentType: z.object({
      fullTime: z.string(),
      partTime: z.string(),
      contract: z.string(),
      freelance: z.string()
    })
  }),
  skills: z.object({
    showAll: z.string(),
    showLess: z.string()
  }),
  error: z.object({
    title: z.string(),
    message: z.string(),
    retry: z.string()
  })
});

export type TranslationType = z.infer<typeof translationSchema>; 