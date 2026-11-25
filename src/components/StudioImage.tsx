import {useState} from 'react';
import {ImageOff} from 'lucide-react';

interface StudioImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function StudioImage({
  src,
  alt,
  title,
  className = '',
  loading = 'lazy',
}: StudioImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F4EDF9] via-[#FAF9FC] to-[#ECE7F2] px-6 py-10 text-center text-[#4A4A4A] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#7B2CBF]/25 bg-white text-[#7B2CBF]">
          <ImageOff className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="font-display text-lg font-semibold text-[#2B2B2B]">
          {title || 'Jardim Vinyasa'}
        </p>
        <p className="mt-1 text-xs text-[#4A4A4A]">
          Yoga, Pilates e Spa · Goiânia - GO
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
