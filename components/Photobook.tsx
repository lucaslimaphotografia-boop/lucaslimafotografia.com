import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface PhotobookProps {
  lang: Language;
}

export const Photobook: React.FC<PhotobookProps> = ({ lang }) => {
  const t = translations[lang].photobook;

  return (
    <div className="w-full min-h-screen bg-[#f8f8f8] pt-32 pb-20 px-4 md:px-16 flex flex-col">
        <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-300 pb-8">
                <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none whitespace-pre-line">
                    {t.title}
                </h1>
                <p className="md:max-w-md text-right text-gray-500 mt-8 md:mt-0 font-serif italic">
                    {t.quote}
                </p>
            </div>

            {/* Hero Section - Open Book */}
            <div className="w-full aspect-video bg-gray-200 mb-24 relative overflow-hidden shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1600&auto=format&fit=crop" 
                    alt="Open Photobook" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <span className="bg-white px-6 py-3 uppercase tracking-widest text-xs font-bold">{t.collection}</span>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                {t.features.map((feature, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                        <div className="w-full aspect-square bg-gray-300 mb-6 overflow-hidden">
                            <img src={`https://images.unsplash.com/photo-${i === 0 ? '1626292305367-15c4644558e8' : i === 1 ? '1606822366887-432d5c21f006' : '1544816155-12df9643f363'}?q=80&w=600&auto=format&fit=crop`} className="w-full h-full object-cover"/>
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-2">{feature.title}</h3>
                        <p className="text-gray-500 font-serif text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>

             {/* Magazine Section */}
             <div className="flex flex-col md:flex-row gap-16 items-center bg-white p-8 md:p-16">
                 <div className="w-full md:w-1/2">
                    <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">{t.magazine.title}</h2>
                    <p className="font-serif text-lg text-gray-600 leading-relaxed mb-8">
                        {t.magazine.desc}
                    </p>
                    <button className="border-b-2 border-black pb-1 uppercase text-xs font-bold tracking-widest hover:text-gray-600 transition-colors">
                        {t.magazine.cta}
                    </button>
                 </div>
                 <div className="w-full md:w-1/2 aspect-[3/4] shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img 
                        src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop" 
                        alt="Magazine Mockup" 
                        className="w-full h-full object-cover"
                    />
                 </div>
             </div>
        </div>
    </div>
  );
};