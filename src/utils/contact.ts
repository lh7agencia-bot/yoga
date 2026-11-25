export interface ContactFormValues {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const trimmedName = values.name.trim();
  if (trimmedName.length < 2) {
    errors.name = 'Por favor, informe seu nome completo (mínimo 2 caracteres).';
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Por favor, informe seu e-mail.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Informe um endereço de e-mail válido (ex.: nome@dominio.com).';
  }

  const trimmedMessage = values.message.trim();
  if (trimmedMessage.length < 10) {
    errors.message = 'Escreva uma breve mensagem com pelo menos 10 caracteres.';
  }

  return errors;
}

export function hasValidationErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function formatContactMessage(values: ContactFormValues): string {
  return [
    'Olá, Jardim Vinyasa! Gostaria de entrar em contato.',
    '',
    `Nome: ${values.name.trim()}`,
    `E-mail: ${values.email.trim()}`,
    `Interesse: ${values.interest.trim() || 'Informações gerais'}`,
    `Mensagem: ${values.message.trim()}`,
  ].join('\n');
}

export function buildWhatsAppUrl(whatsappDigits: string, values?: ContactFormValues): string {
  const cleanDigits = whatsappDigits.replace(/\D/g, '');
  if (!values) {
    const defaultText = 'Olá, Jardim Vinyasa! Gostaria de saber mais sobre horários e aulas.';
    return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(defaultText)}`;
  }
  const text = formatContactMessage(values);
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(text)}`;
}

export function buildMailtoUrl(values: ContactFormValues): string {
  const subject = `Contato via site - ${values.interest.trim() || 'Jardim Vinyasa'} (${values.name.trim()})`;
  const body = formatContactMessage(values);
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getNextGalleryIndex(
  currentIndex: number,
  direction: 'next' | 'prev',
  totalItems: number
): number {
  if (totalItems <= 0) {
    return 0;
  }
  if (direction === 'next') {
    return (currentIndex + 1) % totalItems;
  }
  return (currentIndex - 1 + totalItems) % totalItems;
}
