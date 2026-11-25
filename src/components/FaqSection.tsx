import {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {FAQ_ITEMS, STUDIO_INFO} from '../data/studioData';
import {buildWhatsAppUrl} from '../utils/contact';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div data-aos="fade-up" className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#7B2CBF]">
              Perguntas Frequentes
            </p>
            <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-[#2B2B2B] sm:text-4xl [text-wrap:balance]">
              Dúvidas comuns antes da sua primeira prática
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A] sm:text-base">
              Reunimos as principais orientações para quem deseja iniciar no
              Yoga, no Pilates ou agendar um atendimento de Spa no Jardim
              América.
            </p>
            <div className="mt-6">
              <a
                href={buildWhatsAppUrl(STUDIO_INFO.whatsappDigits)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#7B2CBF] px-5 py-2.5 text-sm font-semibold text-[#7B2CBF] whitespace-nowrap transition-colors duration-200 hover:bg-[#7B2CBF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF]"
              >
                Tirar outra dúvida no WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-[#E6E2EC] border-y border-[#E6E2EC]">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openId === item.id;
                const panelId = `faq-panel-${item.id}`;
                const buttonId = `faq-button-${item.id}`;

                return (
                  <div
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={String(idx * 50)}
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleItem(item.id)}
                        className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-[#7B2CBF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF]"
                      >
                        <span className="text-base font-semibold text-[#2B2B2B]">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-[#7B2CBF] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="pb-5 pr-8 text-sm leading-relaxed text-[#4A4A4A]"
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
