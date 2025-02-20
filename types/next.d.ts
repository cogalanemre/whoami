import type { ReactNode } from 'react';

declare module 'next' {
  export interface LayoutProps {
    children: ReactNode;
    params: Promise<{ lang: string }>;
  }

  export interface PageProps {
    params: Promise<{ lang: string }>;
  }

  export interface MetadataProps {
    params: Promise<{ lang: string }>;
  }

  export interface GenerateMetadataProps {
    params: Promise<{ lang: string }>;
  }

  export interface GenerateStaticParamsProps {
    params: Promise<{ lang: string }>;
  }

  export interface MetadataParams {
    params: Promise<{ lang: string }>;
  }
} 