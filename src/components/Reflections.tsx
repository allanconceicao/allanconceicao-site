import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REFLECTIONS_DATA } from '../data';
import { Reflection } from '../types';
import { Clock, BookOpen, X, Sparkles, Bookmark, BookmarkCheck, Maximize2, Minimize2, Type, Eye, EyeOff } from 'lucide-react';

export default function Reflections() {
  const [activeReflection, setActiveReflection] = useState<Reflection | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  
  // Immersive & Custom Reading Settings
  const [isImmersive, setIsImmersive] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readingTheme, setReadingTheme] = useState<'cream' | 'sepia' | 'dark'>('cream');
  const [readProgress, setReadProgress] = useState(0);
  
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Load bookmarks on mount
  useEffect(() => {
    const stored = localStorage.getItem('allan_bookmarks');
    if (stored) {
      try {
        setBookmarkedIds(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading bookmarks', e);
      }
    }
  }, []);

  // Listen to bookmarks synchronization event (e.g. if updated from Header)
  useEffect(() => {
    const syncBookmarks = () => {
      const stored = localStorage.getItem('allan_bookmarks');
      if (stored) {
        try {
          setBookmarkedIds(JSON.parse(stored));
        } catch {}
      } else {
        setBookmarkedIds([]);
      }
    };
    window.addEventListener('bookmarks-updated', syncBookmarks);
    return () => window.removeEventListener('bookmarks-updated', syncBookmarks);
  }, []);

  // Listen to open essay custom events (to trigger modal from Bookmarks drawer)
  useEffect(() => {
    const handleOpenEssay = (e: Event) => {
      const customEvent = e as CustomEvent;
      const essayId = customEvent.detail;
      const essay = REFLECTIONS_DATA.find(r => r.id === essayId);
      if (essay) {
        setActiveReflection(essay);
        const element = document.getElementById('ensaios');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('open-essay', handleOpenEssay);
    return () => window.removeEventListener('open-essay', handleOpenEssay);
  }, []);

  // Toggle bookmark function
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const isBookmarked = bookmarkedIds.includes(id);
    const next = isBookmarked
      ? bookmarkedIds.filter(x => x !== id)
      : [...bookmarkedIds, id];
    
    setBookmarkedIds(next);
    localStorage.setItem('allan_bookmarks', JSON.stringify(next));
    // Dispatch event to sync other components in real-time
    window.dispatchEvent(new Event('bookmarks-updated'));
  };

  // Monitor Scroll Progress in reader modal
  const handleModalScroll = () => {
    if (modalContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;
      const progress = scrollHeight - clientHeight > 0
        ? (scrollTop / (scrollHeight - clientHeight)) * 100
        : 0;
      setReadProgress(progress);
    }
  };

  // Reset progress and setting on modal close/open
  useEffect(() => {
    if (activeReflection) {
      setReadProgress(0);
    }
  }, [activeReflection]);

  const fontSizeClasses = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-relaxed'
  };

  const themeClasses = {
    cream: 'bg-cream-50 text-charcoal-900 border-bronze-500/20',
    sepia: 'bg-[#F4ECD8] text-[#43301B] border-[#D4C3A3]',
    dark: 'bg-[#151412] text-[#EADEC9] border-[#2C2925]'
  };

  return (
    <section id="ensaios" className="py-24 bg-cream-100/30 border-t border-cream-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-[0.25em] text-bronze-500 uppercase block">
              Caderno de Ensaios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight">
              Só Percebi Depois
            </h2>
            <p className="font-sans text-xs sm:text-sm text-charcoal-800/60 max-w-xl">
              Anotações breves sobre as contradições do dia a dia, as tentativas de controle e as pequenas coisas que só fazem sentido quando olhamos de volta.
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-bronze-500 font-mono text-[10px] tracking-widest uppercase">
            <Sparkles size={14} />
            <span>Ensaios Selecionados</span>
          </div>
        </div>

        {/* Grid Layout of Essays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REFLECTIONS_DATA.map((essay, index) => {
            const isBookmarked = bookmarkedIds.includes(essay.id);
            return (
              <motion.div
                key={essay.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-cream-50 border border-charcoal-900/5 p-8 flex flex-col justify-between hover:border-bronze-500/40 hover:shadow-lg transition-all duration-300 min-h-[290px] group relative"
              >
                {/* Floating Bookmark on Card */}
                <button
                  onClick={(e) => toggleBookmark(essay.id, e)}
                  className="absolute top-6 right-6 p-2 text-charcoal-900/30 hover:text-bronze-500 transition-colors focus:outline-none"
                  aria-label={isBookmarked ? "Remover marcador" : "Salvar ensaio nos marcadores"}
                  title={isBookmarked ? "Remover marcador" : "Salvar nos marcadores"}
                >
                  {isBookmarked ? (
                    <BookmarkCheck size={16} className="text-bronze-500 fill-bronze-500" />
                  ) : (
                    <Bookmark size={16} className="group-hover:opacity-100" />
                  )}
                </button>

                <div className="space-y-4 pr-6">
                  {/* Header indicators */}
                  <div className="flex items-center justify-between font-mono text-[9px] text-charcoal-900/40 uppercase">
                    <span>{essay.category}</span>
                    <div className="flex items-center space-x-1">
                      <Clock size={10} />
                      <span>{essay.date}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3
                      className="font-serif text-xl sm:text-2xl text-charcoal-900 leading-tight hover:text-bronze-500 transition-colors cursor-pointer focus:outline-none focus:text-bronze-500 rounded-sm"
                      onClick={() => setActiveReflection(essay)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveReflection(essay);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Ler ensaio: ${essay.title}`}
                    >
                      {essay.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-charcoal-800/60 leading-relaxed italic line-clamp-3">
                      &ldquo;{essay.excerpt}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-charcoal-900/5 mt-6 flex justify-between items-center">
                  <button
                    onClick={() => setActiveReflection(essay)}
                    className="font-mono text-[10px] tracking-widest text-bronze-500 uppercase hover:text-charcoal-900 transition-colors flex items-center space-x-2 cursor-pointer group"
                  >
                    <BookOpen size={12} className="group-hover:scale-110 transition-transform" />
                    <span>Ler Ensaio</span>
                  </button>
                  <span className="font-mono text-[9px] text-charcoal-900/30">
                    #{index + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Overlay for distraction-free reading */}
        <AnimatePresence>
          {activeReflection && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 md:py-12 overflow-hidden">
              {/* Dark backdrop with smooth fade */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveReflection(null)}
                className="fixed inset-0 bg-charcoal-900 backdrop-blur-sm cursor-zoom-out"
              />

              {/* Reader panel */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="essay-modal-title"
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className={`w-full max-w-3xl h-full max-h-[85vh] border flex flex-col relative z-10 shadow-2xl transition-all duration-300 ${
                  themeClasses[readingTheme]
                }`}
              >
                {/* 1. Scroll Progress Bar at the top of the panel */}
                <div className="w-full h-[3px] bg-charcoal-900/5 absolute top-0 left-0 z-30">
                  <div 
                    className="h-full bg-bronze-500 transition-all duration-75"
                    style={{ width: `${readProgress}%` }}
                  />
                </div>

                {/* 2. Custom Settings and Controls Header */}
                <div className="px-6 sm:px-12 py-4 border-b border-charcoal-900/10 flex items-center justify-between z-20 bg-inherit select-none">
                  {/* Settings section */}
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    {/* Theme switches */}
                    <div className="flex items-center space-x-2 border-r border-charcoal-900/10 pr-4">
                      <button 
                        onClick={() => setReadingTheme('cream')}
                        className={`w-5 h-5 rounded-full bg-cream-50 border border-charcoal-900/20 flex items-center justify-center cursor-pointer ${readingTheme === 'cream' ? 'ring-2 ring-bronze-500' : ''}`}
                        title="Tema Claro"
                        aria-label="Ativar tema claro"
                      />
                      <button 
                        onClick={() => setReadingTheme('sepia')}
                        className={`w-5 h-5 rounded-full bg-[#F4ECD8] border border-[#C3B299] flex items-center justify-center cursor-pointer ${readingTheme === 'sepia' ? 'ring-2 ring-bronze-500' : ''}`}
                        title="Tema Sépia Editorial"
                        aria-label="Ativar tema sépia"
                      />
                      <button 
                        onClick={() => setReadingTheme('dark')}
                        className={`w-5 h-5 rounded-full bg-[#151412] border border-[#2C2925] flex items-center justify-center cursor-pointer ${readingTheme === 'dark' ? 'ring-2 ring-bronze-500' : ''}`}
                        title="Tema Escuro"
                        aria-label="Ativar tema escuro"
                      />
                    </div>

                    {/* Font sizes */}
                    <div className="flex items-center space-x-2 border-r border-charcoal-900/10 pr-4">
                      <Type size={14} className="opacity-50" />
                      <button 
                        onClick={() => setFontSize('sm')}
                        className={`text-xs font-mono px-2 py-0.5 rounded-xs hover:bg-charcoal-900/5 transition-colors cursor-pointer ${fontSize === 'sm' ? 'text-bronze-500 font-bold' : 'opacity-60'}`}
                        title="Fonte menor"
                      >
                        A-
                      </button>
                      <button 
                        onClick={() => setFontSize('base')}
                        className={`text-xs font-mono px-2 py-0.5 rounded-xs hover:bg-charcoal-900/5 transition-colors cursor-pointer ${fontSize === 'base' ? 'text-bronze-500 font-bold' : 'opacity-60'}`}
                        title="Fonte normal"
                      >
                        A
                      </button>
                      <button 
                        onClick={() => setFontSize('lg')}
                        className={`text-xs font-mono px-2 py-0.5 rounded-xs hover:bg-charcoal-900/5 transition-colors cursor-pointer ${fontSize === 'lg' ? 'text-bronze-500 font-bold' : 'opacity-60'}`}
                        title="Fonte grande"
                      >
                        A+
                      </button>
                      <button 
                        onClick={() => setFontSize('xl')}
                        className={`text-xs font-mono px-2 py-0.5 rounded-xs hover:bg-charcoal-900/5 transition-colors cursor-pointer ${fontSize === 'xl' ? 'text-bronze-500 font-bold' : 'opacity-60'}`}
                        title="Fonte extra grande"
                      >
                        A++
                      </button>
                    </div>

                    {/* Immersive Focus Mode Toggle */}
                    <button
                      onClick={() => setIsImmersive(!isImmersive)}
                      className={`hidden sm:flex items-center space-x-1.5 text-[10px] font-mono uppercase px-2 py-1 rounded-sm border cursor-pointer transition-all duration-300 ${
                        isImmersive 
                          ? 'bg-bronze-500 text-cream-50 border-bronze-500' 
                          : 'border-charcoal-900/20 hover:border-charcoal-900/40 text-inherit opacity-70'
                      }`}
                      title="Foco Editorial (Oculta o cabeçalho e rodapé do modal)"
                    >
                      {isImmersive ? <EyeOff size={11} /> : <Eye size={11} />}
                      <span>{isImmersive ? "Modo Imersivo" : "Foco"}</span>
                    </button>
                  </div>

                  {/* Close / Quit buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleBookmark(activeReflection.id)}
                      className="p-2 text-inherit hover:text-bronze-500 transition-colors"
                      title={bookmarkedIds.includes(activeReflection.id) ? "Remover dos Marcadores" : "Salvar nos Marcadores"}
                      aria-label={bookmarkedIds.includes(activeReflection.id) ? "Remover dos marcadores" : "Salvar nos marcadores"}
                    >
                      {bookmarkedIds.includes(activeReflection.id) ? (
                        <BookmarkCheck size={18} className="text-bronze-500 fill-bronze-500" />
                      ) : (
                        <Bookmark size={18} className="opacity-60" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveReflection(null)}
                      className="text-inherit opacity-60 hover:opacity-100 p-2 border border-charcoal-900/10 hover:border-charcoal-900/30 transition-all cursor-pointer rounded-xs"
                      aria-label="Fechar leitor"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* 3. Main Reading Content Container */}
                <div 
                  ref={modalContentRef}
                  onScroll={handleModalScroll}
                  className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 sm:py-12 scrollbar-thin"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeReflection.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-2xl mx-auto"
                    >
                      {/* Interactive fade/reveal metadata that collapses on immersive focus */}
                      {!isImmersive && (
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center space-x-4 font-mono text-[10px] text-bronze-500 tracking-widest uppercase">
                            <span>{activeReflection.category}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Clock size={10} />
                              <span>{activeReflection.date}</span>
                            </div>
                          </div>

                          <h3 id="essay-modal-title" className="font-serif text-3xl sm:text-4xl text-inherit leading-tight">
                            {activeReflection.title}
                          </h3>
                          <p className="font-serif text-base opacity-70 italic border-l-2 border-bronze-500/50 pl-4 py-1">
                            &ldquo;{activeReflection.excerpt}&rdquo;
                          </p>
                          <div className="h-[1px] w-full bg-charcoal-900/10 pt-4" />
                        </div>
                      )}

                      {/* Reading Body */}
                      <div className="prose prose-stone max-w-none mt-4">
                        <p className={`font-serif text-justify whitespace-pre-line font-light leading-relaxed ${
                          fontSizeClasses[fontSize]
                        }`}>
                          {activeReflection.content}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 4. Reading Footer controls */}
                {!isImmersive && (
                  <div className="px-6 sm:px-12 py-5 border-t border-charcoal-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-inherit opacity-60 uppercase z-20 bg-inherit select-none">
                    <span>Allan Conceição — Caderno de Ensaios</span>
                    <button
                      onClick={() => setActiveReflection(null)}
                      className="text-bronze-500 hover:text-inherit transition-colors cursor-pointer"
                    >
                      Concluir Leitura
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
