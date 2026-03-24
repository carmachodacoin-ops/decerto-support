import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ArrowRight, Facebook, Check, Target, HandHelping, Home, Shield, ExternalLink, MapPin, ChevronUp, Star, Leaf, Stethoscope, Globe, Instagram } from 'lucide-react';
import logoSrc from './src/logo/logo.jpeg';
import imageJpg from './src/logo/5.jpg';
import image2 from './src/logo/6.jpg';
import photo2 from './src/logo/2.jpeg';
import photo3 from './src/logo/3.jpg';
import photo4 from './src/logo/4.jpg';
import photoJpeg from './src/logo/7.jpeg';
import photo1 from './src/logo/1.jpeg';
import photo8 from './src/logo/8.jpg';
import photo9 from './src/logo/9.jpeg';
import backgroundImage from './src/logo/background.jpg';

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
          {currentPage === 'privacy' && <PrivacyPolicyPage />}
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
      <BackToTop show={showBackToTop} />
    </div>
  );
}

// Settings page – empty
const SettingsPage: React.FC<{
  textZoom: number;
  setTextZoom: (v: number) => void;
  backgroundTheme: BackgroundTheme;
  setBackgroundTheme: (v: BackgroundTheme) => void;
}> = () => (
  <div className="min-h-screen w-full pt-24 pb-20 px-6 sm:px-8 lg:px-12 xl:px-16">
    <div className="max-w-5xl w-full mx-auto">
      <p className="text-slate-600 text-center">No settings to display.</p>
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
      className="h-[84px] sm:h-[98px] md:h-[110px] w-auto object-contain flex-shrink-0 border-0 outline-none ring-0 shadow-none"
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
      <div className="max-w-[1600px] w-full mx-auto pl-[2px] pr-4 sm:pl-2 sm:pr-6 lg:pl-3 lg:pr-8 xl:pl-4 xl:pr-12">
        <div className="flex justify-between items-center h-20 min-h-[4rem] sm:h-24 sm:min-h-[5rem]">
          {/* Logo */}
          <button 
            onClick={() => navigate('home')}
            className="flex items-center gap-6 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-lg"
          >
            <LogoImage />
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 tracking-tight leading-tight">
                Decerto Supports
              </h1>
              <p className="text-sm sm:text-base text-teal-700 mt-0.5 font-medium tracking-wide">
                Disability Services Provider
              </p>
            </div>
          </button>

          {/* Desktop right cluster: nav + social with consistent spacing */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <nav className="flex items-center gap-2" aria-label="Main navigation">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className={`relative min-h-[44px] px-5 py-3 rounded-xl text-base font-semibold border-2 border-transparent transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-teal-600 after:origin-center after:opacity-0 after:scale-x-90 after:transition-all after:duration-300 after:ease-out ${
                    currentPage === item.page
                      ? 'bg-transparent text-slate-900 shadow-none after:opacity-100 after:scale-x-100'
                      : 'bg-transparent text-slate-600 hover:text-slate-900 shadow-none hover:after:opacity-100 hover:after:scale-x-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a href="https://www.facebook.com/decertosupports" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:bg-[#166FE5] transition-colors" aria-label="Facebook">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/decertosupports?igsh=MTFzenMzdTdlY254eg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#E1306C] text-white flex items-center justify-center hover:bg-[#C13584] transition-colors" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

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
                className={`w-full text-left min-h-[48px] px-5 py-3.5 rounded-xl text-base font-semibold border-2 border-transparent transition-colors ${
                  currentPage === item.page
                    ? 'bg-transparent text-slate-900'
                    : 'text-slate-700 hover:bg-transparent hover:text-slate-900'
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Social (mobile) – icon buttons like desktop */}
            <div className="pt-3 border-t border-slate-200/70 flex items-center gap-2">
              <a href="https://www.facebook.com/decertosupports" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:bg-[#166FE5] transition-colors" aria-label="Facebook">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/decertosupports?igsh=MTFzenMzdTdlY254eg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#E1306C] text-white flex items-center justify-center hover:bg-[#C13584] transition-colors" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
            </div>
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
      <ContactPreview />
    </>
  );
};

// Hero background image for clean, single-photo hero
const HERO_IMAGE = {
  src: backgroundImage,
  caption: 'Support built on trust, understanding, and genuine care',
};

// Hero Section – single-image layout
const HeroSection: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => (
  <section className="relative min-h-[78vh] sm:min-h-[85vh] flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden bg-white">
    <div className="absolute inset-0">
      <img
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.caption}
        className="w-full h-full object-cover filter saturate-105 brightness-95"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/25 to-slate-950/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 w-full text-white">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
          Disability Support
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white">
          Decerto Supports —{' '}
          <span className="italic font-semibold text-teal-100">Trusted, Reliable Care</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl text-slate-100">
          At Decerto Supports, we believe support should feel personal — not just a service, but something built on trust, understanding, and genuine care. With lived experience at the heart of our organisation, we truly understand the challenges and realities of living with a disability.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate('contact')}
            className="btn-primary group flex items-center gap-2"
          >
            Contact Us
            <ArrowRight className="group-hover:translate-x-0.5 transition-transform" size={18} />
          </button>
          <a
            href="tel:0400772201"
            className="btn-secondary flex items-center gap-2 !bg-white/90 !text-slate-800 !border-white/80 hover:!bg-white hover:!border-white"
          >
            <Phone size={18} />
            Call Us
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/30 text-slate-100">
          <div className="text-center sm:text-left">
            <div className="text-lg sm:text-2xl font-bold text-white">Quality</div>
            <div className="text-xs sm:text-sm mt-1">Focused</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-lg sm:text-2xl font-bold text-white">Lived</div>
            <div className="text-xs sm:text-sm mt-1">Experience</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-lg sm:text-2xl font-bold text-white">You</div>
            <div className="text-xs sm:text-sm mt-1">At the centre</div>
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-200">{HERO_IMAGE.caption}</div>
      </div>
    </div>
  </section>
);

