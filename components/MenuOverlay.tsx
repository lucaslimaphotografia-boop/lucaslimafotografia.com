import React from 'react';
import { X } from 'lucide-react';
import { ViewState, NavItem, Language } from '../types';
import { translations } from '../translations';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewState) => void;
  lang: Language;
  onAdminAccess?: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, onNavigate, lang, onAdminAccess }) => {
  if (!isOpen) return null;

  const t = translations[lang].menu;

  const navItems: NavItem[] = [
    { label: t.portfolio, view: ViewState.PORTFOLIO },
    { label: t.about, view: ViewState.ABOUT },
    { label: t.testimonials, view: ViewState.TESTIMONIALS },
    { label: t.contact, view: ViewState.CONTACT },
  ];

  const handleLinkClick = (view: ViewState) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black text-white flex flex-col">
      {/* Header inside Menu */}
      <div className="flex justify-between items-center p-8">
        <div className="flex flex-col items-center leading-none">
            <span className="text-2xl font-black tracking-tighter uppercase">LUCASLIMA</span>
            <span className="text-[0.5rem] tracking-[0.3em] font-light mt-1">STUDIO</span>
        </div>
        <button onClick={onClose} className="group flex items-center gap-2 cursor-pointer">
           <span className="uppercase text-sm tracking-widest font-bold group-hover:opacity-70">{t.close}</span>
           <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Links */}
      <div className="flex-1 flex flex-col justify-end pb-12 px-8 md:px-20 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleLinkClick(item.view)}
            className="text-left text-4xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-4 hover:italic hover:text-gray-300 transition-all duration-300"
          >
            {item.label}
          </button>
        ))}
        
        {/* External Link: Instagram */}
        <a 
            href="https://www.instagram.com/lucaslimafotografia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-left text-4xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-4 hover:italic hover:text-gray-300 transition-all duration-300"
        >
            {t.instagram}
        </a>
      </div>

      {/* Footer Links inside Menu */}
      <div className="flex flex-col md:flex-row justify-between items-end p-8 md:px-20 text-xs md:text-sm uppercase tracking-widest text-gray-400">
         <div className="flex flex-col gap-2 mb-4 md:mb-0">
            <span className="cursor-pointer hover:text-white transition-colors">{t.privacy}</span>
            <span className="cursor-pointer hover:text-white transition-colors">{t.rights}</span>
            <span className="cursor-pointer hover:text-white transition-colors">{t.projects}</span>
         </div>
         <div className="flex flex-col items-end gap-2 text-right">
            <button 
                onClick={() => handleLinkClick(ViewState.PHOTOBOOK)} 
                className="text-white hover:italic transition-all"
            >
                {t.albums}
            </button>
            <button 
                onClick={() => handleLinkClick(ViewState.PORTFOLIO)} 
                className="text-white hover:italic transition-all"
            >
                {t.search}
            </button>
            <button 
                onClick={() => handleLinkClick(ViewState.FAQ)} 
                className="text-white hover:italic transition-all"
            >
                {t.faq}
            </button>
            {onAdminAccess && (
              <button 
                  onClick={() => {
                    onAdminAccess();
                    onClose();
                  }} 
                  className="text-gray-500 hover:text-white transition-all text-[0.65rem] mt-2"
                  title="Painel Admin (Ctrl+Shift+K)"
              >
                  Admin
              </button>
            )}
         </div>
      </div>
    </div>
  );
};