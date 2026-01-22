import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = translations[lang].about;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const people = (t as any).people || [];
  const intro = (t as any).intro || {};
  const closing = (t as any).closing || {};
  const heroImage = (t as any).heroImage || '';
  const philosophyImage = (t as any).philosophyImage || '';

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu-toggle') && !target.closest('.nav-links')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!people || !Array.isArray(people) || people.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Carregando informações...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-['Inter',sans-serif]">
      {/* Hero Section */}
      <section className="mt-20 md:mt-24 px-4 md:px-10 py-16 md:py-20 text-center">
        {heroImage && (
          <img 
            src={heroImage} 
            alt="Fotografia de Casamento" 
            className="w-full max-w-6xl h-[50vh] md:h-[60vh] object-cover mx-auto mb-12 md:mb-16 opacity-0 animate-[fadeIn_1s_ease_forwards]"
          />
        )}
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Playfair_Display',serif] font-normal tracking-tight mb-6 md:mb-8 text-black leading-tight">
          {t.title?.replace('\n', ' ')}
        </h1>
        
        {intro.text && (
          <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-gray-600 max-w-4xl mx-auto mb-4 italic">
            {intro.text}
          </p>
        )}
        
        {intro.subtext && (
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto mt-8 md:mt-10">
            {intro.subtext}
          </p>
        )}
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {people.map((person: any, index: number) => (
            <article 
              key={index}
              className="opacity-0 animate-[slideUp_0.8s_ease_forwards]"
              style={{ animationDelay: `${(index + 1) * 0.2}s` }}
            >
              <div className="mb-6 md:mb-8">
                <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-normal mb-2 text-black">
                  {person.name}
                </h2>
                {person.role && (
                  <p className="text-sm md:text-base text-gray-400 uppercase tracking-widest font-light">
                    {person.role}
                  </p>
                )}
              </div>
              
              <img 
                src={person.image} 
                alt={person.name} 
                className="w-full h-[400px] md:h-[600px] object-cover my-6 md:my-8 grayscale-[10%] hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
              
              <div className="text-base md:text-lg leading-relaxed text-gray-600">
                {person.bio && Array.isArray(person.bio) && person.bio.map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className="mb-6">
                    {paragraph}
                  </p>
                ))}
                
                {person.by && (
                  <p className="italic text-gray-400 text-sm md:text-base mt-6 md:mt-8">
                    por {person.by}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="w-16 h-px bg-gray-200 mx-auto my-16 md:my-20"></div>

      {/* Philosophy Section */}
      <section className="bg-gray-50 py-16 md:py-24 px-4 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          {philosophyImage && (
            <img 
              src={philosophyImage} 
              alt="Filosofia" 
              className="w-full max-w-5xl h-[50vh] md:h-[70vh] object-cover mx-auto mb-12 md:mb-16"
              loading="lazy"
            />
          )}
          
          {closing.text && closing.text.length > 0 && (
            <>
              {closing.text.slice(0, -1).map((paragraph: string, index: number) => (
                <p 
                  key={index}
                  className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-600 mb-8 md:mb-10"
                >
                  {paragraph}
                </p>
              ))}
              
              {closing.text[closing.text.length - 1] && (
                <p className="font-['Playfair_Display',serif] text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed text-black my-12 md:my-16 italic">
                  {closing.text[closing.text.length - 1]}
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Social Section */}
      <section className="bg-gray-50 py-12 md:py-16 px-4 md:px-10 text-center">
        <h3 className="text-sm md:text-base uppercase tracking-widest text-gray-400 mb-6 md:mb-8">
          Siga-nos nas redes sociais
        </h3>
        <div className="flex justify-center gap-8 md:gap-10 flex-wrap">
          <a 
            href="https://www.instagram.com/lucaslimafotografia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors text-sm md:text-base uppercase tracking-wide"
          >
            Instagram
          </a>
          <a 
            href="https://www.pinterest.com/lucaslimafotografia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors text-sm md:text-base uppercase tracking-wide"
          >
            Pinterest
          </a>
          <a 
            href="https://www.facebook.com/lucaslimafotografia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors text-sm md:text-base uppercase tracking-wide"
          >
            Facebook
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-10 text-center">
        <a 
          href="#contact" 
          className="inline-block px-12 md:px-16 py-4 md:py-5 bg-black text-white text-sm md:text-base uppercase tracking-widest border-2 border-black hover:bg-transparent hover:text-black transition-all duration-300"
        >
          Verificar Disponibilidade
        </a>
      </section>

      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