// About Section
const AboutSection: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-white to-blue-50/40 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
              <img
                src={photo1}
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
              Decerto Supports is here to help you live your life your way. We provide safe, reliable support that is made to suit your needs, your goals, and your daily routine. You can count on us to show up and be there when you need us.
            </p>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
              What makes us different is real lived experience. Our Director has a disability and uses high intensity supports every day. This means we truly understand what you are going through and what good, reliable support should look like.
            </p>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
              We treat everyone with kindness, respect, and dignity. We listen to you and support your independence, so you can feel confident, safe, and in control of your life.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-1">Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To provide reliable, high-quality support that helps people live safely, independently, and with confidence — guided by lived experience and always following the NDIS Code of Conduct.
                </p>
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">Our Values</h3>
                <ul className="text-slate-600 text-sm leading-relaxed space-y-1">
                  <li>Reliability – We show up and provide consistent, dependable support</li>
                  <li>Compassion – We care and treat everyone with kindness</li>
                  <li>Trust – We build strong, honest relationships you can rely on</li>
                  <li>Lived Experience – We understand because we live it</li>
                  <li>Respect – We support choice, dignity, and independence</li>
                  <li>Independence – We support you to live your life your way</li>
                  <li>Quality &amp; Safety – We deliver safe, high-standard care</li>
                  <li>NDIS Compliance – We follow the NDIS Code of Conduct at all times</li>
                </ul>
              </div>
            </div>
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
    { title: 'Personal Assistance (Personal Care)', description: 'We provide respectful and dignified support with daily personal activities to help you maintain independence and comfort in your everyday life.', Icon: HandHelping, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', borderColor: 'border-teal-100' },
    { title: 'Social & Community Participation', description: 'We support participants to stay connected, build confidence, and engage in their community through social activities, outings, appointments, and personal interests.', Icon: Star, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', borderColor: 'border-slate-200' },
    { title: 'Support Coordination', description: 'We assist participants in understanding and implementing their plans, connecting with providers, coordinating supports, and building confidence to make informed choices.', Icon: Target, iconBg: 'bg-teal-100', iconColor: 'text-teal-600', borderColor: 'border-slate-200' },
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
                  src={image2}
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

// Blog Section
const BLOG_SHARED_CONTENT =
  'At Decerto Supports, we provide reliable and compassionate support tailored to each person’s goals, daily routine, and independence. We focus on consistency, dignity, and safe care so every participant feels respected, confident, and supported.';

const BLOG_ITEMS = [
  { title: 'Reliable Support That Truly Understands', image: photo1 },
  { title: 'Lived Experience, Real Compassion, Better Care', image: photo2 },
  { title: 'Person-Centred Services Built Around Your Life', image: photo3 },
  { title: 'Daily Personal Care With Dignity and Respect', image: photo4 },
  { title: 'Community Participation That Builds Confidence', image: imageJpg },
  { title: 'Domestic Assistance for Safer Home Living', image: image2 },
  { title: 'High Intensity Supports by Trained Staff', image: photoJpeg },
  { title: 'Support Coordination That Simplifies Your Plan', image: photo8 },
  { title: 'Consistent Care You Can Trust Every Day', image: photo9 },
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-teal-50 via-white to-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Recent Updates</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-2">
            Recent Blog
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto mt-3 text-base md:text-lg leading-relaxed">
            We are adding more recent blogs regularly. For now, the same detailed content is shown across all posts as requested.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {BLOG_ITEMS.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl hover:border-teal-200 transition-all duration-300"
            >
              <img src={item.image} alt={item.title} className="w-full h-52 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-base">{BLOG_SHARED_CONTENT}</p>
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
            <a href="tel:0400772201" className="bg-white/10 rounded-xl p-6 lg:p-8 hover:bg-white/15 transition-colors border border-white/20">
              <Phone className="mx-auto mb-4" size={32} />
              <div className="font-semibold text-lg mb-2">Phone</div>
              <div className="text-teal-100 text-base">0400772201</div>
            </a>
            <a href="mailto:admin@decertosupports.com.au" className="bg-white/10 rounded-xl p-6 lg:p-8 hover:bg-white/15 transition-colors border border-white/20">
              <Mail className="mx-auto mb-4" size={32} />
              <div className="font-semibold text-lg mb-2">Email</div>
              <div className="text-teal-100 text-base break-all">admin@decertosupports.com.au</div>
            </a>
            <a href="https://www.decertosupports.com.au" target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-xl p-6 lg:p-8 hover:bg-white/15 transition-colors border border-white/20 overflow-hidden">
              <Globe className="mx-auto mb-4 text-white" size={32} />
              <div className="font-semibold text-lg mb-2">Website</div>
              <div className="text-teal-100 text-sm sm:text-base leading-tight break-all max-w-full">www.decertosupports.com.au</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Page – same attractive card style as reference (icon top-left, white card, subtle border)
const SERVICES_WITH_ICONS = [
  { title: 'Personal Assistance (Personal Care)', description: 'We provide respectful and dignified support with daily personal activities to help you maintain independence and comfort in your everyday life. This includes showering, grooming and hygiene, dressing and mobility support, medication assistance (as required), and mealtime support.', Icon: HandHelping, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', borderColor: 'border-teal-100' },
  { title: 'Social & Community Participation', description: 'We support participants to stay connected, build confidence, and engage in their community. This may include attending social events and activities, community outings and appointments, building social skills and independence, and support to pursue hobbies and interests.', Icon: Star, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', borderColor: 'border-slate-200' },
  { title: 'Domestic Assistance', description: 'We assist with everyday household tasks to help maintain a safe, clean, and comfortable living environment, including general cleaning, laundry and linen changes, meal preparation, and household organisation.', Icon: Home, iconBg: 'bg-slate-100', iconColor: 'text-slate-600', borderColor: 'border-slate-200' },
  { title: 'Home Gardening Services', description: 'We help maintain outdoor spaces so they remain safe, accessible, and enjoyable. This may include lawn mowing, garden maintenance, weeding and pruning, general outdoor upkeep, and ensuring pathways are safe and accessible.', Icon: Leaf, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', borderColor: 'border-slate-200' },
  { title: 'High Intensity Supports', description: 'We provide specialised care delivered by highly trained staff for participants with more complex needs. This may include complex personal care, enteral feeding and medication support, assistance with specialised equipment, and support for participants with high physical needs.', Icon: Stethoscope, iconBg: 'bg-rose-100', iconColor: 'text-rose-600', borderColor: 'border-slate-200' },
  { title: 'Support Coordination (Level 1, Level 2 and Level 3)', description: 'We assist participants in understanding and implementing their plans, helping them get the most out of supports by connecting with providers, coordinating services, building capacity, and offering ongoing guidance and advocacy.', Icon: Target, iconBg: 'bg-teal-100', iconColor: 'text-teal-600', borderColor: 'border-slate-200' },
];

const ServicesPage: React.FC<{ navigate: (page: string) => void }> = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-teal-100 max-w-3xl mx-auto">
            Support you can trust. Care that truly understands. We provide reliable, high-quality supports built around your life, your needs, your goals, and your daily routine. From everyday assistance to complex and high intensity supports, we are here when it matters most.
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
            href="tel:0400772201"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Phone size={18} />
            Call 0400772201
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
    coverLetter: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your application! We will be in touch soon.');
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-teal-100 max-w-3xl mx-auto">
            Join a team you can trust. We are a reliable and caring team who support people living with disability to live independently and live their best life.
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
                Our Director has lived experience with disability. This means we truly understand the importance of showing up, being consistent, and treating every person with respect.
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
                  src={photoJpeg}
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
                  'Reliable — we do what we say we will',
                  'Compassionate — we care about every person',
                  'Supportive — we work as a team'
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What we offer our staff</h3>
              <ul className="space-y-4">
                {[
                  'Ongoing training, guidance, and development',
                  'Supportive and professional team environment',
                  'A role where your work is genuinely valued',
                  'Opportunity to make a meaningful difference'
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
          <p className="text-teal-100 max-w-3xl mx-auto">
            We&apos;re here to help you. We support people with disability to live independently, with confidence and choice, and we are ready to guide you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in touch</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We are a team built on reliability, compassion, and trust. We show up, we listen, and we care. Our Director has lived experience with disability, so we understand what quality support should look like.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Need support, have questions, or ready to get started? We are friendly, easy to talk to, and here to support your independence with respect and understanding.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:admin@decertosupports.com.au"
                  className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-200 transition-colors"
                >
                  <div className="w-11 h-11 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={22} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-0.5">Email</div>
                    <div className="text-teal-600 text-sm">admin@decertosupports.com.au</div>
                  </div>
                </a>
                <a
                  href="tel:0400772201"
                  className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-200 transition-colors"
                >
                  <div className="w-11 h-11 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={22} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-0.5">Phone</div>
                    <div className="text-teal-600 text-sm">0400772201</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
                <img
                  src={photo8}
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
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Privacy Policy</h2>
          <p className="text-slate-600 leading-relaxed mb-3">
            At Decerto Supports, we respect your privacy and are committed to protecting personal information. We may collect your name, email, phone number, and enquiry details when you contact us, complete forms, or communicate with us.
          </p>
          <p className="text-slate-600 leading-relaxed mb-3">
            We use this information to respond to enquiries, provide support, improve services, and communicate important updates. We do not sell, trade, or rent your personal information to third parties.
          </p>
          <p className="text-slate-600 leading-relaxed mb-3">
            We take reasonable steps to protect your information from misuse, loss, and unauthorised access. You may request access to your personal information, corrections, or removal where appropriate by contacting us.
          </p>
          <p className="text-slate-600 leading-relaxed">
            This policy may be updated from time to time. For privacy questions, please contact us at admin@decertosupports.com.au.
          </p>
        </div>
      </section>
    </div>
  );
};

const PrivacyPolicyPage: React.FC = () => (
  <div className="pt-20">
    <section className="py-20 bg-teal-700 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-teal-100 text-lg">
          At Decerto Supports, we are committed to protecting the privacy and personal information of our community.
        </p>
      </div>
    </section>
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Information We Collect</h2>
          <p className="text-slate-700 leading-relaxed">
            We may collect personal information such as your name, email address, phone number, and other contact details when you submit forms, communicate with us directly, or subscribe to updates and communications. We may also collect non-identifiable information such as your IP address, device type, and browsing behaviour to help us understand website usage and improve your experience.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">How We Use Your Information</h2>
          <p className="text-slate-700 leading-relaxed">
            We use your information to deliver and improve our services, respond to enquiries and provide support, share relevant updates about Decerto Supports, and monitor website performance and user experience. We are committed to your privacy and will never sell, trade, or rent your personal information to third parties.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Data Security</h2>
          <p className="text-slate-700 leading-relaxed">
            We take reasonable steps to ensure your personal information is protected from misuse, interference, loss, or unauthorised access. This includes maintaining secure systems and limiting access to authorised personnel only. While no online system is completely secure, we encourage you to contact us if you have concerns.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Your Rights</h2>
          <p className="text-slate-700 leading-relaxed">
            You have the right to request access to the personal information we hold about you, ask for corrections if your details are inaccurate or outdated, and request that your information be removed where appropriate. For privacy requests, please contact us at <a href="mailto:admin@decertosupports.com.au" className="text-teal-700 font-semibold hover:text-teal-800">admin@decertosupports.com.au</a>.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Updates to This Privacy Policy</h2>
          <p className="text-slate-700 leading-relaxed">
            We may update this policy from time to time to reflect legal requirements or practice changes. Please review this page periodically.
          </p>
        </div>
      </div>
    </section>
  </div>
);

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
            <div className="flex items-center gap-2">
              <a href="https://www.facebook.com/decertosupports" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:bg-[#166FE5] transition-colors" aria-label="Facebook">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/decertosupports?igsh=MTFzenMzdTdlY254eg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#E1306C] text-white flex items-center justify-center hover:bg-[#C13584] transition-colors" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.5} />
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
              <li><a href="tel:0400772201" className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"><Phone size={16} /> 0400772201</a></li>
              <li><a href="mailto:admin@decertosupports.com.au" className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors break-all"><Mail size={16} /> admin@decertosupports.com.au</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="text-center md:text-left">
            <div>2025 © Decerto Supports</div>
            <a href="mailto:karmachoda11@gmail.com" className="text-slate-500 hover:text-teal-400 transition-colors">
              Developed by karmachoda11@gmail.com
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://www.ndis.gov.au" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors inline-flex items-center gap-1">
              Disability support (Australia) <ExternalLink size={14} />
            </a>
            <button onClick={() => navigate('privacy')} className="hover:text-teal-400 transition-colors">Privacy</button>
            <span className="text-slate-500">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
