import { BlogPost } from '@/types/blog';

interface APIResponse {
  posts: Array<Omit<BlogPost, 'pubDate'> & { pubDate: string }>;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Blog yazıları yükleniyor...');
    const response = await fetch('/api/blog');

    if (!response.ok) {
      console.error('HTTP Hata:', response.status, response.statusText);
      throw new Error('Blog yazıları alınamadı');
    }

    const data = await response.json() as APIResponse;
    console.log('Blog yazıları alındı:', data.posts.length);

    return data.posts.map(post => ({
      ...post,
      pubDate: new Date(post.pubDate)
    }));
  } catch (error) {
    console.error('Blog yazıları alınırken hata oluştu:', error);
    return [];
  }
} 