import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = translations[lang].about;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row">
       {/* Left Image Section - Sticky on Desktop */}
       <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative md:sticky md:top-0">
          <img 
            src="https://picsum.photos/seed/couple_studio/900/1600" 
            alt="Photographer Portrait" 
            className="w-full h-full object-cover grayscale" 
          />
       </div>

       {/* Right Content Section */}
       <div className="w-full md:w-1/2 min-h-screen md:h-auto md:min-h-screen px-8 py-20 md:p-24 flex flex-col justify-center bg-white">
          <div className="mb-12 flex flex-col items-start leading-none text-gray-400">
              <span className="text-lg font-black uppercase tracking-tighter text-black">LUCASLIMA</span>
              <span className="text-[0.4rem] tracking-[0.3em] font-light mt-0.5 ml-0.5">STUDIO</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif italic mb-12 text-black">{t.title}</h2>
          
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-800 font-light text-justify md:text-left">
            {t.story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
             <div>
                <span className="block text-4xl md:text-5xl font-serif italic mb-2 text-black">15</span>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">{t.years}</span>
             </div>
             <div>
                <span className="block text-4xl md:text-5xl font-serif italic mb-2 text-black">8+</span>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">{t.countries}</span>
             </div>
          </div>
       </div>
    </div>
  );
};