import {MessageCircle} from 'lucide-react';
import {STUDIO_INFO} from '../data/studioData';
import {buildWhatsAppUrl} from '../utils/contact';

export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(STUDIO_INFO.whatsappDigits);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp com ${STUDIO_INFO.name} (${STUDIO_INFO.phoneDisplay})`}
      className="fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#7B2CBF] px-4 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.03] hover:bg-[#5F1F96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF] sm:right-6 sm:bottom-6 sm:px-5"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
