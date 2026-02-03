import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Language } from '../types';
import { getContent } from '../contentSource';

interface FAQProps {
  lang: Language;
}

export const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = getContent(lang).faq;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-white pt-32 pb-20 px-4 md:px-16 flex flex-col">
       <div className="max-w-4xl mx-auto w-full">
           <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-16 border-b border-black pb-8 text-black">
             {t.title}
           </h2>
           
           <div className="flex flex-col">
              {t.items.map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                   <button 
                     onClick={() => toggleFAQ(index)}
                     className="w-full py-8 flex justify-between items-center text-left group hover:bg-gray-50 transition-colors px-2"
                   >
                      <span className="text-lg md:text-2xl font-bold uppercase tracking-wide pr-8 text-black">{item.question}</span>
                      <span className="flex-shrink-0 text-black">
                         {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                      </span>
                   </button>
                   
                   <div 
                     className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
                   >
                      <p className="text-lg md:text-xl font-serif italic text-black leading-relaxed px-2 whitespace-pre-line">
                        {item.answer}
                      </p>
                   </div>
                </div>
              ))}
           </div>
       </div>
    </div>
  );
};