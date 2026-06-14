import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Bot
} from 'lucide-react';

const SECTIONS = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'tech-stack', icon: Cpu, label: 'Tech Stack' },
  { id: 'works', icon: Layers, label: 'Featured Work' },
  { id: 'ai-projects', icon: Bot, label: 'AI Projects' },
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

  useEffect(() => {
    // Add small delay to let DOM paint first
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const intersecting = entries.filter((entry) => entry.isIntersecting);
          if (intersecting.length > 0) {
            intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            setActiveSection(intersecting[0].target.id);
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SVG Filters required for the liquid glass effect */}
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
      <div className="fixed top-0 left-0 right-0 h-32 z-[90] pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(244,244,242,0.6) 0%, rgba(244,244,242,0) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
      }}></div>

      {/* The Liquid Glass Container Wrapper */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[calc(100vw-16px)] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex justify-center py-4 px-4 my-[-1rem] mx-[-1rem]">
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
