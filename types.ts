export enum ViewState {
  HOME = 'HOME',
  PORTFOLIO = 'PORTFOLIO',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  TESTIMONIALS = 'TESTIMONIALS',
  DETAILS = 'DETAILS',
  FAQ = 'FAQ',
  PHOTOBOOK = 'PHOTOBOOK',
  ADMIN = 'ADMIN'
}

export type Language = 'pt' | 'en';

/** Ponto focal da foto de capa (%), para object-position no CSS */
export interface FocalPoint {
  x: number; // 0–100 (horizontal)
  y: number; // 0–100 (vertical)
}

/** Tamanho de exibição da foto na galeria (grid) */
export type DisplaySize = 'small' | 'medium' | 'large';

export interface ImageItem {
  id: number;
  url: string;
  category: string | string[]; // Categoria única ou múltiplas categorias
  subcategory?: string | string[]; // Subcategoria opcional (pode ser única ou múltiplas)
  title?: string;
  album?: string[]; // Array de URLs das fotos do álbum/projeto
  /** Ponto focal da foto de capa no portfólio (opcional; padrão centro) */
  focalPoint?: FocalPoint;
  /** Tamanho na grade da galeria: small/medium = 1 col, large = 2 cols (opcional) */
  displaySize?: DisplaySize;
}

/** Álbum da página Álbuns/Livros (Photobook) */
export interface PhotobookAlbum {
  title: string;
  subtitle: string;
  description: string;
  details: string;
  images: string[];
}

/** Depoimento (página Depoimentos) — campos em PT e EN */
export interface TestimonialItem {
  names_pt: string;
  names_en: string;
  location_pt: string;
  location_en: string;
  quote_pt: string;
  quote_en: string;
  image: string;
}

export interface NavItem {
  label: string;
  view: ViewState;
}

export interface GalleryProps {
  onImageClick: (image: ImageItem) => void;
  lang: Language;
}