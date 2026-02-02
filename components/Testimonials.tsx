import React from 'react';
import { Language, TestimonialItem } from '../types';
import { translations } from '../translations';
import imagesData from '../images.json';

interface TestimonialsProps {
  lang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const t = translations[lang].testimonials;

  const raw = (imagesData as { testimonials?: TestimonialItem[] }).testimonials ?? [];
  const data = raw.map((item) => ({
    names: lang === 'pt' ? item.names_pt : item.names_en,
    location: lang === 'pt' ? item.location_pt : item.location_en,
    quote: lang === 'pt' ? item.quote_pt : item.quote_en,
    image: item.image
  })).filter((item) => item.names || item.quote || item.image);

  return (
    <div className="w-full min-h-screen bg-white pt-32 pb-20 px-4 md:px-16 flex flex-col">
       <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-24 text-center md:text-left">
          {t.title}
       </h2>

       <div className="flex flex-col gap-24 max-w-7xl mx-auto w-full">
          {data.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Nenhum depoimento no momento.</p>
          ) : (
            data.map((item, i) => (
             <div key={i} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Imagem do Casal */}
                <div className="w-full md:w-5/12 aspect-[3/4] relative overflow-hidden group">
                   <img 
                     src={item.image} 
                     alt={item.names} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                   />
                </div>

                {/* Texto */}
                <div className="w-full md:w-7/12 flex flex-col justify-center">
                    <p className="text-xl md:text-3xl font-serif italic mb-8 leading-relaxed text-gray-800">
                      &quot;{item.quote}&quot;
                    </p>
                    <div className="border-t border-black pt-4 inline-block w-full">
                       <span className="block text-lg font-black uppercase tracking-widest">{item.names}</span>
                       <span className="block text-sm uppercase text-gray-500 mt-1 tracking-wider">{item.location}</span>
                    </div>
                </div>

             </div>
            ))
          )}
       </div>
    </div>
  );
};
