import React, { useState, useEffect } from 'react';
import { ViewState, ImageItem, Language } from './types';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { ProjectDetails } from './components/ProjectDetails';
import { FAQ } from './components/FAQ';
import { Photobook } from './components/Photobook';
import { MenuOverlay } from './components/MenuOverlay';
import { VerticalNav } from './components/VerticalNav';
import { ClaudeChat } from './components/ClaudeChat';
import { Menu } from 'lucide-react';
import { translations } from './translations';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ImageItem | null>(null);
  const [lang, setLang] = useState<Language>('pt');

  // Intro Animation Logic
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      setIntroFinished(true);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const getTextColor = () => {
    if (currentView === ViewState.HOME) return 'white';
    if (currentView === ViewState.PORTFOLIO) return 'black'; 
    return 'black';
  };

  const handleImageClick = (image: ImageItem) => {
    setSelectedProject(image);
    setCurrentView(ViewState.DETAILS);
  };

  const toggleLang = () => {
    setLang(prev => prev === 'pt' ? 'en' : 'pt');
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Hero />;
      case ViewState.PORTFOLIO:
        return <Gallery onImageClick={handleImageClick} lang={lang} />;
      case ViewState.CONTACT:
        return <Contact lang={lang} />;
      case ViewState.ABOUT:
        return <About lang={lang} />;
      case ViewState.TESTIMONIALS:
        return <Testimonials lang={lang} />;
      case ViewState.FAQ:
        return <FAQ lang={lang} />;
      case ViewState.PHOTOBOOK:
        return <Photobook lang={lang} />;
      case ViewState.DETAILS:
        if (selectedProject) {
            return (
                <ProjectDetails 
                    project={selectedProject} 
                    onBack={() => setCurrentView(ViewState.PORTFOLIO)}
                    onMenuOpen={() => setIsMenuOpen(true)}
                    lang={lang}
                />
            );
        }
        return <Gallery onImageClick={handleImageClick} lang={lang} />;
      default:
        return <Hero />;
    }
  };

  const t = translations[lang];

  return (
    <div className="relative w-full min-h-screen bg-white transition-colors duration-500">
      
      {/* Intro Overlay */}
      {!introFinished && (
        <div 
          className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
           <div className="flex flex-col items-center text-white animate-slide-up">
              <h1 className="font-black uppercase tracking-tighter text-4xl md:text-6xl leading-none">LUCASLIMA</h1>
              <span className="text-xs md:text-sm tracking-[0.5em] font-light mt-2">STUDIO</span>
           </div>
        </div>
      )}

      {/* Fixed Header (Logo) */}
      {currentView !== ViewState.DETAILS && (
        <div 
            className={`fixed top-8 left-8 z-40 cursor-pointer mix-blend-difference text-white group transition-opacity duration-1000 ${!introFinished && !fadeOut ? 'opacity-0' : 'opacity-100'}`} 
            onClick={() => setCurrentView(ViewState.HOME)}
        >
            <div className="flex flex-col items-center">
            <h1 className="font-black uppercase tracking-tighter text-2xl md:text-3xl leading-none">LUCASLIMA</h1>
            <span className="text-[0.5rem] md:text-[0.6rem] tracking-[0.3em] font-light mt-1">STUDIO</span>
            </div>
        </div>
      )}

      {/* Language Toggle (Desktop & Mobile) */}
      <div className={`fixed top-8 right-20 md:right-24 z-50 transition-opacity duration-1000 ${!introFinished ? 'opacity-0' : 'opacity-100'}`}>
          <button 
             onClick={toggleLang}
             className={`text-xs font-bold tracking-widest uppercase hover:opacity-60 transition-opacity mix-blend-difference text-white`}
          >
             {lang === 'pt' ? 'EN' : 'PT'}
          </button>
      </div>

      {/* Vertical Navigation (Desktop) */}
      {currentView !== ViewState.DETAILS && (
        <div className={`hidden md:block transition-opacity duration-1000 ${!introFinished ? 'opacity-0' : 'opacity-100'}`}>
            <VerticalNav 
                text={t.nav.menu}
                position="right" 
                onClick={() => setIsMenuOpen(true)} 
                color={getTextColor()}
            />
            
            {currentView !== ViewState.HOME && (
                <VerticalNav 
                text={t.nav.home}
                position="left" 
                onClick={() => setCurrentView(ViewState.HOME)}
                color={getTextColor()}
                />
            )}
        </div>
      )}

      {/* Mobile Menu Trigger */}
      {currentView !== ViewState.DETAILS && (
        <div className={`md:hidden fixed top-8 right-8 z-40 transition-opacity duration-1000 ${!introFinished ? 'opacity-0' : 'opacity-100'}`}>
            <button onClick={() => setIsMenuOpen(true)} className="p-2">
                <Menu className={`w-6 h-6 ${currentView === ViewState.HOME ? 'text-white' : 'text-black'}`} />
            </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full min-h-screen transition-opacity duration-500 ease-in-out">
        {renderView()}
      </main>

      {/* Menu Overlay */}
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={(view) => {
            setCurrentView(view);
            if (view !== ViewState.DETAILS) {
                setSelectedProject(null);
            }
        }}
        lang={lang}
      />

      {/* Claude Chat */}
      <ClaudeChat lang={lang} />

    </div>
  );
}