import React from 'react';
import { Language } from '../types';
import { getContent } from '../contentSource';

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = getContent(lang).contact;

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-16 flex flex-col">
      <div className="max-w-7xl w-full mx-auto">
        <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-16 text-black whitespace-pre-line">
          {t.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Contact Info Sidebar */}
            <div className="md:col-span-4 flex flex-col justify-between h-full">
                <div>
                   <p className="text-xs font-bold uppercase tracking-widest mb-4 text-black">{t.direct}</p>
                   
                   <a href="mailto:contato@lucaslimafotografia.com" className="text-lg font-bold underline block mb-2 text-black hover:opacity-70 transition-opacity">
                     contato@lucaslimafotografia.com
                   </a>
                   
                   <a href="tel:+5511984920048" className="text-lg font-bold block text-black hover:opacity-70 transition-opacity">
                     +55 11 98492-0048
                   </a>

                   <a 
                     href="https://wa.me/5511984920048" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors text-black"
                   >
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                     </svg>
                     {t.whatsapp}
                   </a>
                </div>

                <div className="mt-12 md:mt-0 text-sm text-black font-medium leading-relaxed uppercase tracking-wider max-w-xs">
                    {t.infoText}
                </div>
            </div>

            {/* Form */}
            <div className="md:col-span-8">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    <div className="group">
                        <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.name}</label>
                        <input type="text" className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.email}</label>
                        <input type="email" className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.type}</label>
                        <select className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors appearance-none rounded-none">
                            {t.form.types.map((opt, i) => (
                                <option key={i}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.date}</label>
                        <input type="date" className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="group md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.location}</label>
                        <input type="text" className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.time}</label>
                        <input type="time" className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.guests}</label>
                        <input type="number" min={0} className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="group md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.planner}</label>
                        <input type="text" className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="group md:col-span-2">
                         <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.found}</label>
                        <input type="text" className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors" />
                    </div>
                     <div className="group md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-black mb-2">{t.form.message}</label>
                        <textarea rows={4} className="w-full bg-transparent border-b border-gray-400 py-2 text-xl font-serif text-black focus:outline-none focus:border-black transition-colors resize-none"></textarea>
                    </div>
                    
                    <div className="md:col-span-2 flex items-center gap-4 mt-8">
                         <input type="checkbox" id="consent" className="w-5 h-5 border-2 border-black rounded-none focus:ring-0 text-black" />
                         <label htmlFor="consent" className="text-xs uppercase text-black font-bold tracking-wider">{t.form.consent}</label>
                    </div>

                    <div className="md:col-span-2 mt-8 flex justify-end">
                        <button type="submit" className="bg-black text-white px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                            {t.form.submit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};