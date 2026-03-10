import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ChevronRight, ArrowRight, Facebook, Twitter, Youtube, Check, Calendar, Target, HandHelping, Home, Shield, ExternalLink, MapPin, ChevronUp, Star, Leaf, Stethoscope, Globe, Type, Palette } from 'lucide-react';
import logoSrc from './src/logo/A5fc6dd750d204bc8ac928a934d89d45d3.png';
import imageJpg from './src/logo/image.JPG';
import image2 from './src/logo/image2.JPG';
import photo2 from './src/logo/2.jpeg';
import photo3 from './src/logo/3.jpeg';
import photo4 from './src/logo/4.jpeg';
import photoJpeg from './src/logo/photo.jpeg';

// Types
interface Testimonial {
  name: string;
  text: string;
}

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
}

// Text zoom and background theme (persisted)
const ZOOM_LEVELS = [90, 100, 110, 125, 150] as const;
const BASE_FONT_PX = 18;
const BACKGROUND_THEMES = ['default', 'warm', 'cool', 'light', 'dark'] as const;
type BackgroundTheme = typeof BACKGROUND_THEMES[number];
const BACKGROUND_CLASSES: Record<BackgroundTheme, string> = {
  default: 'bg-slate-50',
  warm: 'bg-amber-50',
  cool: 'bg-slate-100',
  light: 'bg-white',
  dark: 'bg-slate-900',
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [textZoom, setTextZoom] = useState(() => {
    const saved = localStorage.getItem('decerto-text-zoom');
    const n = saved ? parseInt(saved, 10) : 100;
    return ZOOM_LEVELS.includes(n as typeof ZOOM_LEVELS[number]) ? n : 100;
  });
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>(() => {
    const saved = localStorage.getItem('decerto-background') as BackgroundTheme | null;
    return saved && BACKGROUND_THEMES.includes(saved) ? saved : 'default';
  });
  const [showDisplayPanel, setShowDisplayPanel] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply text zoom to root font size
  useEffect(() => {
    const sizePx = (BASE_FONT_PX * textZoom) / 100;
    document.documentElement.style.fontSize = `${sizePx}px`;
    localStorage.setItem('decerto-text-zoom', String(textZoom));
  }, [textZoom]);

  // Persist background theme
  useEffect(() => {
    localStorage.setItem('decerto-background', backgroundTheme);
  }, [backgroundTheme]);

  const rootBgClass = BACKGROUND_CLASSES[backgroundTheme];

  return (
    <div className={`font-sans ${rootBgClass} ${backgroundTheme === 'dark' ? 'text-slate-100' : 'text-slate-900'} antialiased min-h-screen overflow-x-hidden transition-colors duration-300`}>
      <TrustBar />
      <Header 
        scrolled={scrolled} 
        currentPage={currentPage} 
        navigate={navigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main id="main-content" className="min-h-screen" role="main">
        <div key={currentPage} className="animate-page-enter">
          {currentPage === 'home' && <HomePage navigate={navigate} />}
          {currentPage === 'services' && <ServicesPage navigate={navigate} />}
          {currentPage === 'careers' && <CareersPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'settings' && (
            <SettingsPage
              textZoom={textZoom}
              setTextZoom={setTextZoom}
              backgroundTheme={backgroundTheme}
              setBackgroundTheme={setBackgroundTheme}
            />
          )}
        </div>
      </main>

      <Footer navigate={navigate} />
      <DisplayControls
        textZoom={textZoom}
        setTextZoom={setTextZoom}
        backgroundTheme={backgroundTheme}
        setBackgroundTheme={setBackgroundTheme}
        open={showDisplayPanel}
        onToggle={() => setShowDisplayPanel((v) => !v)}
        onOpenSettings={() => { setShowDisplayPanel(false); navigate('settings'); }}
      />
      <BackToTop show={showBackToTop} />
    </div>
  );
}

// Display controls: text zoom and background theme (floating quick access)
const DisplayControls: React.FC<{
  textZoom: number;
  setTextZoom: (v: number) => void;
  backgroundTheme: BackgroundTheme;
  setBackgroundTheme: (v: BackgroundTheme) => void;
  open: boolean;
  onToggle: () => void;
  onOpenSettings: () => void;
}> = ({ textZoom, setTextZoom, backgroundTheme, setBackgroundTheme, open, onToggle, onOpenSettings }) => (
  <div className="fixed bottom-6 left-6 z-40 flex flex-col items-end gap-2">
    {open && (
      <div
        className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5 w-72 animate-fade-in"
        role="dialog"
        aria-label="Display options: text size and background"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-semibold text-slate-800">Display</span>
          <button
            type="button"
            onClick={onToggle}
            className="btn-secondary !min-h-0 !py-2 !px-3 text-slate-600 hover:bg-slate-100"
            aria-label="Close display options"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Type size={18} className="text-teal-600" aria-hidden />
              <span className="text-sm font-medium text-slate-700">Text size</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ZOOM_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setTextZoom(level)}
                  className={`btn-choice !min-h-[40px] !min-w-[40px] !text-sm !px-2 ${textZoom === level ? '!border-teal-600 !bg-teal-600 !text-white' : ''}`}
                  aria-label={`Text size ${level}%`}
                  aria-pressed={textZoom === level}
                >
                  {level}%
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette size={18} className="text-teal-600" aria-hidden />
              <span className="text-sm font-medium text-slate-700">Background</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BACKGROUND_THEMES.map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setBackgroundTheme(theme)}
                  className={`btn-choice !min-h-[40px] !px-3 !text-sm capitalize ${backgroundTheme === theme ? '!border-teal-600 !bg-teal-600 !text-white' : ''}`}
                  aria-label={`Background: ${theme}`}
                  aria-pressed={backgroundTheme === theme}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenSettings}
          className="btn-secondary mt-4 w-full"
        >
          Open full Settings
        </button>
      </div>
    )}
    <button
      type="button"
      onClick={onToggle}
      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border-2 ${
        open ? 'bg-teal-600 text-white border-teal-700 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
      aria-label={open ? 'Close display options' : 'Open display options (text size and background)'}
      aria-expanded={open}
    >
      <Palette size={22} aria-hidden />
    </button>
  </div>
);

