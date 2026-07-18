import { motion } from 'motion/react';
import { QUESTION_DATA } from '../data';
import { Sparkles } from 'lucide-react';

export default function Question() {
  return (
    <section
      id="reflexao"
      className="relative min-h-[70vh] flex items-center justify-center py-24 bg-charcoal-900 text-cream-50 overflow-hidden"
    >
      {/* Decorative starry / galaxy elements to represent the deep cosmos of the human mind */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C4A47C_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-bronze-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-bronze-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10 flex flex-col items-center space-y-8">
        
        {/* Editorial ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.8, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-2 text-bronze-500 mb-2"
        >
          <div className="h-[1px] w-8 bg-bronze-500/50" />
          <Sparkles size={16} />
          <div className="h-[1px] w-8 bg-bronze-500/50" />
        </motion.div>

        {/* Large, profound question */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream-50 leading-tight tracking-tight max-w-3xl"
        >
          &ldquo;{QUESTION_DATA.question}&rdquo;
        </motion.h2>

        {/* Supporting context */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-sm sm:text-base md:text-lg text-cream-100/80 leading-relaxed max-w-2xl font-light"
        >
          {QUESTION_DATA.context}
        </motion.p>

        {/* Small subtle footer mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-mono text-[9px] tracking-widest text-cream-200 uppercase pt-4"
        >
          Allan Conceição
        </motion.div>
      </div>
    </section>
  );
}
