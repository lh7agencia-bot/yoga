import {useState} from 'react';
import {Menu, X} from 'lucide-react';
import {STUDIO_INFO} from '../data/studioData';

const NAV_LINKS = [
  {label: 'Práticas', href: '#praticas'},
  {label: 'Galeria', href: '#galeria'},
  {label: 'Depoimentos', href: '#depoimentos'},
  {label: 'Dúvidas', href: '#faq'},
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 border-b border-[#E6E2EC] bg-[#FAF9FC]/95 backdrop-blur-sm md:sticky md:top-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          className="font-display text-2xl font-semibold tracking-tight text-[#4A4A4A] whitespace-nowrap shrink-0 transition-colors hover:text-[#7B2CBF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7B2CBF]"
        >
          {STUDIO_INFO.name}
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A4A4A]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 underline-offset-4 transition-colors hover:text-[#7B2CBF] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7B2CBF]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contato"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#7B2CBF] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#5F1F96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF]"
          >
            Agendar Aula
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#E6E2EC] bg-white text-[#4A4A4A] transition-colors hover:border-[#7B2CBF] hover:text-[#7B2CBF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF] md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Navegação móvel"
          className="border-t border-[#E6E2EC] bg-white px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#4A4A4A] transition-colors hover:bg-[#F4EDF9] hover:text-[#7B2CBF]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#7B2CBF] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5F1F96]"
            >
              Agendar Aula
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
