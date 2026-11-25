import {useEffect, useState} from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {ExternalLink, MapPin} from 'lucide-react';
import {STUDIO_INFO} from '../data/studioData';

function getMapsApiKey(): string {
  const globalKey = (globalThis as unknown as {GOOGLE_MAPS_API_KEY?: string})
    .GOOGLE_MAPS_API_KEY;
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || globalKey || '';
}

interface StudioLocationState {
  lat: number;
  lng: number;
  formattedAddress: string;
}

function StudioMapFallback({message}: {message?: string}) {
  return (
    <div className="flex h-[320px] w-full flex-col items-center justify-center bg-gradient-to-br from-[#F4EDF9] via-[#FAF9FC] to-[#ECE7F2] px-6 text-center sm:h-[360px]">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#7B2CBF]/25 bg-white text-[#7B2CBF]">
        <MapPin className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="font-display text-xl font-semibold text-[#2B2B2B]">
        {STUDIO_INFO.name}
      </p>
      <p className="mt-1.5 max-w-sm text-sm text-[#4A4A4A]">
        {STUDIO_INFO.address}
      </p>
      {message && (
        <p className="mt-2 text-xs text-[#4A4A4A]">{message}</p>
      )}
      <a
        href={STUDIO_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#7B2CBF] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5F1F96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B2CBF]"
      >
        <span>Abrir localização no Google Maps</span>
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function StudioMapCanvas() {
  const placesLib = useMapsLibrary('places');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [locationState, setLocationState] = useState<StudioLocationState | null>(
    null
  );
  const [lookupFailed, setLookupFailed] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);

  useEffect(() => {
    if (!placesLib) {
      return;
    }

    let cancelled = false;

    async function resolveStudioAddress() {
      try {
        const {places} = await placesLib.Place.searchByText({
          textQuery: STUDIO_INFO.address,
          fields: ['location', 'displayName', 'formattedAddress'],
          maxResultCount: 1,
          language: 'pt-BR',
          region: 'BR',
        });

        if (cancelled) {
          return;
        }

        const matched = places?.[0];
        if (matched?.location) {
          setLocationState({
            lat: matched.location.lat(),
            lng: matched.location.lng(),
            formattedAddress: matched.formattedAddress || STUDIO_INFO.address,
          });
        } else {
          setLookupFailed(true);
        }
      } catch (err: unknown) {
        if (cancelled) {
          return;
        }
        const errText = String(err);
        if (
          errText.includes('RESOURCE_EXHAUSTED') ||
          errText.includes('OVER_QUERY_LIMIT') ||
          errText.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setLookupFailed(true);
      }
    }

    void resolveStudioAddress();

    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  if (lookupFailed) {
    return (
      <StudioMapFallback message="Visualize a rota direta no aplicativo do Google Maps." />
    );
  }

  if (!locationState) {
    return (
      <div
        className="flex h-[320px] w-full flex-col items-center justify-center bg-[#F4EDF9]/60 px-6 text-center sm:h-[360px]"
        aria-live="polite"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7B2CBF]/25 border-t-[#7B2CBF]" />
        <p className="mt-3 text-sm font-medium text-[#4A4A4A]">
          Carregando mapa no Jardim América...
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[320px] w-full sm:h-[360px] [&_gmpx-api-loader]:hidden [&_.gm-style]:saturate-[0.82] [&_.gm-style]:contrast-[1.03]">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={{lat: locationState.lat, lng: locationState.lng}}
        defaultZoom={16}
        gestureHandling="cooperative"
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={true}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        className="h-full w-full"
      >
        <AdvancedMarker
          ref={markerRef}
          position={{lat: locationState.lat, lng: locationState.lng}}
          onClick={() => setInfoOpen((prev) => !prev)}
          title={STUDIO_INFO.fullName}
        >
          <Pin
            background="#7B2CBF"
            borderColor="#4A4A4A"
            glyphColor="#FFFFFF"
            scale={1.2}
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={250}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 text-left font-sans">
              <p className="text-sm font-semibold text-[#7B2CBF]">
                {STUDIO_INFO.name}
              </p>
              <p className="mt-0.5 text-xs font-medium text-[#4A4A4A]">
                {STUDIO_INFO.descriptor}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-[#4A4A4A]">
                {STUDIO_INFO.address}
              </p>
              <a
                href={STUDIO_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#7B2CBF] underline underline-offset-2 hover:text-[#5F1F96]"
              >
                <span>Como chegar</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export function StudioMap() {
  const apiKey = getMapsApiKey();
  const [quotaReached, setQuotaReached] = useState(false);

  useEffect(() => {
    const handleQuota = () => setQuotaReached(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  return (
    <div
      data-testid="studio-map-container"
      className="overflow-hidden rounded-2xl border border-[#4A4A4A]/20 bg-white"
    >
      {/* Palette-matched container header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6E2EC] bg-[#4A4A4A] px-5 py-3.5 text-white">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#7B2CBF] text-white">
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              Localização · Jardim América
            </p>
            <p className="truncate text-xs text-white/80">
              Av. C-231, Qd500 L09 - Goiânia, GO
            </p>
          </div>
        </div>

        <a
          href={STUDIO_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-[#7B2CBF] px-3.5 py-1.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#5F1F96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span>Abrir rota</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Map Viewport */}
      {!apiKey || quotaReached ? (
        <StudioMapFallback />
      ) : (
        <APIProvider
          apiKey={apiKey}
          libraries={['places', 'marker']}
          language="pt-BR"
          region="BR"
        >
          <StudioMapCanvas />
        </APIProvider>
      )}
    </div>
  );
}
