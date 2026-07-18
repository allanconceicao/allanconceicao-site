import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PATTERNS_DATA } from '../data';
import { Pattern } from '../types';
import { Compass, Sparkles, HelpCircle, ChevronRight } from 'lucide-react';

export default function Habits() {
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(PATTERNS_DATA[0]);

  return (
    <section className="py-24 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-bronze-500 uppercase block">
            Movimentos Silenciosos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight">
            Onde se esconde a nossa atenção?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal-800/60 max-w-xl mx-auto">
            Pequenos gestos do cotidiano escondem maneiras quase invisíveis de nos afastarmos de nós mesmos. Estes fragmentos observam algumas delas.
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive List */}
          <div className="lg:col-span-5 space-y-4" role="tablist" aria-label="Dinâmicas e padrões da mente">
            {PATTERNS_DATA.map((pattern) => {
              const isSelected = selectedPattern.id === pattern.id;
              return (
                <button
                  key={pattern.id}
                  id={`tab-${pattern.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${pattern.id}`}
                  onClick={() => setSelectedPattern(pattern)}
                  className={`w-full text-left p-6 border transition-all duration-300 relative cursor-pointer flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-bronze-500/50 ${
                    isSelected
                      ? 'border-bronze-500 bg-cream-100/50 shadow-md translate-x-1'
                      : 'border-charcoal-900/10 hover:border-charcoal-900/30 hover:bg-cream-100/20'
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-habit-bar"
                      className="absolute left-0 top-0 bottom-0 w-[4px] bg-bronze-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="mt-1 p-2 bg-charcoal-900/5 rounded-xs text-bronze-500 flex-shrink-0">
                    <Compass size={18} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-lg md:text-xl text-charcoal-900 font-medium">
                      {pattern.title}
                    </h3>
                    <p className="font-sans text-xs text-bronze-600 tracking-wide">
                      {pattern.subtitle}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-charcoal-800/60 mt-2 line-clamp-2">
                      {pattern.description}
                    </p>
                  </div>

                  <div className="ml-auto mt-2 text-charcoal-900/30 hover:text-charcoal-900 transition-colors">
                    <ChevronRight size={16} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep Reflection Board */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPattern.id}
                id={`panel-${selectedPattern.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${selectedPattern.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-cream-100/80 border border-charcoal-900/10 p-8 sm:p-12 relative min-h-[380px] flex flex-col justify-between shadow-sm"
              >
                {/* Visual Watermark */}
                <div className="absolute right-8 top-8 opacity-[0.03] select-none text-charcoal-900 font-serif text-9xl">
                  &ldquo;
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <HelpCircle size={14} className="text-bronze-500" />
                    <span className="font-mono text-[10px] tracking-widest text-bronze-500 uppercase">
                      Fragmento de Ensaio
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl sm:text-3xl text-charcoal-900">
                      {selectedPattern.title}
                    </h4>
                    <p className="font-sans text-sm text-charcoal-800/60 leading-relaxed italic">
                      &quot;{selectedPattern.description}&quot;
                    </p>
                  </div>

                  <div className="w-12 h-[1px] bg-bronze-500/50" />

                  <div className="space-y-3">
                    <span className="font-mono text-[9px] tracking-widest text-charcoal-900/40 uppercase block">
                      Reflexão
                    </span>
                    <p className="font-serif text-base sm:text-lg text-charcoal-900 leading-relaxed font-light">
                      {selectedPattern.reflection}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-bronze-600 font-mono text-[10px] tracking-widest uppercase mt-8 border-t border-charcoal-900/10 pt-6">
                  <Sparkles size={12} />
                  <span>Extraído de &ldquo;Pensar Demais Está Te Impedindo de Viver&rdquo;.</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Empathy trigger banner */}
        <div className="mt-16 text-center border-t border-charcoal-900/10 pt-10">
          <p className="font-serif text-lg text-charcoal-900 italic max-w-2xl mx-auto">
            &ldquo;Perceber o próprio comportamento automático é o primeiro ato de rebeldia intelectual.&rdquo;
          </p>
          <span className="font-mono text-[9px] text-bronze-500 tracking-wider uppercase block mt-2">
            — Allan Conceição
          </span>
        </div>

      </div>
    </section>
  );
}
