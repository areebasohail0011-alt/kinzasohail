export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  image: string;
  caption: string;
  tags: string[];
}

export interface SpecialTrait {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'heart' | 'smile' | 'hand' | 'sparkle';
  accentColor: string;
  highlightText: string;
}