// Settings page – empty (no content); use the floating display button for text size and background
const SettingsPage: React.FC<{
  textZoom: number;
  setTextZoom: (v: number) => void;
  backgroundTheme: BackgroundTheme;
  setBackgroundTheme: (v: BackgroundTheme) => void;
}> = () => (
  <div className="min-h-screen w-full pt-24 pb-20 px-6 sm:px-8 lg:px-12 xl:px-16">
    <div className="max-w-5xl w-full mx-auto">
      <p className="text-slate-600 text-center">Use the display button (bottom-left of the page) to change text size and background.</p>
    </div>
  </div>
);

// Trust bar – international clarity (Australia)
const TrustBar: React.FC = () => (
  <div className="bg-teal-800 text-teal-100 text-center py-2 px-4 text-sm font-medium">
    <span className="inline-flex items-center justify-center gap-2 flex-wrap">
      <MapPin size={14} className="flex-shrink-0" aria-hidden />
      Serving Australia
      <span className="hidden sm:inline" aria-hidden>·</span>
      <span className="hidden sm:inline">Disability Services Provider</span>
    </span>
  </div>
);

// Back to top – responsive, accessible
const BackToTop: React.FC<{ show: boolean }> = ({ show }) => (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className={`fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-600 text-white border-2 border-teal-700 shadow-lg hover:bg-teal-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center ${
      show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
    }`}
    aria-label="Back to top"
  >
    <ChevronUp size={24} aria-hidden />
  </button>
);

// Logo image with fallback to icon
const LogoImage: React.FC = () => {
  const [error, setError] = useState(false);
  return error ? (
    <div className="bg-teal-600 p-3 rounded-xl shadow-sm flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
      DS
    </div>
  ) : (
    <img
      src={logoSrc}
      alt="Decerto Supports"
      className="h-14 w-auto object-contain flex-shrink-0"
      onError={() => setError(true)}
    />
  );
};

