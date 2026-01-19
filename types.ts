export enum ViewState {
  HOME = 'HOME',
  PORTFOLIO = 'PORTFOLIO',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  TESTIMONIALS = 'TESTIMONIALS',
  DETAILS = 'DETAILS',
  FAQ = 'FAQ',
  PHOTOBOOK = 'PHOTOBOOK'
}

export type Language = 'pt' | 'en';

export interface ImageItem {
  id: number;
  url: string;
  category: string;
  title?: string;
  album?: string[]; // Array de URLs das fotos do álbum/projeto
}

export interface NavItem {
  label: string;
  view: ViewState;
}

export interface GalleryProps {
  onImageClick: (image: ImageItem) => void;
  lang: Language;
}