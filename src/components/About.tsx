import { ABOUT_DATA } from '../data';
import { motion } from 'motion/react';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <section id="autor" className="py-24 bg-cream-50 overflow-hidden relative">
      {/* Editorial Decorative Background Details */}
      <div className="absolute right-0 top-1/4 w-[30%] h-[50%] bg-cream-100/40 rounded-l-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Short, bold thesis statement */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <span className="font-mono text-xs tracking-[0.25em] text-bronze-500 uppercase block">
              Quem é Allan Conceição
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight leading-tight italic">
              &ldquo;{ABOUT_DATA.heading}&rdquo;
            </h2>
            <div className="h-[2px] w-12 bg-bronze-500/50" />
            <div className="pt-4 hidden lg:block">
              <span className="font-mono text-[9px] tracking-widest text-charcoal-900/40 uppercase block">
                O Autor
              </span>
              <p className="font-sans text-xs text-charcoal-800/60 mt-1 leading-relaxed">
                Escritor e ensaísta dedicado a transformar perguntas comuns em reflexões que permanecem com o leitor.
              </p>
            </div>
          </div>

          {/* Right Side: Flowing, elegant biographical copy */}
          <div className="lg:col-span-7 space-y-6 font-sans text-sm sm:text-base text-charcoal-800/80 leading-relaxed font-light">
            {ABOUT_DATA.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 border-t border-charcoal-900/10 flex flex-col sm:flex-row gap-6 sm:items-center justify-between"
            >
              <div className="space-y-1">
                <span className="font-mono text-[9px] tracking-[0.2em] text-charcoal-900/40 uppercase block">
                  Envie sua reflexão
                </span>
                <p className="font-serif text-sm text-charcoal-900 font-medium">
                  gostaria de compartilhar o que percebeu depois?
                </p>
              </div>
              <a
                href="mailto:Allan.Diego.pagodeiro@gmail.com"
                className="flex items-center space-x-2 text-bronze-500 hover:text-charcoal-900 transition-colors font-mono text-xs tracking-wider uppercase group"
              >
                <Mail size={14} className="group-hover:translate-x-0.5 transition-transform" />
                <span>Enviar Carta</span>
                <ArrowUpRight size={12} className="opacity-60" />
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
