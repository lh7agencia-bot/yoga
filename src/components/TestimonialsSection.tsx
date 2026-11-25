import {Star} from 'lucide-react';
import {TESTIMONIALS} from '../data/studioData';

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="border-y border-[#E6E2EC] bg-[#FAF9FC] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="max-w-2xl">
          <p className="text-sm font-semibold text-[#7B2CBF]">Depoimentos</p>
          <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-[#2B2B2B] sm:text-4xl [text-wrap:balance]">
            Vivências de quem pratica no Jardim Vinyasa
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A] sm:text-base">
            Relatos reais sobre como a constância no yoga, no pilates e nos
            momentos de pausa transforma a rotina fora do tapete.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <article
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={String(idx * 90)}
              className="flex flex-col justify-between rounded-2xl border border-[#E6E2EC] bg-white p-6"
            >
              <div>
                <div
                  className="flex items-center gap-1 text-[#7B2CBF]"
                  aria-label={`Avaliação: ${item.rating} de 5 estrelas`}
                >
                  {Array.from({length: item.rating}).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4 fill-[#7B2CBF] text-[#7B2CBF]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 text-sm leading-relaxed text-[#4A4A4A]">
                  “{item.text}”
                </blockquote>
              </div>

              <div className="mt-6 border-t border-[#E6E2EC] pt-4">
                <p className="text-sm font-semibold text-[#2B2B2B]">
                  {item.name}
                </p>
                <p className="mt-0.5 text-xs text-[#4A4A4A]">{item.practice}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
