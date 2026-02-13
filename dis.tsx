import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Phone, Mail, ChevronRight, ArrowRight, Facebook, Twitter, Youtube, Check, Calendar, Target, HandHelping, Car, Home, Shield } from 'lucide-react';

// Types
interface Service {
  title: string;
  description: string;
  icon: string;
}

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

// Router Component
const Router: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="font-sans bg-slate-50 text-slate-900 antialiased">
      <Header 
        scrolled={scrolled} 
        currentPage={currentPage} 
        navigate={navigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="min-h-screen">
        {currentPage === 'home' && <HomePage navigate={navigate} />}
        {currentPage === 'services' && <ServicesPage navigate={navigate} />}
        {currentPage === 'careers' && <CareersPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

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
          ? 'bg-white shadow-sm border-b border-slate-200/80' 
          : 'bg-white/90 backdrop-blur-md'
      }`}
      style={{
        animation: 'slideDown 0.5s ease-out'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button 
            onClick={() => navigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="bg-teal-600 p-2.5 rounded-xl shadow-sm">
              <Heart className="text-white" size={26} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Care Connect
              </h1>
              <p className="text-xs text-slate-500 -mt-0.5">Disability &amp; Family Support</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-teal-600'
                }`}
              >
                {item.name}
              </button>
            ))}
            <a
              href="tel:+97517878787"
              className="ml-4 px-5 py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Phone size={16} />
              +975 17878787
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden bg-white border-t shadow-xl"
          style={{
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.name}
              </button>
            ))}
            <a
              href="tel:+97517878787"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700"
            >
              <Phone size={16} />
              +975 17878787
            </a>
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

