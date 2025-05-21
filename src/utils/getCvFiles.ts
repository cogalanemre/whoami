import fs from 'fs';
import path from 'path';

export interface CvFile {
  name: string;
  file: string;
}

export async function getCvFiles(): Promise<CvFile[]> {
  const cvDir = path.join(process.cwd(), 'public', 'cv');
  
  try {
    const files = await fs.promises.readdir(cvDir);
    return files
      .filter(file => file.endsWith('.pdf'))
      .map(file => ({
        name: file.replace('.pdf', '').replace(/-/g, ' '),
        file: file
      }));
  } catch (error) {
    console.error('CV dosyaları okunamadı:', error);
    return [];
  }
} 