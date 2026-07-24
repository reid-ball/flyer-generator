export interface FlyerImage {
  id: string;
  src: string;
  name: string;
  width: number;
  height: number;
}

export interface FlyerText {
  id: string;
  content: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'light';
  color: string;
  alignment: 'left' | 'center' | 'right';
}

export interface FlyerData {
  id: string;
  label: string;
  value: string;
}

export type FlyerStyle = 'minimal' | 'bold' | 'elegant' | 'modern' | 'vintage';

export interface FlyerConfig {
  id: string;
  title: string;
  subtitle: string;
  images: FlyerImage[];
  texts: FlyerText[];
  data: FlyerData[];
  style: FlyerStyle;
  backgroundColor: string;
  accentColor: string;
}

export const FLYER_STYLES: Record<FlyerStyle, { name: string; description: string; bg: string; accent: string }> = {
  minimal: {
    name: 'Minimal',
    description: 'Clean, whitespace-heavy layout',
    bg: '#ffffff',
    accent: '#000000',
  },
  bold: {
    name: 'Bold',
    description: 'High contrast, impactful design',
    bg: '#1a1a2e',
    accent: '#e94560',
  },
  elegant: {
    name: 'Elegant',
    description: 'Refined typography and spacing',
    bg: '#f5f0e8',
    accent: '#2c3e50',
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary gradients and shapes',
    bg: '#667eea',
    accent: '#764ba2',
  },
  vintage: {
    name: 'Vintage',
    description: 'Retro-inspired color palette',
    bg: '#f4e4c1',
    accent: '#8b4513',
  },
};

export const DEFAULT_CONFIG: FlyerConfig = {
  id: '',
  title: '',
  subtitle: '',
  images: [],
  texts: [],
  data: [],
  style: 'minimal',
  backgroundColor: '#ffffff',
  accentColor: '#000000',
};
