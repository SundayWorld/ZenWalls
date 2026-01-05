export interface Wallpaper {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isPremium: boolean;
}

export const CATEGORIES = [
  { id: 'amoled', name: 'AMOLED', icon: '🖤' },
  { id: 'abstract', name: 'Abstract', icon: '🎨' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'minimal', name: 'Minimal', icon: '⚪' },
  { id: 'anime', name: 'Anime', icon: '🎭' },
  { id: 'fantasy', name: 'Fantasy', icon: '✨' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
];

export const WALLPAPERS: Wallpaper[] = [
  {
    id: '1',
    title: 'Pure Black Minimal',
    category: 'amoled',
    imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Dark Geometric',
    category: 'amoled',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Black Space',
    category: 'amoled',
    imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '4',
    title: 'Dark Matter',
    category: 'amoled',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '5',
    title: 'Abstract Flow',
    category: 'abstract',
    imageUrl: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '6',
    title: 'Color Waves',
    category: 'abstract',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '7',
    title: 'Mountain Peak',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '8',
    title: 'Forest Path',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '9',
    title: 'Clean Lines',
    category: 'minimal',
    imageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '10',
    title: 'Simple Shapes',
    category: 'minimal',
    imageUrl: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '11',
    title: 'Anime Sunset',
    category: 'anime',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1600&fit=crop',
    isPremium: false,
  },

  {
    id: '14',
    title: 'Magic Forest',
    category: 'fantasy',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1600&fit=crop',
    isPremium: false,
  },
  {
    id: '15',
    title: 'Action Shot',
    category: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=1600&fit=crop',
    isPremium: false,
  },
];