export interface Pattern {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  reflection: string;
}

export interface Reflection {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
  handle: string;
}

export interface Benefit {
  title: string;
  description: string;
}
