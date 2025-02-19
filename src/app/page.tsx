import { redirect } from 'next/navigation';
import config from '@/config/config.json';

export default function Home() {
  redirect(`/${config.language.default}`);
} 