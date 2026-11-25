import {useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {ContactSection} from './components/ContactSection';
import {FaqSection} from './components/FaqSection';
import {FloatingWhatsApp} from './components/FloatingWhatsApp';
import {Footer} from './components/Footer';
import {GallerySection} from './components/GallerySection';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {TestimonialsSection} from './components/TestimonialsSection';

export default function App() {
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 550,
      easing: 'ease-out-cubic',
      once: true,
      offset: 48,
      disable: () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#2B2B2B]">
      {mapsQuotaExceeded && (
        <div className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs text-amber-900 shadow-sm md:text-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-950 underline hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Header />

      <main>
        <HeroSection />
        <GallerySection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
