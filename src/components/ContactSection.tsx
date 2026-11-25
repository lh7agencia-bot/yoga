import {useState, type FormEvent} from 'react';
import {CheckCircle2, Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {STUDIO_INFO} from '../data/studioData';
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  hasValidationErrors,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/contact';
import {StudioMap} from './StudioMap';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  interest: 'Aula Experimental',
  message: '',
};

interface SubmissionState {
  channel: 'whatsapp' | 'email';
  actionUrl: string;
  senderName: string;
}

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState<SubmissionState | null>(null);

  const handleFieldChange = (
    field: keyof ContactFormValues,
    newValue: string
  ) => {
    setValues((prev) => ({...prev, [field]: newValue}));
    if (field in errors) {
      setErrors((prev) => {
        const next = {...prev};
        delete next[field as keyof ContactFormErrors];
        return next;
      });
    }
    if (submitted) {
      setSubmitted(null);
    }
  };

  const processSubmission = (channel: 'whatsapp' | 'email') => {
    const validationErrors = validateContactForm(values);
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      setSubmitted(null);
      return;
    }

    setErrors({});
    const actionUrl =
      channel === 'whatsapp'
        ? buildWhatsAppUrl(STUDIO_INFO.whatsappDigits, values)
        : buildMailtoUrl(values);

    setSubmitted({
      channel,
      actionUrl,
      senderName: values.name.trim(),
    });

    if (channel === 'whatsapp') {
      const link = document.createElement('a');
      link.href = actionUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    } else {
      window.location.href = actionUrl;
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    processSubmission('whatsapp');
  };

  return (
    <section
      id="contato"
      className="border-t border-[#E6E2EC] bg-[#FAF9FC] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="max-w-2xl">
          <p className="text-sm font-semibold text-[#7B2CBF]">
            Contato e Localização
          </p>
          <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-[#2B2B2B] sm:text-4xl [text-wrap:balance]">
            Agende sua aula ou fale com o estúdio
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A] sm:text-base">
            Envie sua mensagem diretamente pelo WhatsApp ou por e-mail e
            visite-nos no Jardim América, em Goiânia.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Contact Form */}
          <div
            data-aos="fade-up"
            className="rounded-2xl border border-[#E6E2EC] bg-white p-6 sm:p-8 lg:col-span-6"
          >
            <h3 className="font-display text-2xl font-semibold text-[#2B2B2B]">
              Envie sua mensagem
            </h3>
            <p className="mt-1 text-sm text-[#4A4A4A]">
              Preencha seus dados para iniciar o atendimento imediato.
            </p>

            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-semibold text-[#2B2B2B]"
                >
                  Nome completo
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={values.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="Seu nome"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-[#4A4A4A]/25 bg-[#FAF9FC] px-3.5 py-2.5 text-sm text-[#2B2B2B] placeholder:text-[#4A4A4A]/60 focus:border-[#7B2CBF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]/25"
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-[#B91C1C]"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-[#2B2B2B]"
                  >
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="voce@exemplo.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'contact-email-error' : undefined
                    }
                    className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-[#4A4A4A]/25 bg-[#FAF9FC] px-3.5 py-2.5 text-sm text-[#2B2B2B] placeholder:text-[#4A4A4A]/60 focus:border-[#7B2CBF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]/25"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-[#B91C1C]"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-interest"
                    className="block text-sm font-semibold text-[#2B2B2B]"
                  >
                    Interesse
                  </label>
                  <select
                    id="contact-interest"
                    name="interest"
                    value={values.interest}
                    onChange={(e) =>
                      handleFieldChange('interest', e.target.value)
                    }
                    className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-[#4A4A4A]/25 bg-[#FAF9FC] px-3.5 py-2.5 text-sm text-[#2B2B2B] focus:border-[#7B2CBF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]/25"
                  >
                    <option value="Aula Experimental">Aula Experimental</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Pilates">Pilates</option>
                    <option value="Spa & Bem-Estar">Spa & Bem-Estar</option>
                    <option value="Horários e Planos">Horários e Planos</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-semibold text-[#2B2B2B]"
                >
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={values.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  placeholder="Conte qual modalidade você procura ou seu melhor turno para praticar..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                  className="mt-1.5 block w-full rounded-lg border border-[#4A4A4A]/25 bg-[#FAF9FC] px-3.5 py-2.5 text-sm text-[#2B2B2B] placeholder:text-[#4A4A4A]/60 focus:border-[#7B2CBF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]/25"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-[#B91C1C]"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {submitted && (
                <div
                  role="status"
                  data-testid="contact-confirmation"
                  className="flex items-start gap-3 rounded-xl border border-[#7B2CBF]/30 bg-[#F4EDF9] p-4 text-sm text-[#2B2B2B]"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#7B2CBF]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold">
                      Atendimento preparado para {submitted.senderName}.
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#4A4A4A]">
                      {submitted.channel === 'whatsapp'
                        ? 'Caso a janela do WhatsApp não tenha aberto automaticamente, use o link direto abaixo.'
                        : 'Caso seu aplicativo de e-mail não tenha aberto automaticamente, use o link direto abaixo.'}
                    </p>
                    <a
                      href={submitted.actionUrl}
                      target={submitted.channel === 'whatsapp' ? '_blank' : undefined}
                      rel={
                        submitted.channel === 'whatsapp'
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B2CBF] underline underline-offset-2 hover:text-[#5F1F96]"
                    >
                      {submitted.channel === 'whatsapp'
                        ? 'Abrir conversa no WhatsApp'
                        : 'Abrir mensagem no E-mail'}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#7B2CBF] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-colors duration-200 hover:bg-[#5F1F96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Enviar via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => processSubmission('email')}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#4A4A4A]/35 bg-white px-5 py-3 text-sm font-semibold text-[#4A4A4A] whitespace-nowrap transition-colors duration-200 hover:border-[#7B2CBF] hover:text-[#7B2CBF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Enviar por E-mail</span>
                </button>
              </div>
            </form>
          </div>

          {/* Direct Contact Info + Responsive Embedded Google Map */}
          <div className="space-y-6 lg:col-span-6">
            <div
              data-aos="fade-up"
              data-aos-delay="80"
              className="grid grid-cols-1 gap-4 rounded-2xl border border-[#E6E2EC] bg-white p-6 sm:grid-cols-2"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7B2CBF]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>Endereço</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
                  {STUDIO_INFO.address}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7B2CBF]">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Telefone / WhatsApp</span>
                </div>
                <a
                  href={buildWhatsAppUrl(STUDIO_INFO.whatsappDigits)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-[#2B2B2B] underline-offset-4 transition-colors hover:text-[#7B2CBF] hover:underline tabular-nums"
                >
                  {STUDIO_INFO.phoneDisplay}
                </a>
                <p className="mt-1 text-xs text-[#4A4A4A]">
                  Atendimento direto com o estúdio
                </p>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="140">
              <StudioMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
