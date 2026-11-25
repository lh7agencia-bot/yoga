import {STUDIO_INFO} from '../data/studioData';
import {buildWhatsAppUrl} from '../utils/contact';

export function Footer() {
  return (
    <footer className="bg-[#4A4A4A] py-12 text-[#FAF9FC]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-white/15 pb-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-semibold text-white">
              {STUDIO_INFO.fullName}
            </p>
            <p className="mt-2 text-sm text-white/85">
              {STUDIO_INFO.slogan}
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-wide text-white/75">
              Endereço e Contato
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              {STUDIO_INFO.address}
            </p>
            <a
              href={buildWhatsAppUrl(STUDIO_INFO.whatsappDigits)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-white underline-offset-4 hover:underline tabular-nums"
            >
              WhatsApp: {STUDIO_INFO.phoneDisplay}
            </a>
          </div>

          <nav
            aria-label="Navegação do rodapé"
            className="flex flex-col gap-2 md:col-span-3 md:items-end"
          >
            <a
              href="#praticas"
              className="text-sm text-white/85 transition-colors hover:text-white"
            >
              Práticas
            </a>
            <a
              href="#galeria"
              className="text-sm text-white/85 transition-colors hover:text-white"
            >
              Galeria de Fotos
            </a>
            <a
              href="#depoimentos"
              className="text-sm text-white/85 transition-colors hover:text-white"
            >
              Depoimentos
            </a>
            <a
              href="#faq"
              className="text-sm text-white/85 transition-colors hover:text-white"
            >
              Perguntas Frequentes
            </a>
            <a
              href="#contato"
              className="text-sm text-white/85 transition-colors hover:text-white"
            >
              Contato
            </a>
          </nav>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-white/75 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.fullName}. Todos os direitos
            reservados.
          </p>
          <p>{STUDIO_INFO.neighborhood}</p>
        </div>
      </div>
    </footer>
  );
}
