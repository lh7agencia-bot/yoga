import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  getNextGalleryIndex,
  hasValidationErrors,
  validateContactForm,
} from './contact';

test('validateContactForm rejects empty or invalid fields', () => {
  const errors = validateContactForm({
    name: 'A',
    email: 'email-invalido',
    interest: 'Yoga',
    message: 'Oi',
  });

  assert.equal(hasValidationErrors(errors), true);
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.message);
});

test('validateContactForm accepts valid input', () => {
  const errors = validateContactForm({
    name: 'Mariana Silva',
    email: 'mariana@exemplo.com.br',
    interest: 'Aula Experimental',
    message: 'Gostaria de agendar uma aula experimental de Vinyasa Yoga pela manhã.',
  });

  assert.equal(hasValidationErrors(errors), false);
  assert.deepEqual(errors, {});
});

test('buildWhatsAppUrl encodes phone and message parameters cleanly', () => {
  const url = buildWhatsAppUrl('5562999710486', {
    name: 'Lucas Costa',
    email: 'lucas@exemplo.com',
    interest: 'Pilates',
    message: 'Tenho interesse em conhecer os horários de Pilates.',
  });

  assert.ok(url.startsWith('https://wa.me/5562999710486?text='));
  assert.ok(url.includes(encodeURIComponent('Lucas Costa')));
  assert.ok(url.includes(encodeURIComponent('Pilates')));
});

test('buildMailtoUrl constructs valid mailto URI with subject and body', () => {
  const mailto = buildMailtoUrl({
    name: 'Ana Paula',
    email: 'ana@exemplo.com',
    interest: 'Spa & Relaxamento',
    message: 'Quero saber mais sobre os rituais de spa disponíveis.',
  });

  assert.ok(mailto.startsWith('mailto:?subject='));
  assert.ok(mailto.includes('&body='));
  assert.ok(mailto.includes(encodeURIComponent('Ana Paula')));
});

test('getNextGalleryIndex wraps forward and backward across bounds', () => {
  assert.equal(getNextGalleryIndex(0, 'next', 4), 1);
  assert.equal(getNextGalleryIndex(3, 'next', 4), 0);
  assert.equal(getNextGalleryIndex(0, 'prev', 4), 3);
  assert.equal(getNextGalleryIndex(2, 'prev', 4), 1);
  assert.equal(getNextGalleryIndex(0, 'next', 0), 0);
});
