import { NextResponse } from 'next/server';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXML = promisify(parseString);

interface RSSItem {
  title: string[];
  link: string[];
  pubDate: string[];
  description: string[];
  'dc:creator': string[];
  category: string[];
  'content:encoded': string[];
  guid: string[];
}

interface RSSChannel {
  item: RSSItem[];
}

interface RSSFeed {
  rss: {
    channel: RSSChannel[];
  };
}

interface ReadingTime {
  minutes: number;
}

function extractReadingTime(content: string): ReadingTime {
  // İçeriğin uzunluğuna göre tahmini okuma süresi hesapla
  // Ortalama okuma hızı: 200 kelime/dakika
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  
  return { minutes: Math.max(1, minutes) };
}

function extractFirstParagraph(content: string): string {
  // İlk anlamlı paragrafı bul
  const cleanText = content
    .replace(/<figure[\s\S]*?<\/figure>/i, '') // Figürleri kaldır
    .replace(/<iframe[\s\S]*?<\/iframe>/i, '') // iFrame'leri kaldır
    .replace(/<pre[\s\S]*?<\/pre>/i, '') // Kod bloklarını kaldır
    .replace(/<h[1-6][\s\S]*?<\/h[1-6]>/i, ''); // Başlıkları kaldır

  const paragraphs = cleanText.match(/<p>([\s\S]*?)<\/p>/i);
  if (paragraphs && paragraphs[1]) {
    const firstParagraph = paragraphs[1]
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    return firstParagraph.length > 200 
      ? firstParagraph.substring(0, 200) + '...'
      : firstParagraph;
  }
  
  return '';
}

function extractMainImage(content: string, description: string): string | undefined {
  // Önce içerikteki ilk figür içindeki resmi bul
  const figureMatch = content.match(/<figure[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<\/figure>/i);
  if (figureMatch && figureMatch[1]) {
    return figureMatch[1];
  }

  // Figür bulunamazsa, içerikteki ilk resmi bul
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }

  // İçerikte resim bulunamazsa, açıklamadaki resmi kontrol et
  const descriptionImgMatch = description.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
  if (descriptionImgMatch && descriptionImgMatch[1]) {
    return descriptionImgMatch[1];
  }

  return undefined;
}

function cleanContent(content: string): string {
  return content
    .replace(/<figure[\s\S]*?<\/figure>/i, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/i, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET() {
  try {
    const response = await fetch('https://medium.com/feed/@cogalanemre', {
      headers: {
        'Accept': 'application/xml',
        'Content-Type': 'application/xml',
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Blog yazıları alınamadı');
    }

    const text = await response.text();
    const result = await parseXML(text) as RSSFeed;

    if (!result.rss?.channel?.[0]?.item) {
      return NextResponse.json({ posts: [] });
    }

    const items = result.rss.channel[0].item;
    const posts = items.map((item: RSSItem) => {
      const title = item.title?.[0] || '';
      const link = item.link?.[0] || '';
      const pubDate = item.pubDate?.[0] || '';
      const description = item.description?.[0] || '';
      const categories = item.category || [];
      const content = item['content:encoded']?.[0] || '';
      const guid = item.guid?.[0] || '';

      return {
        title,
        link,
        pubDate,
        description: extractFirstParagraph(content) || description.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        thumbnail: extractMainImage(content, description),
        categories,
        content: cleanContent(content),
        readingTime: extractReadingTime(content),
        guid
      };
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Blog yazıları alınırken hata oluştu:', error);
    return NextResponse.json({ posts: [] });
  }
} 