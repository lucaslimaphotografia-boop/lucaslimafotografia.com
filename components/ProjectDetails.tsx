import React, { useState, useEffect, useRef } from 'react';
import { ImageItem, Language } from '../types';
import { translations } from '../translations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetailsProps {
  project: ImageItem;
  onBack: () => void;
  onMenuOpen: () => void;
  lang: Language;
}

// Usa as fotos do álbum do projeto, ou fotos padrão se não houver álbum
const getAlbumImages = (project: ImageItem): string[] => {
  if (project.album && project.album.length > 0) {
    return project.album;
  }
  return [project.url];
};

interface ImageInfo {
  url: string;
  index: number;
  isVertical: boolean;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack, onMenuOpen, lang }) => {
  const t = translations[lang].details;
  const albumImages = getAlbumImages(project);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const [imageOrientations, setImageOrientations] = useState<Map<number, boolean>>(new Map());
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);
  const scrollRafRef = useRef<number | null>(null);
  const lastSlideRef = useRef(0);

  // Detectar mobile
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Detectar orientação das imagens (só usado no desktop para agrupar)
  useEffect(() => {
    const orientations = new Map<number, boolean>();
    let loadedCount = 0;

    albumImages.forEach((url, index) => {
      const img = new Image();
      img.onload = () => {
        const isVertical = img.height > img.width;
        orientations.set(index, isVertical);
        loadedCount++;
        
        if (loadedCount === albumImages.length) {
          setImageOrientations(orientations);
        }
      };
      img.src = url;
    });
  }, [albumImages]);

  // Desktop: agrupar verticais de 2 em 2. Mobile: uma foto por slide (sem agrupar)
  const groupedSlides = React.useMemo(() => {
    if (isMobile) {
      return albumImages.map((url) => url);
    }
    const groups: (string | string[])[] = [];
    let i = 0;

    while (i < albumImages.length) {
      const isVertical = imageOrientations.get(i) ?? false;
      
      if (isVertical && i + 1 < albumImages.length) {
        const nextIsVertical = imageOrientations.get(i + 1) ?? false;
        if (nextIsVertical) {
          groups.push([albumImages[i], albumImages[i + 1]]);
          i += 2;
        } else {
          groups.push(albumImages[i]);
          i += 1;
        }
      } else {
        groups.push(albumImages[i]);
        i += 1;
      }
    }

    return groups;
  }, [albumImages, imageOrientations, isMobile]);

  const totalSlides = groupedSlides.length + 1; // +1 para o slide de introdução

  // Parse project title para extrair nomes
  const parseTitle = (title?: string) => {
    if (!title) return { first: 'Carol', second: 'Ricardo' };
    const parts = title.split('&').map(s => s.trim());
    if (parts.length === 2) {
      return { first: parts[0], second: parts[1] };
    }
    const words = title.split(' ');
    if (words.length >= 2) {
      return { first: words[0], second: words.slice(1).join(' ') };
    }
    return { first: title, second: '' };
  };

  const { first, second } = parseTitle(project.title);

  // Scroll to slide
  useEffect(() => {
    lastSlideRef.current = currentSlide;
    if (containerRef.current) {
      const slides = containerRef.current.querySelectorAll('section');
      if (slides[currentSlide]) {
        slides[currentSlide].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [totalSlides, onBack]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndRef.current = e.changedTouches[0].clientY;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swipe up - next slide
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else {
        // Swipe down - previous slide
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    }
  };

  // Track scroll position to update current slide (throttled com RAF para rolagem suave)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        const slides = container.querySelectorAll('section');
        const containerTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const viewportCenter = containerTop + containerHeight / 2;

        for (let index = 0; index < slides.length; index++) {
          const slide = slides[index] as HTMLElement;
          const slideTop = slide.offsetTop;
          const slideHeight = slide.clientHeight;
          if (viewportCenter >= slideTop && viewportCenter < slideTop + slideHeight) {
            if (lastSlideRef.current !== index) {
              lastSlideRef.current = index;
              setCurrentSlide(index);
            }
            break;
          }
        }
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current != null) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  // Image loading handler
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => new Set(prev).add(index));
  };

  // Format page number
  const formatPageNumber = (num: number) => {
    return String(num + 1).padStart(2, '0');
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar overscroll-none"
      style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* Navigation - Back (Left) */}
      <div 
        onClick={onBack}
        className="fixed top-0 bottom-0 left-0 z-[60] w-12 md:w-16 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group"
      >
        <span 
          className="uppercase font-bold tracking-widest text-xs md:text-sm text-white mix-blend-difference"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {t.back}
        </span>
      </div>

      {/* Navigation - Menu (Right) */}
      <div 
        onClick={onMenuOpen}
        className="fixed top-0 bottom-0 right-0 z-[60] w-12 md:w-16 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group"
      >
        <span 
          className="uppercase font-bold tracking-widest text-xs md:text-sm text-white mix-blend-difference"
          style={{ writingMode: 'vertical-rl' }}
        >
          {t.menu}
        </span>
      </div>

      {/* Logo Top Center */}
      <div 
        className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] text-center cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onBack}
      >
        <img 
          src="https://res.cloudinary.com/di6xabxne/image/upload/v1769109817/LOGO_BRANCO_PNG_qsi22a.png"
          alt="LUCASLIMA STUDIO"
          className="h-6 md:h-8 w-auto mx-auto mix-blend-difference"
        />
      </div>

      {/* Page Number Bottom Left */}
      <div className="fixed bottom-8 left-8 z-[60] text-white mix-blend-difference">
        <span className="font-bold text-xl md:text-2xl tracking-tighter">
          {formatPageNumber(currentSlide)}
        </span>
      </div>

      {/* Credits Bottom Right */}
      <div className="fixed bottom-8 right-8 z-[60] text-white mix-blend-difference hidden md:block">
        <span 
          className="font-bold text-xs uppercase tracking-widest"
          style={{ writingMode: 'vertical-rl' }}
        >
          {t.credits}
        </span>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[61]">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Slide 1: Introduction */}
      <section className="w-full h-screen snap-start flex flex-col md:flex-row relative bg-black">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center p-8 md:p-20 relative order-2 md:order-1">
          <div className="text-center text-white">
            <span className="block text-xs font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 text-white/60 whitespace-pre-line">
              {project.category || t.intro.location}
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif italic mb-2 leading-none">
              {first} <span className="text-3xl md:text-5xl lg:text-6xl not-italic font-light">&</span>
            </h1>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif italic leading-none">
              {second}
            </h1>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative order-1 md:order-2 flex items-center justify-center bg-black">
          <img 
            src={project.url} 
            alt={project.title || 'Wedding'} 
            className="w-full h-full object-contain"
            onLoad={() => handleImageLoad(0)}
          />
        </div>
      </section>

      {/* Photo Slides - Fullscreen */}
      {groupedSlides.map((slide, groupIndex) => {
        const slideIndex = groupIndex + 1;
        const isGroup = Array.isArray(slide);
        
        if (isGroup && slide.length === 2) {
          // Duas imagens verticais lado a lado (desktop)
          const [img1, img2] = slide;
          const img1Index = albumImages.indexOf(img1);
          const img2Index = albumImages.indexOf(img2);
          const img1Loaded = imagesLoaded.has(img1Index + 1);
          const img2Loaded = imagesLoaded.has(img2Index + 1);

          return (
            <section 
              key={groupIndex}
              className="w-full h-screen snap-start relative bg-black flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center gap-2 md:gap-4 px-2 md:px-4">
                {(!img1Loaded || !img2Loaded) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {/* Primeira imagem vertical */}
                <div className="relative w-1/2 h-full flex items-center justify-center">
                  <img 
                    src={img1} 
                    alt={`${project.title} - Photo ${img1Index + 1}`}
                    className="w-full h-full object-contain"
                    onLoad={() => handleImageLoad(img1Index + 1)}
                    style={{ opacity: img1Loaded ? 1 : 0, transition: 'opacity 0.5s' }}
                  />
                </div>
                {/* Segunda imagem vertical */}
                <div className="relative w-1/2 h-full flex items-center justify-center">
                  <img 
                    src={img2} 
                    alt={`${project.title} - Photo ${img2Index + 1}`}
                    className="w-full h-full object-contain"
                    onLoad={() => handleImageLoad(img2Index + 1)}
                    style={{ opacity: img2Loaded ? 1 : 0, transition: 'opacity 0.5s' }}
                  />
                </div>
              </div>
            </section>
          );
        } else {
          // Imagem única (horizontal ou vertical sozinha)
          const imageUrl = Array.isArray(slide) ? slide[0] : slide;
          const originalIndex = albumImages.indexOf(imageUrl);
          const isLoaded = imagesLoaded.has(originalIndex + 1);

          return (
            <section 
              key={groupIndex}
              className="w-full h-screen snap-start relative bg-black flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <img 
                  src={imageUrl} 
                  alt={`${project.title} - Photo ${originalIndex + 1}`}
                  className="w-full h-full object-contain"
                  onLoad={() => handleImageLoad(originalIndex + 1)}
                  style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
                />
              </div>
            </section>
          );
        }
      })}

      {/* Navigation Arrows (Desktop) */}
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))}
          className="fixed bottom-1/2 right-8 z-[60] w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors mix-blend-difference hidden md:flex"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {currentSlide > 0 && (
        <button
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          className="fixed bottom-1/2 left-8 z-[60] w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors mix-blend-difference hidden md:flex"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Hint */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] text-white/60 text-xs uppercase tracking-widest text-center md:hidden pointer-events-none">
        Tap to see more
      </div>
    </div>
  );
};
