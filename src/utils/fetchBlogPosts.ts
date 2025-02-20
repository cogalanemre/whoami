import { BlogPost } from '@/types/blog';
import config from '@/config/config.json';

interface APIResponse {
  posts: Array<Omit<BlogPost, 'pubDate'> & { pubDate: string }>;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Blog yazıları yükleniyor...');
    
    // Sunucu tarafında çalışacak şekilde tam URL'yi belirt
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? config.security.cors.origins.production[0]
      : config.security.cors.origins.development[0];

    const response = await fetch(`${baseUrl}/api/blog`, {
      next: {
        revalidate: config.api.blog.revalidateTime
      }
    });

    if (!response.ok) {
      console.error('HTTP Hata:', response.status, response.statusText);
      throw new Error('Blog yazıları alınamadı');
    }

    const data = await response.json() as APIResponse;
    console.log('Blog yazıları alındı:', data.posts.length);
    console.log('Blog yazıları alındı:', Date.now());
    return data.posts.map(post => ({
      ...post,
      pubDate: new Date(post.pubDate)
    }));
  } catch (error) {
    console.error('Blog yazıları alınırken hata oluştu:', error);
    return [];
  }
} 