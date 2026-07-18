import React, { useState, useEffect } from 'react';
import { Menu, X, Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { REFLECTIONS_DATA } from '../data';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load bookmarks on mount & listen to updates
  useEffect(() => {
    const loadBookmarks = () => {
      const stored = localStorage.getItem('allan_bookmarks');
      if (stored) {
        try {
          setBookmarkedIds(JSON.parse(stored));
        } catch {
          setBookmarkedIds([]);
        }
      } else {
        setBookmarkedIds([]);
      }
    };
    
    loadBookmarks();
    window.addEventListener('bookmarks-updated', loadBookmarks);
    return () => window.removeEventListener('bookmarks-updated', loadBookmarks);
  }, []);

  const menuItems = [
    { label: 'Começo', id: 'inicio' },
    { label: 'Reflexão', id: 'reflexao' },
    { label: 'O Livro', id: 'livro' },
    { label: 'O Autor', id: 'autor' },
    { label: 'Ensaios', id: 'ensaios' },
    { label: 'Contato', id: 'contato' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleOpenBookmarkedEssay = (essayId: string) => {
    setIsBookmarksOpen(false);
    // Dispatch custom event to trigger the reader modal in Reflections.tsx
    window.dispatchEvent(new CustomEvent('open-essay', { detail: essayId }));
  };

  const handleRemoveBookmark = (essayId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = bookmarkedIds.filter(id => id !== essayId);
    setBookmarkedIds(next);
    localStorage.setItem('allan_bookmarks', JSON.stringify(next));
    window.dispatchEvent(new Event('bookmarks-updated'));
  };

  const handleClearAllBookmarks = () => {
    if (window.confirm("Deseja mesmo remover todos os ensaios marcados?")) {
      setBookmarkedIds([]);
      localStorage.removeItem('allan_bookmarks');
      window.dispatchEvent(new Event('bookmarks-updated'));
    }
  };

  const bookmarkedEssays = REFLECTIONS_DATA.filter(essay => bookmarkedIds.includes(essay.id));

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cream-50/85 backdrop-blur-md border-b border-cream-200/50 py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            onClick={() => scrollToSection('inicio')}
            className="group flex flex-col items-start text-left cursor-pointer"
          >
            <span className="font-serif text-lg md:text-xl tracking-tight text-charcoal-900 group-hover:text-bronze-500 transition-colors duration-300">
              Allan Conceição
            </span>
            <span className="font-mono text-[9px] tracking-widest text-bronze-500/80 uppercase mt-0.5">
              Só Percebi Depois
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-sans text-xs tracking-wider text-charcoal-800/80 hover:text-charcoal-900 focus:outline-none focus:text-bronze-500 hover:scale-105 transition-all duration-300 relative py-1 cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-bronze-500 after:scale-x-0 focus:after:scale-x-100 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Call to Action & Bookmark Button Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Bookmark button with notification count */}
            <button
              onClick={() => setIsBookmarksOpen(true)}
              className="relative p-2.5 text-charcoal-800 hover:text-bronze-500 transition-colors focus:outline-none flex items-center group cursor-pointer"
              aria-label="Ensaios salvos"
              title="Sua lista de ensaios salvos"
            >
              <Bookmark size={18} className="group-hover:scale-110 transition-transform" />
              {bookmarkedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-bronze-500 text-cream-50 font-mono text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-sm animate-pulse">
                  {bookmarkedIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => scrollToSection('livro')}
              className="px-5 py-2 border border-charcoal-900/10 hover:border-charcoal-900 focus:outline-none focus:ring-2 focus:ring-bronze-500/50 bg-transparent text-charcoal-900 font-sans text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer hover:bg-charcoal-900 hover:text-cream-50"
            >
              Adquirir Livro
            </button>
          </div>

          {/* Mobile Actions Container */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Bookmark button for mobile */}
            <button
              onClick={() => setIsBookmarksOpen(true)}
              className="relative p-2 text-charcoal-900 hover:text-bronze-500 transition-colors cursor-pointer"
              aria-label="Ver ensaios salvos"
            >
              <Bookmark size={18} />
              {bookmarkedIds.length > 0 && (
                <span className="absolute top-0 right-0 bg-bronze-500 text-cream-50 font-mono text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {bookmarkedIds.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-charcoal-900 hover:text-bronze-500 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/50 p-2 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] bg-cream-50 border-b border-cream-200 z-40 md:hidden shadow-xl"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left font-serif text-lg text-charcoal-900 py-2 border-b border-cream-100 last:border-0 hover:text-bronze-500 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('livro')}
                className="w-full py-3 bg-charcoal-900 text-cream-50 font-sans text-xs tracking-widest uppercase text-center hover:bg-bronze-600 transition-colors cursor-pointer"
              >
                Adquirir Livro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bookmarks Sliding Drawer (Refinement 2) */}
      <AnimatePresence>
        {isBookmarksOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookmarksOpen(false)}
              className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-xs cursor-pointer z-40"
            />
            
            {/* Side Panel Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream-50 shadow-2xl border-l border-charcoal-900/10 flex flex-col z-50 h-full"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-charcoal-900/10 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-charcoal-900 flex items-center space-x-2">
                    <Bookmark size={18} className="text-bronze-500 fill-bronze-500" />
                    <span>Fragmentos Guardados</span>
                  </h3>
                  <p className="font-sans text-[11px] text-charcoal-800/60 mt-1">
                    Seus ensaios prediletos salvos para ler no seu ritmo.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {bookmarkedIds.length > 0 && (
                    <button
                      onClick={handleClearAllBookmarks}
                      className="p-2 text-charcoal-900/40 hover:text-red-500 transition-colors cursor-pointer"
                      title="Limpar todos os marcadores"
                      aria-label="Limpar marcadores"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsBookmarksOpen(false)}
                    className="p-2 text-charcoal-900/60 hover:text-charcoal-900 border border-charcoal-900/10 hover:border-charcoal-900/30 rounded-xs transition-colors cursor-pointer"
                    aria-label="Fechar marcadores"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                {bookmarkedEssays.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="p-4 bg-charcoal-900/5 rounded-full text-charcoal-900/30">
                      <Bookmark size={32} />
                    </div>
                    <p className="font-serif text-base text-charcoal-900 italic">
                      Nenhum ensaio marcado ainda.
                    </p>
                    <p className="font-sans text-xs text-charcoal-800/50 leading-relaxed max-w-[250px]">
                      Navegue pelos ensaios na página e clique no ícone do marcador para salvá-los aqui para ler depois.
                    </p>
                  </div>
                ) : (
                  bookmarkedEssays.map((essay) => (
                    <div
                      key={essay.id}
                      onClick={() => handleOpenBookmarkedEssay(essay.id)}
                      className="p-5 bg-cream-100/40 border border-charcoal-900/5 hover:border-bronze-500/40 hover:bg-cream-100/70 transition-all duration-300 cursor-pointer group rounded-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between font-mono text-[8px] text-charcoal-900/40 uppercase mb-2">
                          <span>{essay.category}</span>
                          <span>{essay.date}</span>
                        </div>
                        <h4 className="font-serif text-base text-charcoal-900 group-hover:text-bronze-500 transition-colors leading-tight">
                          {essay.title}
                        </h4>
                        <p className="font-sans text-[11px] text-charcoal-800/60 leading-relaxed mt-2 line-clamp-2 italic">
                          &ldquo;{essay.excerpt}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 border-t border-charcoal-900/5 mt-4 flex items-center justify-between">
                        <span className="font-mono text-[9px] tracking-widest text-bronze-500 uppercase flex items-center space-x-1">
                          <BookOpen size={10} />
                          <span>Ler Ensaio</span>
                          <ArrowRight size={8} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </span>
                        
                        <button
                          onClick={(e) => handleRemoveBookmark(essay.id, e)}
                          className="font-mono text-[9px] text-charcoal-900/30 hover:text-red-500 transition-colors uppercase cursor-pointer"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-charcoal-900/10 text-center bg-cream-100/20 select-none">
                <span className="font-serif text-sm italic text-charcoal-900/50">
                  Só Percebi Depois
                </span>
                <span className="font-mono text-[8px] text-bronze-500/70 uppercase block mt-1 tracking-widest">
                  Allan Conceição — Ensaios Escolhidos
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
