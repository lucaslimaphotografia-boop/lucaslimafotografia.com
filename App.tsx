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
import { AdminPanel } from './components/AdminPanel';
import { Intro } from './components/Intro';
import { Menu } from 'lucide-react';
import { translations } from './translations';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ImageItem | null>(null);
  const [lang, setLang] = useState<Language>('pt');

  // Intro Animation Logic - agora controlado pelo componente Intro
  // Mantido para compatibilidade com outros componentes que dependem de introFinished

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

  // Admin access via keyboard shortcut (Ctrl/Cmd + Shift + K) or URL parameter
  useEffect(() => {
    // Verificar se há parâmetro na URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setCurrentView(ViewState.ADMIN);
      // Limpar o parâmetro da URL sem recarregar
      window.history.replaceState({}, '', window.location.pathname);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        setCurrentView(ViewState.ADMIN);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case ViewState.ADMIN:
        return <AdminPanel onBack={() => setCurrentView(ViewState.HOME)} lang={lang} />;
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
      
      {/* Intro Overlay com novo logo animado */}
      {!introFinished && (
        <Intro onFinish={() => setIntroFinished(true)} />
      )}

      {/* Fixed Header (Logo) */}
      {currentView !== ViewState.DETAILS && (
        <div 
            className={`fixed top-8 left-8 z-40 cursor-pointer mix-blend-difference group transition-opacity duration-1000 ${!introFinished && !fadeOut ? 'opacity-0' : 'opacity-100'}`} 
            onClick={() => setCurrentView(ViewState.HOME)}
        >
            <img 
              src="https://res.cloudinary.com/di6xabxne/image/upload/v1769109817/LOGO_BRANCO_PNG_qsi22a.png"
              alt="LUCASLIMA STUDIO"
              className="h-24 md:h-40 w-auto"
            />
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
            
            {currentView !== ViewState.HOME && currentView !== ViewState.ABOUT && (
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
        onAdminAccess={() => setCurrentView(ViewState.ADMIN)}
      />

    </div>
  );
}