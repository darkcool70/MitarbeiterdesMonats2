export interface Frame {
  id: string;
  name: string;
  price: number;
  image: string;
  aspectRatio?: number;
}

export interface Decoration {
  id: string;
  name: string;
  image: string;
}

export interface TextStyle {
  font: string;
  size: number;
  color: string;
}

export interface TextPosition {
  x: number;
  y: number;
}

export const FONTS = {
  HARRY_POTTER: "'Harry P', cursive",
  TIMES_NEW_ROMAN: "'Times New Roman', serif",
  IMPACT: "'Impact', sans-serif",
  MONTSERRAT: "'Montserrat', sans-serif",
  ROBOTO: "'Roboto', sans-serif",
  PLAYFAIR_DISPLAY: "'Playfair Display', serif",
  MERRIWEATHER: "'Merriweather', serif",
  GEORGIA: "'Georgia', serif",
} as const;

export const TEXT_SIZES = {
  SMALL: 24,
  MEDIUM: 32,
  LARGE: 40
} as const;

export const TEXT_COLORS = {
  GOLD: '#FFD700',
  SILVER: '#C0C0C0',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  NAVY: '#000080'
} as const;

// Predefined frames with correct paths and names
export const FRAMES: Frame[] = [
  {
    id: 'gold-ornate',
    name: 'Gold Ornament',
    price: 24.99,
    image: '/frames/gold-ornate.png',
    aspectRatio: 1.5 // 15/10 = 1.5
  },
  {
    id: 'silver-classic',
    name: 'Silber Klassisch',
    price: 24.99,
    image: '/frames/silver-classic.png',
    aspectRatio: 1.5
  },
  {
    id: 'wood-rustic',
    name: 'Holz Rustikal',
    price: 24.99,
    image: '/frames/wood-rustic.png',
    aspectRatio: 1.5
  },
  {
    id: 'modern-black',
    name: 'Modern Schwarz',
    price: 24.99,
    image: '/frames/modern-black.png',
    aspectRatio: 1.5
  }
];