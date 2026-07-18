import { useState } from 'react';
import { SOCIAL_LINKS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Linkedin, Facebook, Youtube, ArrowUpRight, Copy, Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Instagram: Instagram,
  Linkedin: Linkedin,
  Facebook: Facebook,
  Youtube: Youtube,
};

const socialDetails: { [key: string]: { description: string; contentFocus: string } } = {
  Instagram: {
    description: "Anotações breves, trechos do caderno de escrita e reflexões diárias sobre a nossa rotina.",
    contentFocus: "Notas diárias"
  },
  LinkedIn: {
    description: "Textos mais longos sobre o cotidiano profissional, a relação com o trabalho e as escolhas que fazemos.",
    contentFocus: "Trabalho & Rotina"
  },
  Facebook: {
    description: "Publicações na íntegra, crônicas do dia a dia e um espaço para conversar com quem lê o livro.",
    contentFocus: "Textos completos"
  },
  YouTube: {
    description: "Leituras em áudio, pequenos registros falados e conversas sobre os temas tratados nos ensaios.",
    contentFocus: "Leituras & Áudios (Em breve)"
  }
};

const QUOTES_TO_SHARE = [
  {
    id: 'q1',
    text: "Pensar demais é, no fundo, uma tentativa de controlar o futuro para justificar o presente.",
    context: "em \"Pensar Demais Está Te Impedindo de Viver\""
  },
  {
    id: 'q2',
    text: "O descanso virou apenas um intervalo estratégico, uma pausa para recarregar as energias e voltar a produzir. Sentir culpa por parar revela o quanto fomos condicionados a medir nosso valor pessoal apenas pela produtividade.",
    context: "em \"Pensar Demais Está Te Impedindo de Viver\""
  },
  {
    id: 'q3',
    text: "A pressa é um compromisso invisível que assumimos com o tempo, sem perceber que o presente é o único lugar onde realmente vivemos.",
    context: "em \"Pensar Demais Está Te Impedindo de Viver\""
  },
  {
    id: 'q4',
    text: "Só percebi depois que as respostas que eu tanto procurava não estavam no barulho do mundo, mas no silêncio que eu evitava escutar.",
    context: "em \"Só Percebi Depois\""
  }
];

const CARD_THEMES = [
  {
    id: 'sepia',
    name: 'Sépia Editorial',
    bg: 'bg-[#F4ECD8]',
    text: 'text-[#43301B]',
    border: 'border-[#D4C3A3]',
    indicatorBg: 'bg-[#F4ECD8]',
    ornamentColor: 'text-[#C3B299]/30'
  },
  {
    id: 'charcoal',
    name: 'Carvão Noturno',
    bg: 'bg-[#151412]',
    text: 'text-[#EADEC9]',
    border: 'border-[#2C2925]',
    indicatorBg: 'bg-[#151412]',
    ornamentColor: 'text-bronze-500/20'
  },
  {
    id: 'cream',
    name: 'Creme Clássico',
    bg: 'bg-cream-100',
    text: 'text-charcoal-900',
    border: 'border-charcoal-900/10',
    indicatorBg: 'bg-cream-100',
    ornamentColor: 'text-bronze-500/15'
  },
  {
    id: 'white',
    name: 'Branco Minimalista',
    bg: 'bg-white',
    text: 'text-charcoal-800',
    border: 'border-charcoal-200 shadow-sm',
    indicatorBg: 'bg-white',
    ornamentColor: 'text-charcoal-900/10'
  }
];

