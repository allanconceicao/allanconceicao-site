import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-charcoal-900 text-cream-100 py-16 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Core Branding */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-2xl text-cream-50 font-medium">
              Allan Conceição
            </h4>
            <p className="font-sans text-xs text-cream-200/50 leading-relaxed max-w-sm">
              Reflexões diárias e ensaios breves sobre a importância de olhar com atenção para a nossa rotina e para as escolhas que fazemos todos os dias.
            </p>
          </div>

          {/* Column 2: Quick Navigation Anchor */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-[10px] tracking-widest text-bronze-500 uppercase block">
              Atalhos de Leitura
            </span>
            <ul className="space-y-2 font-sans text-xs text-cream-200/60 font-light">
              <li>
                <a href="#inicio" className="hover:text-cream-50 transition-colors">Abertura do Site</a>
              </li>
              <li>
                <a href="#reflexao" className="hover:text-cream-50 transition-colors">Uma Pergunta</a>
              </li>
              <li>
                <a href="#livro" className="hover:text-cream-50 transition-colors">O Livro Impresso</a>
              </li>
              <li>
                <a href="#ensaios" className="hover:text-cream-50 transition-colors">Caderno de Ensaios</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Direct Channel */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-[10px] tracking-widest text-bronze-500 uppercase block">
              Canal Direto
            </span>
            <ul className="space-y-2 font-sans text-xs text-cream-200/60 font-light">
              <li className="font-serif text-sm text-cream-50">
                Allan Conceição
              </li>
              <li>
                <a
                  href="mailto:contato@allanconceicao.com.br"
                  className="hover:text-bronze-500 transition-colors select-all font-mono"
                >
                  contato@allanconceicao.com.br
                </a>
              </li>
              <li className="text-[10px] text-cream-200/30">
                Disponível para palestras, encontros literários e conversas sobre escrita contemporânea.
              </li>
            </ul>
          </div>

          {/* Column 4: Top Action */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="p-3 border border-cream-200/10 hover:border-bronze-500 hover:text-bronze-500 text-cream-200 bg-transparent transition-all cursor-pointer group flex items-center justify-center"
              aria-label="Back to top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-cream-200/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-cream-200/30 uppercase">
          <div>
            &copy; {currentYear} Allan Conceição. Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-1">
            <span>Desenvolvido com</span>
            <Heart size={10} className="text-bronze-500" />
            <span>para leitores atentos.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
