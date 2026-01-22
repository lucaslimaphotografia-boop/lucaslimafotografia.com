import React from 'react';
import imagesData from '../images.json';

// Using images from images.json for consistency
const heroImages: string[] = imagesData.hero;

// Split images into 3 columns
const col1 = heroImages.slice(0, 4);
const col2 = heroImages.slice(4, 8);
const col3 = heroImages.slice(8, 12);

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

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* Background Scrolling Grid */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-0 opacity-40">
        <ImageColumn images={col1} animationClass="animate-scroll-down-slow" />
        <div className="hidden md:block">
           <ImageColumn images={col2} animationClass="animate-scroll-down" />
        </div>
        <ImageColumn images={col3} animationClass="animate-scroll-down-slow" />
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