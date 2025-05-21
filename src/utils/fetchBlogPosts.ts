import { BlogPost } from '@/types/blog';
import config from '@/config/config.json';
import Parser from 'rss-parser';

// RSS Parser için özel tip tanımlaması
type CustomFeed = Parser.Output<{
  title: string;
  description: string;
  link: string;
  pubDate: string;
  'content:encoded': string;
  content: string;
  contentSnippet: string;
}>;

type CustomItem = Parser.Item & {
  title: string;
  contentSnippet?: string;
  content?: string;
  link: string;
  pubDate: string;
  'content:encoded'?: string;
};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    item: ['content:encoded'],
  },
});

// Ortalama okuma hızı (kelime/dakika)
const AVERAGE_READING_SPEED = 200;

// HTML içeriğinden metin çıkaran yardımcı fonksiyon
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

// Kelime sayısını hesaplayan yardımcı fonksiyon
function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

// Okuma süresini hesaplayan yardımcı fonksiyon
function calculateReadingTime(content: string): number {
  const words = countWords(stripHtml(content));
  return Math.max(1, Math.ceil(words / AVERAGE_READING_SPEED));
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Loading blog posts from Medium...');

    const feed = await parser.parseURL(config.api.blog.feedUrl);

    return feed.items.map(item => {
      // HTML içeriğini temizle
      const cleanContent = item['content:encoded'] || item.content || '';
      const plainText = stripHtml(cleanContent);

      return {
        title: item.title || '',
        description: item.contentSnippet || plainText.substring(0, 200) + '...',
        link: item.link || '',
        pubDate: new Date(item.pubDate || ''),
        thumbnail: item['content:encoded'] ? extractThumbnail(item['content:encoded']) : undefined,
        readingTime: {
          minutes: calculateReadingTime(cleanContent),
        },
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Medium içeriğinden thumbnail URL'sini çıkaran yardımcı fonksiyon
function extractThumbnail(content: string): string | undefined {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : undefined;
}
