import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = translations[lang].about;

  // Verificar se people existe e tem dados
  const people = (t as any).people || [];
  const intro = (t as any).intro || {};
  const closing = (t as any).closing || {};

  if (!people || !Array.isArray(people) || people.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Carregando informações...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* Hero Introduction Section */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 tracking-tight text-black leading-none whitespace-pre-line">
            {t.title}
          </h1>
          {intro.text && (
            <div className="mt-16 space-y-4">
              <p className="text-2xl md:text-3xl font-light text-black leading-relaxed">
                {intro.text}
              </p>
              {intro.subtext && (
                <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto mt-8">
                  {intro.subtext}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* People Sections */}
      {people.map((person: any, index: number) => (
        <section 
          key={index} 
          className="min-h-screen flex flex-col md:flex-row"
        >
          {/* Image Section - Full height on desktop */}
          <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative">
            <img 
              src={person.image} 
              alt={person.name} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 md:py-24 bg-white">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 text-black leading-tight">
                {person.name}
              </h2>
              {person.role && (
                <p className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 font-normal mb-12">
                  {person.role}
                </p>
              )}
              
              <div className="space-y-6 text-base md:text-lg lg:text-xl leading-relaxed text-gray-800 font-light">
                {person.bio && Array.isArray(person.bio) && person.bio.map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className="leading-[1.8]">{paragraph}</p>
                ))}
              </div>

              {person.by && (
                <p className="mt-8 text-sm text-gray-500 italic">
                  by {person.by}
                </p>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Closing Section */}
      {closing.text && (
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-24 bg-white">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {closing.text.map((paragraph: string, index: number) => (
              <p 
                key={index} 
                className="text-lg md:text-xl lg:text-2xl font-light text-black leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};