export default function Social() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentQuote = QUOTES_TO_SHARE[activeQuoteIndex];
  const currentTheme = CARD_THEMES[activeThemeIndex];

  const handleCopyQuote = () => {
    const textToCopy = `"${currentQuote.text}"\n\n— Allan Conceição, ${currentQuote.context}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleNextQuote = () => {
    setActiveQuoteIndex((prev) => (prev + 1) % QUOTES_TO_SHARE.length);
  };

  const handlePrevQuote = () => {
    setActiveQuoteIndex((prev) => (prev - 1 + QUOTES_TO_SHARE.length) % QUOTES_TO_SHARE.length);
  };

  return (
    <section id="contato" className="py-24 bg-cream-50 overflow-hidden border-t border-cream-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-bronze-500 uppercase block">
            Pontes Digitais
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight">
            Conversas fora das páginas
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal-800/60 max-w-xl mx-auto">
            A escrita que começa nos livros também se desdobra em outros formatos. Espaços simples para continuar o diálogo de forma diária e sem pressa.
          </p>
        </div>

        {/* REFINEMENT 3: Gerador de Cartões Literários (Quote Card Exporter) */}
        <div className="mb-24 bg-cream-100/30 border border-charcoal-900/5 rounded-sm p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual Postcard Card Preview */}
            <div className="lg:col-span-7 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeQuoteIndex}-${activeThemeIndex}`}
                  initial={{ opacity: 0, scale: 0.98, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -5 }}
                  transition={{ duration: 0.4 }}
                  className={`w-full max-w-lg aspect-[1.5/1] sm:aspect-[1.6/1] border ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border} p-8 sm:p-10 flex flex-col justify-between relative shadow-lg overflow-hidden`}
                >
                  {/* Decorative Watermark */}
                  <div className={`absolute right-6 top-4 font-serif text-8xl ${currentTheme.ornamentColor} select-none pointer-events-none opacity-40`}>
                    &ldquo;
                  </div>

                  <div className="space-y-4 relative z-10">
                    {/* Small layout ornament */}
                    <div className="flex items-center space-x-1 opacity-40">
                      <Sparkles size={10} className="text-bronze-500" />
                      <span className="font-mono text-[8px] tracking-[0.2em] uppercase">Fragmento de Pensamento</span>
                    </div>

                    <p className="font-serif text-base sm:text-lg italic leading-relaxed text-justify">
                      &ldquo;{currentQuote.text}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-charcoal-900/10 flex items-center justify-between mt-4 relative z-10 opacity-80">
                    <div className="flex flex-col">
                      <span className="font-serif text-xs font-bold tracking-wide">Allan Conceição</span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-bronze-500 mt-0.5">
                        {currentQuote.context}
                      </span>
                    </div>
                    {/* Retro physical stamp detail */}
                    <div className="w-8 h-8 rounded-full border border-dashed border-bronze-500/40 flex items-center justify-center font-mono text-[7px] text-bronze-500/60 tracking-widest uppercase rotate-12">
                      SPD
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Customization Controls */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-bronze-500">
                  <Sparkles size={14} />
                  <span className="font-mono text-[10px] tracking-widest uppercase block">Marcador de Lembrança</span>
                </div>
                <h3 className="font-serif text-2xl text-charcoal-900">
                  Guarde um fragmento
                </h3>
                <p className="font-sans text-xs sm:text-sm text-charcoal-800/60 leading-relaxed font-light">
                  Escolha um pensamento que ressoa com você, mude o estilo editorial e copie-o para compartilhar em suas redes ou enviar para quem precisa ler isto hoje.
                </p>
              </div>

              {/* Theme customizer */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] tracking-widest text-charcoal-900/50 uppercase block">
                  Estilo Editorial
                </span>
                <div className="flex flex-wrap gap-3">
                  {CARD_THEMES.map((theme, idx) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setActiveThemeIndex(idx);
                      }}
                      className={`px-3 py-1.5 rounded-sm border font-sans text-xs flex items-center space-x-2 cursor-pointer transition-all duration-300 ${
                        activeThemeIndex === idx
                          ? 'border-bronze-500 bg-cream-100 text-charcoal-900'
                          : 'border-charcoal-900/10 hover:border-charcoal-900/30 hover:bg-cream-100/50 text-charcoal-800/80'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${theme.indicatorBg} border border-charcoal-900/10 block`} />
                      <span>{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quote Nav & Exporter Trigger */}
              <div className="space-y-4 pt-4 border-t border-charcoal-900/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-widest text-charcoal-900/50 uppercase">
                    Pensamento {activeQuoteIndex + 1} de {QUOTES_TO_SHARE.length}
                  </span>
                  
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={handlePrevQuote}
                      className="p-1.5 border border-charcoal-900/10 hover:border-charcoal-900 rounded-xs hover:bg-cream-100 transition-colors cursor-pointer"
                      title="Anterior"
                      aria-label="Citação anterior"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={handleNextQuote}
                      className="p-1.5 border border-charcoal-900/10 hover:border-charcoal-900 rounded-xs hover:bg-cream-100 transition-colors cursor-pointer"
                      title="Próxima"
                      aria-label="Próxima citação"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopyQuote}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-charcoal-900 text-cream-50 font-sans text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer hover:bg-bronze-600 hover:text-cream-50 focus:outline-none focus:ring-2 focus:ring-bronze-500/50 relative"
                  >
                    {copied ? (
                      <>
                        <Check size={14} />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copiar Citação Formatada</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Animated copied toast inline feedback */}
                <AnimatePresence>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 0.8, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[10px] text-bronze-600 text-center italic"
                    >
                      Pronto para colar nas suas redes (Instagram, LinkedIn) ou enviar em uma conversa!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOCIAL_LINKS.map((link) => {
            const Icon = iconMap[link.iconName] || Instagram;
            const details = socialDetails[link.platform] || { description: "", contentFocus: "" };
            const isYouTube = link.platform === "YouTube";

            const CardComponent = isYouTube ? motion.div : motion.a;
            const cardProps = isYouTube
              ? {}
              : { href: link.url, target: "_blank", rel: "noopener noreferrer", whileHover: { y: -6 } };

            return (
              <CardComponent
                key={link.platform}
                {...cardProps}
                className={`bg-cream-100/50 border border-charcoal-900/5 p-6 flex flex-col justify-between min-h-[250px] relative group ${
                  isYouTube
                    ? 'opacity-70'
                    : 'hover:border-bronze-500/40 hover:bg-cream-100/80 transition-all duration-300 cursor-pointer'
                }`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-charcoal-900/5 text-bronze-500 rounded-xs group-hover:bg-charcoal-900 group-hover:text-cream-50 transition-colors duration-300">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-[9px] tracking-widest text-bronze-500/80 uppercase">
                      {details.contentFocus}
                    </span>
                  </div>
 
                  {/* Body */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-charcoal-900">
                      {link.platform}
                    </h3>
                    <p className="font-sans text-xs text-charcoal-800/60 leading-relaxed font-light">
                      {details.description}
                    </p>
                  </div>
                </div>
 
                {/* Footer Link */}
                <div className="pt-4 border-t border-charcoal-900/5 mt-4 flex items-center justify-between text-charcoal-900/40 group-hover:text-bronze-500 transition-colors">
                  <span className="font-mono text-[10px] tracking-wider font-medium">
                    {link.handle}
                  </span>
                  {!isYouTube ? (
                    <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <span className="font-mono text-[8px] text-bronze-500 border border-bronze-500/30 px-1 py-0.5">EM BREVE</span>
                  )}
                </div>
              </CardComponent>
            );
          })}
        </div>

      </div>
    </section>
  );
}
