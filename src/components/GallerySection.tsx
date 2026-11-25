import {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight, Maximize2, X} from 'lucide-react';
import {GALLERY_PHOTOS} from '../data/studioData';
import {getNextGalleryIndex} from '../utils/contact';
import {StudioImage} from './StudioImage';

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = GALLERY_PHOTOS.length;

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? 0 : getNextGalleryIndex(prev, 'next', total)
        );
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? 0 : getNextGalleryIndex(prev, 'prev', total)
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, total]);

  const activePhoto = activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null;

  return (
    <section id="galeria" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-up"
          className="flex flex-col justify-between gap-4 border-b border-[#E6E2EC] pb-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-sm font-semibold text-[#7B2CBF]">
              Nosso Espaço
            </p>
            <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-[#2B2B2B] sm:text-4xl [text-wrap:balance]">
              Conheça o Jardim Vinyasa por dentro
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#4A4A4A]">
            Clique em qualquer fotografia para ampliar os detalhes das nossas
            salas de prática, equipamentos e áreas de acolhimento.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {GALLERY_PHOTOS.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              data-aos="fade-up"
              data-aos-delay={String(index * 80)}
              aria-label={`Ampliar foto: ${photo.title}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E6E2EC] bg-[#FAF9FC] text-left transition-colors duration-200 hover:border-[#7B2CBF]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4EDF9]">
                <StudioImage
                  src={photo.src}
                  alt={photo.alt}
                  title={photo.title}
                  className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
                    photo.objectPosition || 'object-center'
                  }`}
                />
                <span className="pointer-events-none absolute right-3 bottom-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#4A4A4A]/80 text-white backdrop-blur-xs transition-colors duration-200 group-hover:bg-[#7B2CBF]">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-[#2B2B2B]">
                    {photo.title}
                  </h3>
                  <span className="text-xs font-medium text-[#7B2CBF] tabular-nums">
                    0{index + 1} / 0{total}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4A4A4A]">
                  {photo.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria ampliada: ${activePhoto.title}`}
          data-testid="gallery-lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#1F1D22] text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {activePhoto.title}
                </p>
                <p
                  className="text-xs text-white/75 tabular-nums"
                  data-testid="lightbox-counter"
                >
                  {activeIndex + 1} / {total}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Fechar galeria"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:bg-[#7B2CBF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Active Image */}
            <div className="relative flex max-h-[68vh] min-h-[280px] items-center justify-center bg-black">
              <StudioImage
                src={activePhoto.src}
                alt={activePhoto.alt}
                title={activePhoto.title}
                loading="eager"
                className="max-h-[68vh] w-full object-contain"
              />
            </div>

            {/* Footer Controls */}
            <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/85">{activePhoto.description}</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === null
                        ? 0
                        : getNextGalleryIndex(prev, 'prev', total)
                    )
                  }
                  aria-label="Foto anterior"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white whitespace-nowrap transition-colors hover:bg-[#7B2CBF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === null
                        ? 0
                        : getNextGalleryIndex(prev, 'next', total)
                    )
                  }
                  aria-label="Próxima foto"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-[#7B2CBF] px-4 py-2 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#5F1F96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Próxima</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
