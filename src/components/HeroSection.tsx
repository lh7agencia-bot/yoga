import {ArrowRight} from 'lucide-react';
import {GALLERY_PHOTOS, STUDIO_INFO, STUDIO_PILLARS} from '../data/studioData';
import {StudioImage} from './StudioImage';

export function HeroSection() {
  const heroPhoto = GALLERY_PHOTOS[0];

  return (
    <section
      id="inicio"
      className="border-b border-[#E6E2EC] bg-[#FAF9FC] pt-10 pb-14 sm:pt-14 sm:pb-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Value Proposition & Primary CTA */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-sm font-medium tracking-wide text-[#4A4A4A]">
              {STUDIO_INFO.fullName}{' '}
              <span className="mx-1.5 text-[#7B2CBF]" aria-hidden="true">
                ·
              </span>{' '}
              {STUDIO_INFO.neighborhood}
            </p>

            <h1 className="mt-4 max-w-xl font-display text-[clamp(2.5rem,4.5vw,3.9rem)] font-semibold leading-[1.06] tracking-tight text-[#2B2B2B] [text-wrap:balance]">
              {STUDIO_INFO.slogan}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
              Um refúgio urbano no Jardim América pensado para desacelerar a mente,
              fortalecer o corpo com consciência e restaurar o bem-estar por meio
              de práticas de yoga, pilates e cuidados de spa.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#contato"
                className="inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-lg bg-[#7B2CBF] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#5F1F96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF]"
              >
                <span>Agendar aula experimental</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#galeria"
                className="inline-flex min-h-[44px] items-center px-2 text-sm font-semibold text-[#4A4A4A] underline-offset-4 whitespace-nowrap shrink-0 transition-colors hover:text-[#7B2CBF] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF]"
              >
                Conhecer o espaço
              </a>
            </div>
          </div>

          {/* Right column: Real Studio Photography */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-[#E6E2EC] bg-white sm:min-h-[400px] lg:min-h-[440px]">
              <StudioImage
                src={heroPhoto.src}
                alt={heroPhoto.alt}
                title={heroPhoto.title}
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-6 pt-14 pb-5 text-white"
                aria-hidden="true"
              >
                <p className="font-display text-xl font-semibold tracking-tight">
                  {STUDIO_INFO.name}
                </p>
                <p className="mt-0.5 text-xs text-white/90">
                  {STUDIO_INFO.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 3-column architectural pillar strip */}
        <div
          id="praticas"
          className="mt-14 grid grid-cols-1 gap-8 border-t border-[#E6E2EC] pt-10 md:grid-cols-3 md:gap-10"
        >
          {STUDIO_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.index}
              data-aos="fade-up"
              data-aos-delay={String(idx * 80)}
              className="flex flex-col"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="text-xs font-semibold tracking-wider text-[#7B2CBF] tabular-nums">
                  {pillar.index}.
                </span>
                <h2 className="font-display text-2xl font-semibold text-[#2B2B2B]">
                  {pillar.title}
                </h2>
              </div>
              <p className="mt-1 text-xs font-medium text-[#4A4A4A]">
                {pillar.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
