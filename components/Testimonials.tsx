import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface TestimonialsProps {
  lang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const t = translations[lang].testimonials;

  // In a real app, you might have separate testimonials per language, or translate them.
  // For this demo, I will just stick to the Portuguese ones if lang is pt, but ideally you'd have EN versions.
  // Let's assume we translate them dynamically or have a different dataset. 
  // I will just use the same dataset for now but the title is translated.
  // To be proper, let's hardcode EN versions if lang is EN.

  const testimonialsPt = [
    {
      names: "Mariana & Felipe",
      location: "Toscana, Itália",
      quote: "O Lucas não tira apenas fotos, ele captura a alma do momento. Olhar para o nosso álbum é reviver cada segundo daquele dia mágico com uma intensidade que eu não sabia ser possível.",
      image: "https://images.unsplash.com/photo-1511285560982-1351c4f809b9?q=80&w=600&auto=format&fit=crop"
    },
    {
      names: "Sofia & André",
      location: "Rio de Janeiro, Brasil",
      quote: "A sensibilidade estética do Lucas é de outro mundo. Ele transformou nosso casamento em um editorial de moda, sem perder a emoção genuína. Simplesmente impecável e elegante.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
    },
    {
      names: "Beatriz & Carlos",
      location: "Paris, França",
      quote: "Estávamos nervosos com as fotos, mas o Lucas nos deixou super à vontade. O resultado foi uma coleção de imagens espontâneas e cheias de vida. Eternamente gratos por esse registro!",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop"
    },
    {
      names: "Valentina & Enzo",
      location: "Lago de Como, Itália",
      quote: "Cada detalhe foi capturado com perfeição. A luz, a composição, os momentos espontâneos... É arte pura. O Lucas tem um dom incrível de contar histórias através de imagens.",
      image: "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const testimonialsEn = [
    {
      names: "Mariana & Felipe",
      location: "Tuscany, Italy",
      quote: "Lucas doesn't just take photos, he captures the soul of the moment. Looking at our album is reliving every second of that magical day with an intensity I didn't know was possible.",
      image: "https://images.unsplash.com/photo-1511285560982-1351c4f809b9?q=80&w=600&auto=format&fit=crop"
    },
    {
      names: "Sofia & André",
      location: "Rio de Janeiro, Brazil",
      quote: "Lucas's aesthetic sensibility is otherworldly. He turned our wedding into a fashion editorial without losing genuine emotion. Simply impeccable and elegant.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
    },
    {
      names: "Beatriz & Carlos",
      location: "Paris, France",
      quote: "We were nervous about the photos, but Lucas made us feel super comfortable. The result was a collection of spontaneous and lively images. Eternally grateful for this record!",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop"
    },
    {
      names: "Valentina & Enzo",
      location: "Lake Como, Italy",
      quote: "Every detail was captured to perfection. The light, the composition, the spontaneous moments... It's pure art. Lucas has an incredible gift for telling stories through images.",
      image: "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const data = lang === 'pt' ? testimonialsPt : testimonialsEn;

  return (
    <div className="w-full min-h-screen bg-white pt-32 pb-20 px-4 md:px-16 flex flex-col">
       <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-24 text-center md:text-left">
          {t.title}
       </h2>

       <div className="flex flex-col gap-24 max-w-7xl mx-auto w-full">
          {data.map((t, i) => (
             <div key={i} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Imagem do Casal */}
                <div className="w-full md:w-5/12 aspect-[3/4] relative overflow-hidden group">
                   <img 
                     src={t.image} 
                     alt={t.names} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                   />
                </div>

                {/* Texto */}
                <div className="w-full md:w-7/12 flex flex-col justify-center">
                    <p className="text-xl md:text-3xl font-serif italic mb-8 leading-relaxed text-gray-800">
                      "{t.quote}"
                    </p>
                    <div className="border-t border-black pt-4 inline-block w-full">
                       <span className="block text-lg font-black uppercase tracking-widest">{t.names}</span>
                       <span className="block text-sm uppercase text-gray-500 mt-1 tracking-wider">{t.location}</span>
                    </div>
                </div>

             </div>
          ))}
       </div>
    </div>
  );
};