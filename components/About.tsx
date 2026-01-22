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

  if (!people || !Array.isArray(people) || people.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Carregando informações...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {people.map((person: any, index: number) => (
        <div 
          key={index} 
          className={`w-full min-h-screen flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
          {/* Image Section */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative">
            <img 
              src={person.image} 
              alt={person.name} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 min-h-screen md:h-auto md:min-h-screen px-8 py-20 md:p-24 flex flex-col justify-center bg-white">
            <div className="mb-8">
              <h3 className="text-4xl md:text-5xl font-serif italic mb-6 text-black">{person.name}</h3>
              {person.role && (
                <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-8">{person.role}</p>
              )}
            </div>
            
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-800 font-light text-justify md:text-left">
              {person.bio && Array.isArray(person.bio) && person.bio.map((paragraph: string, pIndex: number) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};