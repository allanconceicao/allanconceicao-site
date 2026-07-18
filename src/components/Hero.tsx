import { motion } from 'motion/react';
import { HERO_DATA } from '../data';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-cream-50"
    >
      {/* Background Subtle Graphic */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
        <div className="font-serif text-[40vw] text-charcoal-900 select-none">S</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left order-1 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <span className="font-mono text-xs tracking-[0.25em] text-bronze-500 uppercase block">
              {HERO_DATA.tagline}
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-charcoal-900 leading-none">
              {HERO_DATA.authorName}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-lg sm:text-xl md:text-2xl text-charcoal-800/80 italic leading-relaxed max-w-2xl border-l border-bronze-500/30 pl-6"
          >
            &ldquo;{HERO_DATA.impactPhrase}&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection('livro')}
              className="px-8 py-4 bg-charcoal-900 text-cream-50 font-sans text-xs tracking-widest uppercase hover:bg-bronze-600 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer text-center"
            >
              Conheça o Livro
            </button>
            <button
              onClick={() => scrollToSection('autor')}
              className="px-8 py-4 border border-charcoal-900/20 hover:border-charcoal-900 bg-transparent text-charcoal-900 font-sans text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer text-center hover:bg-cream-100"
            >
              Quem é Allan Conceição
            </button>
          </motion.div>
        </div>

        {/* Right Column: Portrait Asset */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-2 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] overflow-hidden shadow-2xl group border border-cream-200"
          >
            {/* Elegant framing shadows */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/10 to-transparent z-10 pointer-events-none" />
            <img
              src={HERO_DATA.portraitPath}
              alt="Allan Conceição"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-115 brightness-95 group-hover:scale-103 transition-transform duration-[2s] ease-out"
            />
            {/* Abstract golden luxury mark */}
            <div className="absolute top-6 right-6 border border-bronze-500/40 px-3 py-1 font-mono text-[9px] tracking-widest text-bronze-500 select-none uppercase backdrop-blur-xs z-20">
              Ensaios
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <span className="font-mono text-[9px] tracking-[0.2em] text-charcoal-900/60 uppercase">
          Role para refletir
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={() => scrollToSection('reflexao')}
        >
          <ChevronDown size={16} className="text-bronze-500" />
        </motion.div>
      </div>
    </section>
  );
}
