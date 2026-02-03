/**
 * Fonte de conteúdo do site: images.json (content) ou translations como fallback.
 * Permite editar textos pelo Admin e persistir em images.json.
 */
import imagesData from './images.json';
import { translations } from './translations';
import type { Language } from './types';

type ContentLang = typeof translations.pt;

export function getContent(lang: Language): ContentLang {
  const fromJson = (imagesData as { content?: Record<Language, ContentLang> }).content?.[lang];
  return fromJson ? { ...translations[lang], ...fromJson } : translations[lang];
}
