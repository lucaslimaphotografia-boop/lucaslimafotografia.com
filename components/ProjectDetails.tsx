import React from 'react';
import { ImageItem, Language } from '../types';
import { translations } from '../translations';

interface ProjectDetailsProps {
  project: ImageItem;
  onBack: () => void;
  onMenuOpen: () => void;
  lang: Language;
}

const albumImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1511285560982-1351c4f809b9?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1519225468359-2996bc017a12?q=80&w=800&auto=format&fit=crop", 
];

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack, onMenuOpen, lang }) => {
  const t = translations[lang].details;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
      
      {/* Custom Navigation for Details View */}
      <div 
        onClick={onBack}
        className="fixed top-0 bottom-0 left-0 z-[60] w-12 md:w-16 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors group mix-blend-difference text-white"
      >
        <span 
            className="uppercase font-bold tracking-widest text-xs md:text-sm"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
            {t.back}
        </span>
      </div>

      <div 
        onClick={onMenuOpen}
        className="fixed top-0 bottom-0 right-0 z-[60] w-12 md:w-16 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors group mix-blend-difference text-white"
      >
        <span 
            className="uppercase font-bold tracking-widest text-xs md:text-sm"
            style={{ writingMode: 'vertical-rl' }}
        >
            {t.menu}
        </span>
      </div>

      {/* Floating Logo Top Center */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] text-center mix-blend-difference text-white pointer-events-none">
        <h1 className="font-bold uppercase tracking-tighter text-sm md:text-base">LUCASLIMA</h1>
      </div>

      {/* Floating Page Number Bottom Left */}
      <div className="fixed bottom-8 left-8 z-[60] mix-blend-difference text-white hidden md:block">
         <span className="font-bold text-xl tracking-tighter">01</span>
      </div>
       {/* Floating Credits Bottom Right */}
      <div className="fixed bottom-8 right-8 z-[60] mix-blend-difference text-white hidden md:block">
         <span className="font-bold text-xs uppercase tracking-widest" style={{ writingMode: 'vertical-rl'}}>
             {t.credits}
         </span>
      </div>

      {/* --- SLIDE 1: INTRO (Split Screen) --- */}
      <section className="w-full h-screen snap-start flex flex-col md:flex-row relative">
         {/* Left: Text Content */}
         <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex flex-col items-center justify-center p-8 md:p-20 relative order-2 md:order-1">
            <div className="text-center">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-500 whitespace-pre-line">
                    {t.intro.location}
                </span>
                <h1 className="text-6xl md:text-8xl font-serif italic mb-2 leading-none">
                    {project.title?.split(' ')[0] || 'Marisa'} <span className="text-4xl md:text-6xl not-italic font-light">&</span>
                </h1>
                <h1 className="text-6xl md:text-8xl font-serif italic leading-none">
                    {project.title?.split(' ')[1] || 'Andrew'}
                </h1>
            </div>
         </div>

         {/* Right: Hero Image */}
         <div className="w-full md:w-1/2 h-1/2 md:h-full relative order-1 md:order-2">
            <img 
                src={project.url} 
                alt={project.title} 
                className="w-full h-full object-cover"
            />
         </div>
      </section>

      {/* --- SLIDE 2: DOUBLE IMAGE (B&W + Color) --- */}
      <section className="w-full h-screen snap-start flex flex-col md:flex-row bg-white">
          <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 md:p-12 flex items-center justify-center">
             <div className="w-full h-full relative overflow-hidden">
                <img 
                    src={albumImages[3]} 
                    alt="Detail 1" 
                    className="w-full h-full object-cover grayscale contrast-125"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 md:p-12 flex items-center justify-center">
            <div className="w-full h-full relative overflow-hidden">
                <img 
                    src={albumImages[1]} 
                    alt="Detail 2" 
                    className="w-full h-full object-cover"
                />
             </div>
          </div>
      </section>

      {/* --- SLIDE 3: FULL SCREEN IMMERSIVE --- */}
      <section className="w-full h-screen snap-start relative">
         <img 
            src={albumImages[2]} 
            alt="Party" 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
             <h2 className="text-white font-serif italic text-6xl md:text-9xl opacity-90">{t.immersive}</h2>
         </div>
      </section>

      {/* --- SLIDE 4: CENTERED PORTRAIT --- */}
      <section className="w-full h-screen snap-start bg-[#f5f5f5] flex items-center justify-center p-8 md:p-24">
         <div className="h-full aspect-[3/4] shadow-2xl relative">
            <img 
                src={albumImages[0]} 
                alt="Portrait" 
                className="w-full h-full object-cover"
            />
            <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-serif italic text-2xl text-gray-400 whitespace-nowrap">
                {t.portrait}
            </span>
         </div>
      </section>

    </div>
  );
};