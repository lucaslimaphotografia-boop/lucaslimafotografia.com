import React, { useMemo } from 'react';
import imagesData from '../images.json';
import type { ImageItem } from '../types';

// Fotos dos álbuns (url principal + todas as fotos de cada álbum) para o hero
function getHeroImagesFromGallery(gallery: ImageItem[]): string[] {
  const urls: string[] = [];
  gallery.forEach((item) => {
    urls.push(item.url);
    if (item.album && Array.isArray(item.album)) {
      item.album.forEach((u) => urls.push(u));
    }
  });
  return urls;
}

// Número de colunas no grid (5 fileiras para preencher a home)
const NUM_COLUMNS = 5;

interface ColumnProps {
  images: string[];
  animationClass: string;
}

const ImageColumn: React.FC<ColumnProps> = ({ images, animationClass }) => {
  // Duplicate images to create seamless loop
  const seamlessImages = [...images, ...images, ...images]; 

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className={`flex flex-col gap-0 ${animationClass}`}>
        {seamlessImages.map((src, idx) => (
          <div key={idx} className="w-full aspect-[3/4] overflow-hidden">
            <img 
              src={src} 
              alt="Portfolio moment" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const animationClasses = [
  'animate-scroll-down-slow',
  'animate-scroll-down',
  'animate-scroll-down-slow',
  'animate-scroll-down',
  'animate-scroll-down-slow',
];

export const Hero: React.FC = () => {
  const columns = useMemo(() => {
    const gallery = (imagesData as { gallery: ImageItem[] }).gallery;
    const allImages = getHeroImagesFromGallery(gallery);
    const heroFallback = (imagesData as { hero?: string[] }).hero;
    const images = allImages.length > 0
      ? allImages
      : (heroFallback && heroFallback.length > 0 ? heroFallback : []);
    if (images.length === 0) return Array(NUM_COLUMNS).fill([]).map(() => []);
    // Distribuir em round-robin para não deixar coluna vazia
    const cols: string[][] = Array.from({ length: NUM_COLUMNS }, () => []);
    images.forEach((url, i) => {
      cols[i % NUM_COLUMNS].push(url);
    });
    return cols;
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* Background Scrolling Grid - 5 colunas para preencher a home */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 opacity-40">
        {columns.map((imgs, idx) => (
          <div key={idx} className={idx >= 3 ? 'hidden lg:block' : ''}>
            <ImageColumn
              images={imgs.length > 0 ? imgs : (columns[0]?.length ? columns[0] : (imagesData as { hero?: string[] }).hero || [])}
              animationClass={animationClasses[idx % animationClasses.length]}
            />
          </div>
        ))}
      </div>

      {/* Overlay Gradient to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none"></div>

      {/* Centered Overlay Logo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 mix-blend-difference">
        <img 
          src="https://res.cloudinary.com/di6xabxne/image/upload/v1769109817/LOGO_BRANCO_PNG_qsi22a.png"
          alt="LUCASLIMA STUDIO"
          className="w-[80%] max-w-[600px] md:max-w-[900px] h-auto"
        />
      </div>
    </div>
  );
};