// Header Component
const Header: React.FC<{
  scrolled: boolean;
  currentPage: string;
  navigate: (page: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}> = ({ scrolled, currentPage, navigate, mobileMenuOpen, setMobileMenuOpen }) => {
  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services' },
    { name: 'Careers', page: 'careers' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md border-b border-slate-200/90' 
          : 'bg-white/95 backdrop-blur-lg border-b border-slate-100'
      }`}
      style={{
        animation: 'slideDown 0.5s ease-out'
      }}
    >
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center h-20 min-h-[4rem] sm:h-24 sm:min-h-[5rem]">
          {/* Logo */}
          <button 
            onClick={() => navigate('home')}
            className="flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-lg"
          >
            <LogoImage />
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight leading-tight">
                Decerto Supports
              </h1>
              <p className="text-sm sm:text-base text-slate-500 mt-0.5 font-medium tracking-wide">
                Disability Services Provider
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`min-h-[44px] px-5 py-3 rounded-xl text-base font-semibold border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                  currentPage === item.page
                    ? 'bg-teal-600 text-white border-teal-700 shadow-md hover:bg-teal-700'
                    : 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-teal-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] p-3 rounded-xl border-2 border-transparent hover:bg-slate-100 hover:border-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden bg-white border-t border-slate-200 shadow-lg"
          style={{
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          <div className="px-6 py-5 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`w-full text-left min-h-[48px] px-5 py-3.5 rounded-xl text-base font-semibold border-2 transition-colors ${
                  currentPage === item.page
                    ? 'bg-teal-600 text-white border-teal-700'
                    : 'border-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
};

// Home Page
const HomePage: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <HeroSection navigate={navigate} />
      <AboutSection navigate={navigate} />
      <WhyChooseSection navigate={navigate} />
      <ServicesPreview navigate={navigate} />
      <CareersPreview navigate={navigate} />
      <BlogSection />
      <HowWeWorkSection />
      <TestimonialsSection />
      <ContactPreview />
    </>
  );
};

// Hero slider – photos from src/logo (no logo image in photo sections)
const HERO_SLIDES = [
  { src: imageJpg, caption: 'Support built on trust, understanding, and genuine care' },
  { src: image2, caption: 'Lived experience at the heart of everything we do' },
  { src: photoJpeg, caption: 'Reliable, compassionate support for independence and dignity' },
];

