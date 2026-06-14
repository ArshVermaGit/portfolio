import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  User, 
  Layers, 
  Code, 
  Terminal, 
  GitBranch,
  GitPullRequest, 
  PlaySquare, 
  Cpu, 
  Heart, 
  Globe,
  Award,
  Bot,
  Briefcase,
  Trophy,
  Menu,
  X
} from 'lucide-react';

const SECTIONS = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'tech-stack', icon: Cpu, label: 'Tech Stack' },
  { id: 'works', icon: Layers, label: 'Featured Work' },
  { id: 'ai-projects', icon: Bot, label: 'AI Projects' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'hackathons', icon: Trophy, label: 'Hackathons' },
  { id: 'certifications', icon: Award, label: 'Certifications' },
  { id: 'open-source', icon: GitPullRequest, label: 'Open Source' },
  { id: 'github', icon: GitBranch, label: 'GitHub' },
  { id: 'leetcode', icon: Code, label: 'LeetCode' },
  { id: 'youtube', icon: PlaySquare, label: 'YouTube' },
  { id: 'coding-profiles', icon: Terminal, label: 'Coding Profiles' },
  { id: 'contact', icon: Globe, label: 'Contact' },
  { id: 'support', icon: Heart, label: 'Support' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;
      
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      
      let currentSection = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop - 100; 
          if (scrollPosition >= top) {
            currentSection = section.id;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const timeoutId = setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  const scrollTo = (id: string) => {
    isScrolling.current = true;
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  return (
    <>
      {/* SVG Filters required for the liquid glass effect on Desktop */}
      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="btn-glass" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="btn-glass" />
            <feComposite in="SourceGraphic" in2="btn-glass" operator="atop"/>
          </filter>
          <filter id="container-glass" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="container-glass" />
            <feComposite in="SourceGraphic" in2="container-glass" operator="atop"/>
          </filter>
        </defs>
      </svg>

      {/* Top Page Liquid Glass Mask (Blurs content as you scroll up) */}
      <div className="hidden md:block fixed top-0 left-0 right-0 h-24 md:h-32 z-[90] pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(244,244,242,0.8) 0%, rgba(244,244,242,0) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
      }}></div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden fixed top-4 right-4 z-[110]">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white/80 backdrop-blur-xl border border-white p-3.5 rounded-[1.25rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-black"
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[100] bg-[#f4f4f2]/80 backdrop-blur-3xl flex flex-col pt-24 px-4 pb-8 overflow-y-auto"
          >
            <div className="flex flex-col gap-3 max-w-sm mx-auto w-full">
              <p className="text-xs font-black uppercase tracking-widest text-[#888] mb-2 px-2">Navigation</p>
              {SECTIONS.map((section, idx) => {
                const isActive = activeSection === section.id;
                return (
                  <motion.button 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03, type: "spring", bounce: 0.5 }}
                    onClick={() => {
                      scrollTo(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-[1.5rem] transition-all ${isActive ? 'bg-black text-white shadow-2xl scale-[1.02] z-10' : 'bg-white/60 text-[#111] hover:bg-white shadow-sm border border-white/50'}`}
                  >
                    <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center shrink-0 ${isActive ? 'bg-white/20' : 'bg-black/5'}`}>
                      <section.icon size={22} className={isActive ? 'text-white' : 'text-[#111]'} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span className={`text-lg ${isActive ? 'font-black' : 'font-bold'}`}>{section.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Liquid Glass Container Wrapper */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[calc(100vw-16px)] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-center py-4 px-4 my-[-1rem] mx-[-1rem]">
        <div className="glassContainer">
          {SECTIONS.map((section, idx) => {
            const isActive = activeSection === section.id;
            
            return (
              <button 
                key={idx} 
                className="glassBtn group relative"
                onClick={() => scrollTo(section.id)}
                title={section.label}
              >
                {/* Active Liquid Indicator Pill */}
                {isActive && (
                  <motion.div
                    layoutId="liquidIndicator"
                    className="absolute inset-0 z-[-1] rounded-full bg-white/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_0_0_10px_rgba(255,255,255,0.5)] border border-white"
                    transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
                  />
                )}
                
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none mt-0.5">
                  <section.icon 
                    className={`w-5 h-5 drop-shadow-md group-hover:scale-110 transition-all ${isActive ? 'text-black drop-shadow-lg scale-110' : 'text-[#333]'}`} 
                  />
                  {/* Subtle bar underneath the icon to match "bar indicator" */}
                  <div className={`w-3 h-0.5 rounded-full mt-1 transition-all duration-300 ${isActive ? 'bg-black opacity-100' : 'bg-transparent opacity-0'}`} />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </>
  );
}
