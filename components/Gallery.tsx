import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { ImageItem, GalleryProps, Language } from '../types';
import { translations } from '../translations';

const sampleImages: ImageItem[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1511285560982-1351c4f809b9?q=80&w=800&auto=format&fit=crop', category: 'Detalhes', title: 'Alianças em Ouro' },
  { id: 2, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', category: 'Noiva', title: 'Retrato no Jardim' },
  { id: 3, url: 'https://images.unsplash.com/photo-1519225468359-2996bc017a12?q=80&w=800&auto=format&fit=crop', category: 'Festa', title: 'Saída dos Noivos' },
  { id: 4, url: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=800&auto=format&fit=crop', category: 'Preto & Branco', title: 'Dança Espontânea' },
  { id: 5, url: 'https://images.unsplash.com/photo-1520854226103-38f5c5b7d629?q=80&w=800&auto=format&fit=crop', category: 'Editorial', title: 'Sessão de Moda' },
  { id: 6, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', category: 'Noiva', title: 'Véu ao Vento' },
  { id: 7, url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop', category: 'Festa', title: 'Brinde dos Padrinhos' },
  { id: 8, url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop', category: 'Detalhes', title: 'Decoração de Mesa' },
  { id: 9, url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop', category: 'Noivo', title: 'Preparação do Noivo' },
  { id: 10, url: 'https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=800&auto=format&fit=crop', category: 'Preto & Branco', title: 'Olhares' },
  { id: 11, url: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=800&auto=format&fit=crop', category: 'Editorial', title: 'Pôr do Sol na Praia' },
  { id: 12, url: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?q=80&w=800&auto=format&fit=crop', category: 'Imprensa', title: 'Publicação Vogue' },
];

export const Gallery: React.FC<GalleryProps> = ({ onImageClick, lang }) => {
  const t = translations[lang].gallery;
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const categoriesKeys = Object.keys(t.categories);
  const rotatingWords = t.rotatingWords;

  // Rotação automática das palavras
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const filteredImages = useMemo(() => {
    return sampleImages.filter(img => {
      const matchesCategory = activeCategory === "Todos" || img.category === activeCategory;
      
      // We search in original data, but we could also search in translated values
      const matchesSearch = 
        (img.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) || 
        img.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="w-full min-h-screen bg-white pt-32 px-4 md:px-16 pb-20">
      <div className="mb-12">
        <h2 className="text-5xl md:text-8xl font-bold uppercase text-gray-200 tracking-tighter mb-8 leading-none flex flex-wrap gap-x-4 md:gap-x-6 items-baseline">
          <span>{t.searchTitle}</span>
          <span key={rotatingWords[wordIndex]} className="text-black inline-block animate-slide-up">
            {rotatingWords[wordIndex]}
          </span>
        </h2>
        
        {/* Search & Filter Container */}
        <div className="flex flex-col gap-8">
          
          {/* Search Input */}
          <div className="relative max-w-md w-full border-b border-gray-300 focus-within:border-black transition-colors group">
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-8 pr-4 bg-transparent outline-none font-serif text-xl placeholder-gray-400 text-black"
            />
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            {categoriesKeys.map(catKey => (
              <button 
                key={catKey}
                onClick={() => {
                   setActiveCategory(catKey);
                }}
                className={`uppercase text-xs md:text-sm font-bold tracking-widest transition-colors ${activeCategory === catKey ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {/* Display translated category name */}
                {t.categories[catKey as keyof typeof t.categories]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredImages.map((img) => (
            <div 
                key={img.id} 
                onClick={() => onImageClick(img)}
                className="group cursor-pointer relative overflow-hidden aspect-[3/4]"
            >
                <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="block text-white text-lg font-serif italic leading-none mb-1">{img.title}</span>
                    <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        {t.categories[img.category as keyof typeof t.categories] || img.category}
                    </span>
                </div>
            </div>
            ))}
        </div>
      ) : (
        <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400">
            <p className="text-xl font-serif italic">{t.noResults}</p>
            <button onClick={() => {setSearchTerm(""); setActiveCategory("Todos")}} className="mt-4 text-xs font-bold uppercase tracking-widest underline text-black">{t.clearFilters}</button>
        </div>
      )}
    </div>
  );
};