// Hero Section – multi-image slider; all copy original
const HeroSection: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 w-full">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          <div className="space-y-4 sm:space-y-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-teal-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Disability Support
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              Decerto Supports — <span className="text-teal-600">Personal, Reliable Care</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              At Decerto Supports, we believe support should feel personal — not just a service, but something built on trust, understanding, and genuine care. With lived experience at the heart of our organisation, we truly understand the challenges and realities of living with a disability.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigate('contact')}
                className="btn-primary group flex items-center gap-2"
              >
                Contact Us
                <ArrowRight className="group-hover:translate-x-0.5 transition-transform" size={18} />
              </button>
              <a
                href="tel:0400000000"
                className="btn-secondary flex items-center gap-2"
              >
                <Phone size={18} />
                Call Us
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-200 mt-4 sm:mt-6">
              <div className="text-center sm:text-left">
                <div className="text-lg sm:text-2xl font-bold text-teal-600">Quality</div>
                <div className="text-sm sm:text-base text-slate-500 mt-0.5">Focused</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-lg sm:text-2xl font-bold text-teal-600">Lived</div>
                <div className="text-sm sm:text-base text-slate-500 mt-0.5">Experience</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-lg sm:text-2xl font-bold text-teal-600">You</div>
                <div className="text-sm sm:text-base text-slate-500 mt-0.5">At the centre</div>
              </div>
            </div>
          </div>

          {/* Multi-image slider */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[4/5] bg-slate-100">
              {HERO_SLIDES.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    index === slideIndex
                      ? 'opacity-100 z-10'
                      : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.src}
                    alt="Decerto Supports - Disability Services"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center gap-2 sm:gap-3 text-white">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Star size={20} className="text-white" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">{slide.caption}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Slider dots – touch-friendly tap target */}
            <div className="flex justify-center gap-2 mt-4">
              {HERO_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSlideIndex(index)}
                  className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-all duration-300 ${
                    index === slideIndex
                      ? 'bg-teal-600'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={`block rounded-full ${
                    index === slideIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-slate-500'
                  }`} />
                </button>
              ))}
            </div>
            {/* Prev/Next – touch-friendly 44px */}
            <button
              type="button"
              onClick={() => setSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronRight className="rotate-180" size={20} />
            </button>
            <button
              type="button"
              onClick={() => setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-white to-blue-50/40 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
              <img
                src={photo2}
                alt="Professional disability and family support"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
          <div className="space-y-5 order-1 md:order-2">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              About Us
            </h2>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
              At Decerto Supports, we are a disability services provider committed to delivering compassionate, reliable, and high-quality supports to people living with disability.
            </p>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
              Our organisation is led by a Director who lives with a disability. This lived experience is not just a story — it is the foundation of our values. It shapes how we listen, how we support, and how we genuinely understand the challenges, goals, and aspirations of the people we work alongside every day.
            </p>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
              We take a person-centred approach, placing each participant at the heart of everything we do. We work closely with you to design supports that are tailored to your individual needs, goals, and preferences — because we recognise that no two journeys are the same.
            </p>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
              Reliability is at the heart of Decerto Supports. We understand that consistency is essential. We are committed to providing dependable, responsive, and consistent services, ensuring continuity of care and peace of mind.
            </p>
            <button
              onClick={() => navigate('contact')}
              className="btn-primary mt-4 inline-flex items-center gap-2"
            >
              Contact Us
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Why Choose Us – Decerto differentiators
const WhyChooseSection: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  const items = [
    { title: 'Lived experience at the helm', icon: HandHelping },
    { title: 'Person-centred, tailored supports', icon: Target },
    { title: 'Reliable, consistent care', icon: Shield },
  ];
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-teal-200 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            True support goes beyond tasks
          </h2>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            We believe in building trust, creating meaningful connections, and walking alongside you as you pursue greater independence, confidence, and quality of life.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <item.icon className="text-teal-200 mb-4" size={32} />
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
        <p className="text-center text-teal-100 text-sm mb-6">
          At Decerto Supports, it&apos;s not just about what we do — it&apos;s about how we make you feel.
        </p>
        <div className="text-center">
          <button
            onClick={() => navigate('contact')}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Mail size={18} />
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

// Services Preview – card style with prominent icon
const ServicesPreview: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  const services = [
    { title: 'Personal Assistance (Personal Care)', description: 'Respectful, dignified support with daily personal activities — showering, grooming, dressing, medication and mealtime support. Your privacy, dignity, and choice are always at the heart of everything we do.', Icon: HandHelping, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', borderColor: 'border-teal-100' },
    { title: 'Social & Community Participation', description: 'Stay connected and build confidence with support for outings, events, hobbies and community life. Reliable, person-centred support for an active, confident life.', Icon: Star, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', borderColor: 'border-slate-200' },
    { title: 'Support Coordination', description: 'We help you understand your support plan, find the right providers, and coordinate supports so everything works for you.', Icon: Target, iconBg: 'bg-teal-100', iconColor: 'text-teal-600', borderColor: 'border-slate-200' },
  ];
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-teal-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">What we do</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Our Services
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto mt-3">
            A wide range of supports tailored to your unique needs, goals, and preferences. You&apos;re not just another participant — you&apos;re part of a community that genuinely cares.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-6 sm:p-8 border ${service.borderColor} hover:shadow-xl transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${service.iconBg}`}>
                <service.Icon className={service.iconColor} size={28} fill="currentColor" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-base">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('services')}
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Services
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

// Careers Preview
const CareersPreview: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-amber-50/50 to-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Work with us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
              Careers
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              At Decerto Supports, we&apos;re more than a team — we&apos;re a community built on compassion, respect, and reliability. We&apos;re always looking for dedicated, caring individuals who are passionate about making a genuine difference in people&apos;s lives.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              When you join us, you become part of a supportive and professional environment where your work is valued and your contribution truly matters. If you&apos;re reliable, compassionate, and committed to high-quality support, we&apos;d love to hear from you.
            </p>
            <button
              onClick={() => navigate('careers')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Work With Us
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
                <img
                  src={photo4}
                  alt="Join Decerto Supports"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <div className="font-semibold">Let&apos;s grow together</div>
                <div className="text-sm text-white/90">Email: careers@decertosupports.com.au</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Blog Section – recent posts with attractive styling and background
const BlogSection: React.FC = () => {
  const posts: BlogPost[] = [
    {
      title: 'Why Lived Experience Makes Our Support Different',
      date: 'Jan 15, 2025',
      excerpt: 'Our director&apos;s lived experience shapes how we listen, support, and understand the challenges and aspirations of the people we work alongside every day.',
      image: imageJpg,
      category: 'About Us'
    },
    {
      title: 'Person-Centred Support: Your Goals, Your Way',
      date: 'Feb 3, 2025',
      excerpt: 'We design supports around your individual needs, goals, and preferences — because no two journeys are the same. Here&apos;s how we do it.',
      image: image2,
      category: 'Our Approach'
    },
    {
      title: 'Reliable When It Matters Most',
      date: 'Feb 18, 2025',
      excerpt: 'Consistency is essential. We deliver on time, every time, with people you know and trust. Why reliability is at the heart of Decerto Supports.',
      image: photo2,
      category: 'Support'
    },
    {
      title: 'Understanding Your Support Plan: A Simple Guide',
      date: 'Mar 1, 2025',
      excerpt: 'Navigating your support plan can feel overwhelming. We break down the basics so you can feel confident and in control of your supports.',
      image: photo3,
      category: 'Resources'
    },
    {
      title: 'Building Independence and Confidence at Home',
      date: 'Mar 10, 2025',
      excerpt: 'From daily personal care to community participation — how our team supports you to live with greater independence and dignity.',
      image: photoJpeg,
      category: 'Wellbeing'
    }
  ];

  const categoryColors: Record<string, string> = {
    'About Us': 'bg-teal-600',
    'Our Approach': 'bg-blue-600',
    'Support': 'bg-amber-600',
    'Resources': 'bg-emerald-600',
    'Wellbeing': 'bg-rose-500',
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-teal-50 via-white to-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Insights &amp; Updates</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-2">
            Recent Blog
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-3">
            Stories, tips, and updates from the Decerto Supports team.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl hover:border-teal-200 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 px-2.5 py-1 ${categoryColors[post.category] || 'bg-teal-600'} text-white text-xs font-semibold rounded-lg shadow-sm`}>
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <Calendar size={14} className="text-teal-500" />
                  {post.date}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-base mb-4 line-clamp-3">{post.excerpt}</p>
                <span className="text-teal-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <ChevronRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// How We Work Section
const HowWeWorkSection: React.FC = () => {
  const steps = [
    { title: 'Listen and understand', description: 'We take the time to understand you, your goals, and what matters most in your life.' },
    { title: 'Connect you with the right supports', description: 'We help you find the right providers that suit your needs and preferences.' },
    { title: 'Coordinate your plan', description: 'We work with you to organise and coordinate your supports so you’re not left waiting.' },
    { title: 'Explain your plan', description: 'We keep your plan clear and up to date so you always know who’s doing what.' },
    { title: 'Build your independence', description: 'We build your confidence to manage your supports independently over time.' },
    { title: 'Stand by you', description: 'We provide ongoing guidance, advocacy, and support when challenges arise.' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-teal-50 to-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="text-teal-600 font-semibold text-base uppercase tracking-wider">Support Coordination</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Our Approach
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We are here to listen, support, and walk alongside you — so you feel confident, in control, and supported to live life your way.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 lg:p-8 border-2 border-slate-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300 shadow-md"
            >
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-5">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 text-base leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 p-6 lg:p-8 bg-teal-600 rounded-2xl text-center">
          <p className="text-white text-lg md:text-xl font-medium leading-relaxed max-w-4xl mx-auto">
            Our Promise: We keep things simple, supportive, and personalised — so you can focus on your goals, your independence, and living life your way.
          </p>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    { name: 'Participant', text: 'Support that feels personal — not just a service. They take the time to listen and really understand.' },
    { name: 'Family', text: 'Reliable, on time, every time. We have peace of mind knowing our supports are consistent.' },
    { name: 'Carer', text: 'A team that walks alongside you with genuine care and respect. It makes all the difference.' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-teal-50/50 to-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-semibold text-base uppercase tracking-wider">Client stories</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Testimonials
          </h2>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 md:p-14 text-center">
          <div className="mx-auto mb-8 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-2xl font-serif">&ldquo;</div>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8 italic max-w-3xl mx-auto">
            &ldquo;{testimonials[currentIndex].text}&rdquo;
          </p>
          <p className="font-semibold text-slate-900 text-xl">— {testimonials[currentIndex].name}</p>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-teal-600 w-6' : 'bg-slate-300 w-2 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Preview
const ContactPreview: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-teal-700 rounded-2xl p-10 md:p-14 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h2>
          <p className="text-teal-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Simply talk to us and we can arrange the support you need. We believe everyone has the right to live a full life and make their own decisions — we’re here to help make that happen.
          </p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <a href="tel:0400000000" className="bg-white/10 rounded-xl p-6 lg:p-8 hover:bg-white/15 transition-colors border border-white/20">
              <Phone className="mx-auto mb-4" size={32} />
              <div className="font-semibold text-lg mb-2">Phone</div>
              <div className="text-teal-100 text-base">04XX XXX XXX</div>
            </a>
            <a href="mailto:hello@decertosupports.com.au" className="bg-white/10 rounded-xl p-6 lg:p-8 hover:bg-white/15 transition-colors border border-white/20">
              <Mail className="mx-auto mb-4" size={32} />
              <div className="font-semibold text-lg mb-2">Email</div>
              <div className="text-teal-100 text-base break-all">hello@decertosupports.com.au</div>
            </a>
            <a href="https://www.decertosupports.com.au" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-xl p-6 lg:p-8 hover:bg-white/15 transition-colors border border-white/20">
              <Globe className="mx-auto mb-4 text-white" size={32} />
              <div className="font-semibold text-lg mb-2">Website</div>
              <div className="text-teal-100 text-base">www.decertosupports.com.au</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Page – same attractive card style as reference (icon top-left, white card, subtle border)
const SERVICES_WITH_ICONS = [
  { title: 'Personal Assistance (Personal Care)', description: 'We understand that personal care is deeply personal. Our team provides respectful, dignified support with daily personal activities — showering, grooming, hygiene, dressing and mobility support, medication assistance, and mealtime support. Your privacy, dignity, and choice are always at the heart of everything we do.', Icon: HandHelping, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', borderColor: 'border-teal-100' },
  { title: 'Social & Community Participation', description: 'We support you to stay connected, build confidence, and enjoy being part of your community. Support may include attending social events, community outings and appointments, building social skills and independence, and pursuing hobbies and interests. Reliable, person-centred support for an active, confident life.', Icon: Star, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', borderColor: 'border-slate-200' },
  { title: 'Domestic Assistance', description: 'We assist with everyday household tasks to maintain a safe, clean, and comfortable home — general cleaning, laundry and linen changes, meal preparation, and household organisation. Reliable, consistent care you can depend on.', Icon: Home, iconBg: 'bg-slate-100', iconColor: 'text-slate-600', borderColor: 'border-slate-200' },
  { title: 'Home Gardening Services', description: 'We help keep your outdoor spaces safe, tidy, and enjoyable — lawn mowing and garden maintenance, weeding and pruning, general outdoor upkeep, and ensuring pathways are safe and accessible. Friendly, respectful, and dependable support all year round.', Icon: Leaf, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', borderColor: 'border-slate-200' },
  { title: 'High Intensity Supports', description: 'For participants with complex needs we provide trust, understanding, and genuinely compassionate care. Our service is shaped by lived experience. Supports include complex personal care, enteral feeding and medication assistance, specialised equipment support, and support for high physical needs.', Icon: Stethoscope, iconBg: 'bg-rose-100', iconColor: 'text-rose-600', borderColor: 'border-slate-200' },
  { title: 'Support Coordination', description: 'We help you navigate your support plan — connecting you with the right providers, organising and coordinating supports, explaining your plan clearly, building confidence to manage supports independently, and providing ongoing guidance and advocacy when challenges arise.', Icon: Target, iconBg: 'bg-teal-100', iconColor: 'text-teal-600', borderColor: 'border-slate-200' },
];

const ServicesPage: React.FC<{ navigate: (page: string) => void }> = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            At Decerto Supports, we provide a wide range of supports as a disability services provider, tailored to meet the unique needs, goals, and preferences of every participant we work with. You&apos;re not just another participant — you&apos;re part of a community that genuinely cares.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              What we offer
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES_WITH_ICONS.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 sm:p-8 border ${service.borderColor} hover:shadow-xl transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${service.iconBg}`}>
                  <service.Icon className={service.iconColor} size={28} fill="currentColor" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-16 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Levels of Support Coordination</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                <h4 className="font-bold text-teal-800 mb-2">Level 1 – Support Connection</h4>
                <p className="text-slate-600 text-sm">We help you get started by connecting you with the right supports and services.</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                <h4 className="font-bold text-teal-800 mb-2">Level 2 – Coordination of Supports</h4>
                <p className="text-slate-600 text-sm">We work closely with you to manage your supports and build your independence.</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                <h4 className="font-bold text-teal-800 mb-2">Level 3 – Specialist Support Coordination</h4>
                <p className="text-slate-600 text-sm">For more complex situations, we provide extra support to overcome challenges and ensure all your supports work together effectively.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowWeWorkSection />

      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Need help?</h2>
          <p className="text-teal-100 mb-8">Get in touch for a consultation.</p>
          <a
            href="tel:0400000000"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Phone size={18} />
            Call 04XX XXX XXX
          </a>
        </div>
      </section>
    </div>
  );
};

// Careers Page
const CareersPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'Disability Support Worker',
    coverLetter: '',
    resumeFileName: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeFile) setFormData((d) => ({ ...d, resumeFileName: resumeFile.name }));
    alert('Thank you for your application! We will be in touch soon.');
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            We’re looking for people who care about making a difference. If you’re reliable, kind and want to support others to live well, we’d like to hear from you.
          </p>
        </div>
      </section>

      {/* Disability Support Worker – Key duties & Requirements */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">Current vacancy</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Disability Support Worker</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Work with participants to develop rapport and lasting professional relationships. You will work within the support funding framework to help participants achieve their goals, increase independence and participation in the community.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Key duties include</h3>
                <ul className="space-y-3">
                  {['Assistance with ADLs (e.g. toileting, showering, dressing, cooking, cleaning).', 'Individual support to participants with psychosocial or complex needs.', 'Assisting with social outings, shopping trips and appointments.', 'Liaising with families and representatives as required.', 'Promoting positive behaviours, skill development and independence.'].map((duty, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-0.5 text-teal-600 flex-shrink-0" size={18} />
                      <span className="text-slate-700 text-sm">{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {['Certificate III in Individual Support, Community Services, Disability or similar (or willingness to obtain).', 'National Police Certificate (or willingness to obtain).', 'Current driver licence where driving is required.', 'Current First Aid certificate (e.g. HLTAID003 or equivalent).'].map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-0.5 text-teal-600 flex-shrink-0" size={18} />
                      <span className="text-slate-700 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Why work with us?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                You’ll work alongside clients and their families to help with daily life—personal care, household tasks, getting out and about, and being a steady, friendly presence. We match you with people whose needs fit your skills and availability, and support you with training and clear expectations.
              </p>
              <a
                href="mailto:careers@decertosupports.com.au"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Mail size={20} />
                Apply: careers@decertosupports.com.au
              </a>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
                <img
                  src={photo3}
                  alt="Disability support worker"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What you’ll do</h3>
              <ul className="space-y-4">
                {[
                  'Supportive and inclusive team culture',
                  'One-to-one support tailored to each client’s needs and goals.',
                  'Flexible opportunities to suit your lifestyle',
                  'Keep in touch with families and others involved in the person’s care.',
                  'A strong focus on reliability, respect, and quality care'
                ].map((duty, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="text-white" size={16} />
                    </div>
                    <span className="text-slate-700">{duty}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Apply or get in touch</h3>
              <ul className="space-y-4">
                {[
                  'Relevant qualification in disability, community services or similar (or willingness to obtain)',
                  'Clear background check',
                  'Driver’s licence where driving is required',
                  'Current first aid certificate'
                ].map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="text-white" size={16} />
                    </div>
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Apply now</h2>
            <p className="text-xl text-slate-600">
              Send us your details and we’ll get back to you to discuss next steps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="careers-resume" className="block text-sm font-semibold text-gray-700 mb-2">Upload your resume (PDF or DOC)</label>
                <input id="careers-resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-100 file:text-teal-700 file:font-medium" />
                {resumeFile && <p className="mt-2 text-sm text-slate-500">Selected: {resumeFile.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Position Applying For
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                >
                  <option value="Disability Support Worker">Disability Support Worker</option>
                  <option value="Support Coordinator">Support Coordinator</option>
                  <option value="Personal Care Worker">Personal Care Worker</option>
                  <option value="High Intensity Support">High Intensity Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  rows={6}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us why you'd be a great fit for our team..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full px-8 py-4 rounded-xl text-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

// Contact Page
const ContactPage: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-teal-100 max-w-xl mx-auto">
            Have a question or ready to get started? We’re here to help.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in touch</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We can help with support at home, getting out and about, or coordinating your care. Tell us what you’re looking for and we’ll suggest options that fit.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                You can use our services as little or as often as you like. We’ll work with you to design a plan that suits your life.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:hello@decertosupports.com.au"
                  className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-200 transition-colors"
                >
                  <div className="w-11 h-11 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={22} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-0.5">Email</div>
                    <div className="text-teal-600 text-sm">hello@decertosupports.com.au</div>
                  </div>
                </a>
                <a
                  href="tel:0400000000"
                  className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-200 transition-colors"
                >
                  <div className="w-11 h-11 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={22} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-0.5">Phone</div>
                    <div className="text-teal-600 text-sm">04XX XXX XXX</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
                <img
                  src={photo4}
                  alt="Get in touch"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <h3 className="text-xl font-bold mb-1">We&apos;re here to help</h3>
                  <p className="text-sm text-white/90">Reach out for support and guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Footer Component – includes Unsplash image credit (no copyright issues)
const Footer: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
          <div className="md:col-span-2">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Decerto Supports</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Support built on trust, understanding, and genuine care. We walk alongside you with reliable, compassionate support for independence and dignity.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Quick links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('home')} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Home</button></li>
              <li><button onClick={() => navigate('services')} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Services</button></li>
              <li><button onClick={() => navigate('careers')} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Careers</button></li>
              <li><button onClick={() => navigate('contact')} className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="tel:0400000000" className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"><Phone size={16} /> 04XX XXX XXX</a></li>
              <li><a href="mailto:hello@decertosupports.com.au" className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors break-all"><Mail size={16} /> hello@decertosupports.com.au</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div>
            2025 © Decerto Supports
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://www.ndis.gov.au" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors inline-flex items-center gap-1">
              Disability support (Australia) <ExternalLink size={14} />
            </a>
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">Photos: Unsplash</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};