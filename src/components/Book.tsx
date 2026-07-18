import { BOOK_DATA } from '../data';
import { motion } from 'motion/react';
import { BookOpen, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Book() {
  return (
    <section id="livro" className="py-24 bg-cream-100/40 border-y border-cream-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mockup Image */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] overflow-hidden shadow-2xl border border-cream-200 bg-white p-2"
            >
              <img
                src={BOOK_DATA.coverPath}
                alt="Livro Pensar Demais Está Te Impedindo de Viver"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover shadow-inner"
              />
              <div className="absolute top-4 left-4 bg-charcoal-900 text-cream-50 font-mono text-[9px] tracking-widest px-3 py-1 uppercase">
                Obra Impressa
              </div>
            </motion.div>
          </div>

          {/* Right Column: Book Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs tracking-[0.25em] text-bronze-500 uppercase block">
                A Obra
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight leading-tight">
                {BOOK_DATA.title}
              </h2>
              <p className="font-serif text-lg text-bronze-600 italic">
                {BOOK_DATA.subtitle}
              </p>
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base text-charcoal-800/80 leading-relaxed font-light">
              <p>{BOOK_DATA.description}</p>
              <p>{BOOK_DATA.extendedDescription}</p>
            </div>

            {/* Benefit Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-charcoal-900/10">
              {BOOK_DATA.benefits.map((benefit, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2 text-bronze-500">
                    <CheckCircle2 size={16} />
                    <h4 className="font-serif text-base text-charcoal-900 font-medium">
                      {benefit.title}
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-charcoal-800/60 leading-relaxed pl-6">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Buying Action CTAs */}
            <div className="space-y-4 pt-6">
              <span className="font-mono text-[10px] tracking-widest text-charcoal-900/40 uppercase block">
                Edição física e digital
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={BOOK_DATA.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-charcoal-900 text-cream-50 font-sans text-xs tracking-widest uppercase hover:bg-bronze-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <BookOpen size={14} />
                  <span>Comprar na Amazon</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
                <a
                  href={BOOK_DATA.uiclapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-8 py-4 border border-charcoal-900 bg-transparent text-charcoal-900 font-sans text-xs tracking-widest uppercase hover:bg-charcoal-900 hover:text-cream-50 transition-all duration-300"
                >
                  <BookOpen size={14} />
                  <span>Comprar na Uiclap</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
