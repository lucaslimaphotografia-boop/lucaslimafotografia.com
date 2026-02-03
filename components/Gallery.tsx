import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { ImageItem, GalleryProps, Language } from '../types';
import { translations } from '../translations';
import imagesData from '../images.json';

const sampleImages: ImageItem[] = imagesData.gallery as ImageItem[];

export const Gallery: React.FC<GalleryProps> = ({ onImageClick, lang }) => {
  const t = translations[lang].gallery;
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const categoriesKeys = Object.keys(t.categories);
  const rotatingWords = t.rotatingWords;
  const subcategories = (t as any).subcategories || {};

  // Rotação automática das palavras
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Reset subcategory when category changes
  useEffect(() => {
    setActiveSubcategory(null);
  }, [activeCategory]);

  const filteredImages = useMemo(() => {
    return sampleImages.filter(img => {
      // Suporta tanto string única quanto array de categorias
      const imgCategories = Array.isArray(img.category) ? img.category : [img.category];
      const matchesCategory = activeCategory === "Todos" || imgCategories.includes(activeCategory);
      
      // Suporta tanto string única quanto array de subcategorias
      const imgSubcategories = img.subcategory 
        ? (Array.isArray(img.subcategory) ? img.subcategory : [img.subcategory])
        : [];
      const matchesSubcategory = !activeSubcategory || imgSubcategories.includes(activeSubcategory);
      
      // We search in original data, but we could also search in translated values
      const categorySearchText = imgCategories.join(' ').toLowerCase();
      const subcategorySearchText = imgSubcategories.join(' ').toLowerCase();
      const matchesSearch = 
        (img.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) || 
        categorySearchText.includes(searchTerm.toLowerCase()) ||
        subcategorySearchText.includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSubcategory && matchesSearch;
    });
  }, [activeCategory, activeSubcategory, searchTerm]);

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
          <div className="flex flex-col gap-6">
            {/* Main Categories */}
            <div className="flex flex-wrap gap-4 md:gap-8">
              {categoriesKeys.map(catKey => (
                <button 
                  key={catKey}
                  onClick={() => {
                     setActiveCategory(catKey);
                     setActiveSubcategory(null);
                  }}
                  className={`uppercase text-xs md:text-sm font-bold tracking-widest transition-colors ${activeCategory === catKey ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {/* Display translated category name */}
                  {t.categories[catKey as keyof typeof t.categories]}
                </button>
              ))}
            </div>

            {/* Subcategories */}
            {activeCategory !== "Todos" && subcategories[activeCategory] && subcategories[activeCategory].length > 0 && (
              <div className="flex flex-wrap gap-3 md:gap-4">
                <button
                  onClick={() => setActiveSubcategory(null)}
                  className={`text-xs font-medium tracking-wide transition-colors ${!activeSubcategory ? 'text-black border-b border-black pb-1' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Todas
                </button>
                {subcategories[activeCategory].map((subcat: string) => (
                  <button
                    key={subcat}
                    onClick={() => setActiveSubcategory(subcat)}
                    className={`text-xs font-medium tracking-wide transition-colors ${activeSubcategory === subcat ? 'text-black border-b border-black pb-1' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {subcat}
                  </button>
                ))}
              </div>
            )}
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
                className={`group cursor-pointer relative overflow-hidden aspect-[3/4] ${img.displaySize === 'large' ? 'sm:col-span-2' : ''}`}
            >
                <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={img.focalPoint ? { objectPosition: `${img.focalPoint.x}% ${img.focalPoint.y}%` } : undefined}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="block text-white text-lg font-serif italic leading-none mb-1">{img.title}</span>
                    <div className="flex flex-col gap-1">
                      {(() => {
                        const categories = Array.isArray(img.category) ? img.category : [img.category];
                        return categories.map((cat, idx) => (
                          <span key={idx} className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                            {t.categories[cat as keyof typeof t.categories] || cat}
                          </span>
                        ));
                      })()}
                      {img.subcategory && (() => {
                        const subcategories = Array.isArray(img.subcategory) ? img.subcategory : [img.subcategory];
                        return subcategories.map((subcat, idx) => (
                          <span key={idx} className="bg-white/90 text-black text-[9px] font-medium px-2 py-0.5">
                            {subcat}
                          </span>
                        ));
                      })()}
                    </div>
                </div>
            </div>
            ))}
        </div>
      ) : (
        <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400">
            <p className="text-xl font-serif italic">{t.noResults}</p>
            <button onClick={() => {setSearchTerm(""); setActiveCategory("Todos"); setActiveSubcategory(null);}} className="mt-4 text-xs font-bold uppercase tracking-widest underline text-black">{t.clearFilters}</button>
        </div>
      )}
    </div>
  );
};