// Hero Section – professional, disability & family health care
const HeroSection: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
              Personalised care for you and your family
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Tailored support for daily living, health and wellbeing. We work with you to build a plan that fits your life and keeps you at the centre of every decision.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate('contact')}
                className="group px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                Contact Us
                <ArrowRight className="group-hover:translate-x-0.5 transition-transform" size={18} />
              </button>
              <a
                href="tel:+97517878787"
                className="px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold border border-slate-200 hover:border-teal-300 hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <Phone size={18} />
                Call +975 17878787
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 mt-8">
              <div>
                <div className="text-2xl font-bold text-teal-600">24/7</div>
                <div className="text-sm text-slate-500 mt-0.5">Care available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600">Local</div>
                <div className="text-sm text-slate-500 mt-0.5">Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600">8+</div>
                <div className="text-sm text-slate-500 mt-0.5">Services</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=1000&fit=crop"
                alt="Compassionate care and support at home - Unsplash"
                className="w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Heart size={20} fill="white" />
                  </div>
                  <span className="font-medium">Compassionate care for every individual and family</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  return (
    <section className="py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop"
                alt="Professional disability and health care support - Unsplash"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
          <div className="space-y-5 order-1 md:order-2">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Who we are
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Care Connect exists to help people live well at home and in the community. We focus on what matters to you—choice, comfort and connection—so you can lead the life you want.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We offer disability support and family-focused care that adapts to your situation. Whether you need a few hours a week or more regular support, our team works alongside you to make daily life easier and more meaningful.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Services include personal care, help at home, transport, getting out into the community, and coordination so your support is clear and consistent. Everything we do is designed around you and your family.
            </p>
            <button
              onClick={() => navigate('contact')}
              className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
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

// Why Choose Section
const WhyChooseSection: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  const items = [
    { title: 'Level 2 & 3 Specialist Support Coordination', icon: Target },
    { title: 'Behaviour Support Implementation', icon: Shield },
    { title: 'STA, Respite & SIL Accommodation', icon: Home },
  ];
  return (
    <section className="py-20 lg:py-24 bg-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-teal-200 font-semibold text-sm uppercase tracking-wider">Why work with us</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Support that fits your life
          </h2>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            We’re taking on new clients and can start when you’re ready. From short-term help to ongoing care, we’ll match you with the right support and a team that listens.
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
          Flexible options: from a few hours to round-the-clock care
        </p>
        <div className="text-center">
          <a
            href="mailto:karmachoda11@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
          >
            <Mail size={18} />
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

// Services Preview
const ServicesPreview: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  const services = [
    { title: 'Support coordination', description: 'We help you navigate funding and services, set goals and connect with the right supports so you stay in control.', Icon: Target },
    { title: 'Personal care', description: 'Day-to-day help with washing, dressing and hygiene delivered with respect and in line with your preferences.', Icon: HandHelping },
    { title: 'Transport', description: 'Safe, comfortable travel to appointments, errands and outings so you can get where you need to go.', Icon: Car },
  ];
  return (
    <section className="py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">What we do</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Our services
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-teal-200 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                <service.Icon className="text-teal-600 group-hover:text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('services')}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
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
    <section className="py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Work with us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
              Careers
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We’re building a team of kind, dependable people who want to make a real difference. Support workers help with everyday tasks and are often a steady presence for clients and families.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              That includes help around the house, with paperwork and medicines, personal care and simply being there when it matters. If that sounds like you, get in touch at karmachoda11@gmail.com.
            </p>
            <button
              onClick={() => navigate('careers')}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
            >
              Find out more
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop"
                alt="Join our care team - Unsplash"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <div className="font-semibold">Make a difference</div>
                <div className="text-sm text-white/90">Join our compassionate team</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Blog Section – disability, family & health care; images from Unsplash
const BlogSection: React.FC = () => {
  const posts: BlogPost[] = [
    {
      title: 'Safety and peace of mind in disability and family care',
      date: 'May 21, 2023',
      excerpt: 'How we keep participants and families safe at home and in the community, with clear plans and trained staff.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
      category: 'Health'
    },
    {
      title: 'Staying active: community and social participation',
      date: 'May 21, 2023',
      excerpt: 'Ideas and support for outings, hobbies, and social activities that support wellbeing and independence.',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop',
      category: 'Activities'
    },
    {
      title: 'A welcoming approach to in-home and family support',
      date: 'May 21, 2023',
      excerpt: 'Why a warm, consistent approach matters for disability support and family health care at home.',
      image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=600&h=400&fit=crop',
      category: 'Support'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Latest Updates</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Latest Blog
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-teal-600 text-white text-xs font-medium rounded">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <Calendar size={14} />
                  {post.date}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                <span className="text-teal-600 font-semibold text-sm inline-flex items-center gap-1">
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
    { title: 'Understand what you want', description: 'We sit down with you to talk about your goals and what good support looks like for you.' },
    { title: 'Build your plan', description: 'We help you access the right funding and services so your support matches your life.' },
    { title: 'Get started quickly', description: 'We move at your pace and get supports in place so you’re not left waiting.' },
    { title: 'Coordination and clarity', description: 'We keep your plan clear and up to date so you always know who’s doing what.' },
    { title: 'Transparent and fair', description: 'Our fees are clear and we focus on getting you the best value from your funding.' },
    { title: 'Ongoing guidance', description: 'We explain how systems and funding work so you can make informed choices.' }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our approach</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            How we work
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-teal-200 transition-colors"
            >
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section – generic positive quotes (no real client names)
const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    { name: 'Family member', text: 'The team is easy to work with and the care we receive is excellent. We feel heard and well supported.' },
    { name: 'Referrer', text: 'Clients are consistently happy with the service. Things are set up quickly and communication is always clear.' },
    { name: 'Parent', text: 'My child looks forward to outings with their worker. The difference it has made to our family is huge.' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Client stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Testimonials
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-10 text-center">
          <Heart className="mx-auto mb-6 text-teal-500" size={40} fill="currentColor" />
          <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
            &ldquo;{testimonials[currentIndex].text}&rdquo;
          </p>
          <p className="font-semibold text-slate-900">— {testimonials[currentIndex].name}</p>
          <div className="flex justify-center gap-2 mt-6">
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
    <section className="py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-700 rounded-2xl p-10 md:p-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in touch</h2>
          <p className="text-teal-100 mb-10 max-w-xl mx-auto">
            Tell us what you need and we’ll help you put the right support in place.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="mailto:karmachoda11@gmail.com"
              className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors border border-white/20"
            >
              <Mail className="mx-auto mb-3" size={28} />
              <div className="font-semibold mb-1">Email</div>
              <div className="text-teal-100 text-sm">karmachoda11@gmail.com</div>
            </a>
            <a
              href="tel:+97517878787"
              className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors border border-white/20"
            >
              <Phone className="mx-auto mb-3" size={28} />
              <div className="font-semibold mb-1">Phone</div>
              <div className="text-teal-100 text-sm">+975 17878787</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Page
const ServicesPage: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  const services = [
    {
      title: 'Support coordination',
      description: 'We help you make sense of funding and services, set goals and link you with the right supports. You stay in control; we handle the paperwork and connections so your plan works for you.',
      icon: '🎯'
    },
    {
      title: 'Personal care',
      description: 'Help with washing, dressing and hygiene, delivered with respect and in line with your routine. We focus on your comfort and independence at home and keep your preferences at the centre.',
      icon: '💙'
    },
    {
      title: 'Transport',
      description: 'Door-to-door travel for appointments, shopping and social trips. We make getting around easier when mobility or public transport is a barrier.',
      icon: '🚗'
    },
    {
      title: 'Domestic Assistance',
      description: 'Managing your home can be easier with a little help. Our domestic services include cleaning, laundry, dishwashing, and general tidying. Whether it\'s ongoing or occasional support, we\'re here to make daily living more manageable so you can enjoy a clean, safe, and comfortable living space.',
      icon: '🏠'
    },
    {
      title: 'Social & Community Participation',
      description: 'We help you stay connected and active in your community. Whether it\'s attending social outings, events, group activities, or visiting family, we provide transport and support. Our services are designed to build your confidence, enhance your social life, and help you participate in activities.',
      icon: '🌟'
    },
    {
      title: 'Home & Garden Services',
      description: 'Keeping your home and garden in shape can be challenging with a disability or health condition. Our team assists with mowing, tidying, light maintenance, and household tasks. We aim to keep your living space clean, safe, and welcoming—so you can enjoy your environment and feel proud of your home.',
      icon: '🌱'
    },
    {
      title: 'Nursing',
      description: 'We offer professional and compassionate nursing care tailored to your individual health needs. Whether it\'s managing medications, providing wound care, monitoring chronic conditions, or supporting recovery, our experienced nurses are here to help. We aim to promote your independence, comfort, and overall wellbeing.',
      icon: '⚕️'
    },
    {
      title: 'Behaviour Support Implementation',
      description: 'We help you put personalised behaviour support plans into everyday practice. Our trained staff work alongside you to encourage positive behaviour, develop skills, and create safe, supportive environments. We focus on building confidence and improving daily experiences.',
      icon: '💪'
    }
  ];

  return (
    <div className="pt-20">
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our services</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            We offer in-home support, transport, community access and coordination so you can live the way you want. Every package is built around your goals and preferences.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              What we offer
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-teal-200 transition-colors"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowWeWorkSection />

      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Need help?</h2>
          <p className="text-teal-100 mb-8">Get in touch for a consultation.</p>
          <a
            href="tel:+97517878787"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
          >
            <Phone size={18} />
            Call +975 17878787
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join our team</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            We’re looking for people who care about making a difference. If you’re reliable, kind and want to support others to live well, we’d like to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-6">
                Vacancy
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Support worker
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                You’ll work alongside clients and their families to help with daily life—personal care, household tasks, getting out and about, and being a steady, friendly presence. We match you with people whose needs fit your skills and availability, and support you with training and clear expectations.
              </p>
              <a
                href="mailto:karmachoda11@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                <Mail size={20} />
                Apply: karmachoda11@gmail.com
              </a>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
                <img
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop"
                  alt="Disability support worker - Unsplash"
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
                  'Help with daily activities: personal care, meal prep, light housekeeping.',
                  'One-to-one support tailored to each client’s needs and goals.',
                  'Support with outings, appointments and community activities.',
                  'Keep in touch with families and others involved in the person’s care.',
                  'Encourage skills and confidence and follow any behaviour support plans.'
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What we need from you</h3>
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
                  <option>Disability Support Worker</option>
                  <option>Support Coordinator</option>
                  <option>Nurse</option>
                  <option>Other</option>
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
                className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact us</h1>
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
                  href="mailto:karmachoda11@gmail.com"
                  className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-200 transition-colors"
                >
                  <div className="w-11 h-11 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={22} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-0.5">Email</div>
                    <div className="text-teal-600 text-sm">karmachoda11@gmail.com</div>
                  </div>
                </a>
                <a
                  href="tel:+97517878787"
                  className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-200 transition-colors"
                >
                  <div className="w-11 h-11 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={22} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-0.5">Phone</div>
                    <div className="text-teal-600 text-sm">+975 17878787</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=1000&fit=crop"
                  alt="Get in touch - Unsplash"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <h3 className="text-xl font-bold mb-1">We're here to help</h3>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-600 p-2.5 rounded-xl">
                <Heart className="text-white" size={24} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Care Connect</h3>
                <p className="text-sm text-slate-400">Disability &amp; Family Support</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We’re here to help you live well at home and in the community, with support that puts you in the driver’s seat.
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
              <li><a href="tel:+97517878787" className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"><Phone size={16} /> +975 17878787</a></li>
              <li><a href="mailto:karmachoda11@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors break-all"><Mail size={16} /> karmachoda11@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div>
            2025 © Care Connect
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
              Photos: Unsplash
            </a>
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};