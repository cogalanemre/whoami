export interface BlogPost {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  thumbnail?: string;
  readingTime: {
    minutes: number;
  };
}

export interface BlogData {
  posts: BlogPost[];
} 