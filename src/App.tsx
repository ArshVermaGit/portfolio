import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import StatementSection from './components/sections/StatementSection'
import TechStackSection from './components/sections/TechStackSection'
import ProjectsSection from './components/sections/ProjectsSection'
import OpenSourceSection from './components/sections/OpenSourceSection'
import GithubSection from './components/sections/GithubSection'
import LeetcodeSection from './components/sections/LeetcodeSection'
import YoutubeSection from './components/sections/YoutubeSection'
import CodingProfilesSection from './components/sections/CodingProfilesSection'
import ContactSection from './components/sections/ContactSection'
import SupportSection from './components/sections/SupportSection'

export default function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  const [bounds, setBounds] = useState({ 
    hero: { top: 0, left: 0, width: 0, height: 0 }, 
    about: { top: 0, left: 0, width: 0, height: 0 } 
  });

  useLayoutEffect(() => {
    const updateBounds = () => {
      if (heroRef.current && aboutRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const aboutRect = aboutRef.current.getBoundingClientRect();
        setBounds({
          hero: {
            top: heroRect.top + window.scrollY,
            left: heroRect.left + window.scrollX,
            width: heroRect.width,
            height: heroRect.height
          },
          about: {
            top: aboutRect.top + window.scrollY,
            left: aboutRect.left + window.scrollX,
            width: aboutRect.width,
            height: aboutRect.height
          }
        });
      }
    };
    
    // Initial and slightly delayed calculations to ensure layout is complete
    updateBounds();
    setTimeout(updateBounds, 100);
    setTimeout(updateBounds, 500);
    document.fonts.ready.then(updateBounds);

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(document.body);
    
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollY } = useScroll();
  
  // We map directly to raw scrollY. 
  // We removed the 'useSpring' physics here because it caused the image to have "inertia" 
  // and lag behind the page scroll, making it feel like it had a mind of its own.
  const smoothScrollY = scrollY;
  
  // Target scroll position perfectly matches when the About section image slot reaches the center of the screen
  const targetScroll = bounds.about.top > 0 ? bounds.about.top - (typeof window !== 'undefined' ? window.innerHeight / 2.5 : 400) : 800;

  const top = useTransform(smoothScrollY, (y) => {
    if (y <= 0) return bounds.hero.top;
    if (y >= targetScroll) return bounds.about.top - y;
    const progress = y / targetScroll;
    const start = bounds.hero.top;
    const end = bounds.about.top - targetScroll;
    return start + (end - start) * progress;
  });

  const left = useTransform(smoothScrollY, [0, targetScroll], [bounds.hero.left, bounds.about.left]);
  const width = useTransform(smoothScrollY, [0, targetScroll], [bounds.hero.width, bounds.about.width]);
  const height = useTransform(smoothScrollY, [0, targetScroll], [bounds.hero.height, bounds.about.height]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 text-[#111111] relative isolate">
      <Navbar />
      
      {/* Global Animated Profile Picture */}
      {bounds.hero.width > 0 && (
        <motion.div 
          className="fixed z-50 flex items-center justify-center"
          style={{ top, left, width, height, willChange: "top, left, width, height" }}
        >
          {/* iOS Liquid Glass Halo Container */}
          <div className="absolute inset-[-16px] bg-white/20 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] z-0"></div>
          
          <img 
            src="/photo.png"
            className="relative z-10 w-full h-full object-cover rounded-[1.5rem] shadow-lg"
            alt="Profile"
          />
        </motion.div>
      )}

      <main>
        <HeroSection imageRef={heroRef} />
        <AboutSection imageRef={aboutRef} />
        <StatementSection />
        <TechStackSection />
        <ProjectsSection />
        <OpenSourceSection />
        <GithubSection />
        <LeetcodeSection />
        <YoutubeSection />
        <CodingProfilesSection />
        <ContactSection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  )
}
