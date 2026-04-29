import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SEO from './components/SEO';
import CinematicIntro from './components/CinematicIntro';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lazy load components
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Stats = lazy(() => import('./components/Stats'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const FAQ = lazy(() => import('./components/FAQ'));
const DevelopmentJourney = lazy(() => import('./components/DevelopmentJourney'));
const BrandVideo = lazy(() => import('./components/BrandVideo'));

// Lazy load pages
const WebsiteDevelopment = lazy(() => import('./pages/services/WebsiteDevelopment'));
const MobileAppDevelopment = lazy(() => import('./pages/services/MobileAppDevelopment'));
const BusinessAutomation = lazy(() => import('./pages/services/BusinessAutomation'));
const CustomSoftwareSolutions = lazy(() => import('./pages/services/CustomSoftwareSolutions'));
const Profile = lazy(() => import('./pages/Profile'));

gsap.registerPlugin(ScrollTrigger);

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    if (!isIntroComplete) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.normalizeScroll(true);

      const sections = [
        { trigger: ".section-about", target: ".about-inner" },
        { trigger: ".section-services", target: ".services-inner" },
        { trigger: ".section-work", target: ".portfolio-inner" },
        { trigger: ".section-stats", target: ".stats-inner" },
        { trigger: ".section-testimonials", target: ".testimonials-inner" }
      ];

      sections.forEach(({ trigger, target }) => {
        gsap.fromTo(target, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, y: 0,
            scrollTrigger: {
              trigger: trigger,
              start: "top center+=100", 
              end: "bottom center",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx?.revert();
  }, [isIntroComplete]);

  useEffect(() => {
    if (isIntroComplete) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isIntroComplete]);

  return (
    <div ref={containerRef} className="w-full">
      <SEO />
      <CinematicIntro onComplete={() => setIsIntroComplete(true)} />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
        className={isIntroComplete ? 'block w-full' : 'hidden'}
      >
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(#00AEEF 1px, transparent 1px), linear-gradient(90deg, #00AEEF 1px, transparent 1px)', backgroundSize: '120px 120px' }} />

        <div className="fixed top-[-30%] left-[-20%] w-[80%] h-[80%] bg-brand-blue/5 blur-[200px] rounded-full pointer-events-none z-0" />
        <div className="fixed bottom-[-30%] right-[-20%] w-[80%] h-[80%] bg-brand-gold/5 blur-[200px] rounded-full pointer-events-none z-0" />

        <Navbar />
        
        <div className="relative z-10 w-full">
          <section className="section-hero w-full" id="home">
            <Hero />
          </section>

          <Suspense fallback={<div className="h-20" />}>
            <DevelopmentJourney />
          </Suspense>
          
          <Suspense fallback={<div className="h-64" />}>
            <BrandVideo />
          </Suspense>
          
          <div className="w-full">
            <section className="section-about w-full" id="about">
              <div className="about-inner">
                <Suspense fallback={<div className="h-96" />}>
                  <About />
                </Suspense>
              </div>
            </section>
            
            <section className="section-services w-full" id="services">
              <div className="services-inner">
                <Suspense fallback={<div className="h-96" />}>
                  <Services />
                </Suspense>
              </div>
            </section>
            
            <section className="section-work w-full" id="work">
              <div className="portfolio-inner">
                <Suspense fallback={<div className="h-96" />}>
                  <Portfolio />
                </Suspense>
              </div>
            </section>
            
            <section className="section-stats w-full">
              <div className="stats-inner">
                <Suspense fallback={<div className="h-64" />}>
                  <Stats />
                </Suspense>
              </div>
            </section>
            
            <section className="section-testimonials w-full">
              <div className="testimonials-inner">
                <Suspense fallback={<div className="h-96" />}>
                  <Testimonials />
                </Suspense>
              </div>
            </section>

            <section className="section-faq w-full" id="faq">
              <Suspense fallback={<div className="h-64" />}>
                <FAQ />
              </Suspense>
            </section>
            
            <section className="section-contact w-full" id="contact">
              <Suspense fallback={<div className="h-96" />}>
                <Contact />
              </Suspense>
            </section>

            <Suspense fallback={<div className="h-40" />}>
              <Footer />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <main className="bg-[#030303] text-white selection:bg-brand-blue/30 selection:text-white antialiased">
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/website-development" element={<WebsiteDevelopment />} />
            <Route path="/mobile-app-development" element={<MobileAppDevelopment />} />
            <Route path="/business-automation" element={<BusinessAutomation />} />
            <Route path="/custom-software" element={<CustomSoftwareSolutions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

