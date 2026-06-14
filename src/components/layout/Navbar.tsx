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
  Globe
} from 'lucide-react';

const SECTIONS = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'tech-stack', icon: Cpu, label: 'Tech Stack' },
  { id: 'works', icon: Layers, label: 'Featured Work' },
  { id: 'open-source', icon: GitPullRequest, label: 'Open Source' },
  { id: 'github', icon: GitBranch, label: 'GitHub' },
  { id: 'leetcode', icon: Code, label: 'LeetCode' },
  { id: 'youtube', icon: PlaySquare, label: 'YouTube' },
  { id: 'coding-profiles', icon: Terminal, label: 'Coding Profiles' },
  { id: 'contact', icon: Globe, label: 'Contact' },
  { id: 'support', icon: Heart, label: 'Support' }
];

export default function Navbar() {
  const scrollTo = (id: string) => {
    // Scroll to the element by ID
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
          <filter id="btn-glass">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="btn-glass" />
            <feComposite in="SourceGraphic" in2="btn-glass" operator="atop"/>
          </filter>
          <filter id="container-glass">
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

      {/* The Liquid Glass Container */}
      <div className="glassContainer">
        {SECTIONS.map((section, idx) => (
          <button 
            key={idx} 
            className="glassBtn group"
            onClick={() => scrollTo(section.id)}
            title={section.label}
          >
            <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
              <section.icon className="w-5 h-5 text-black drop-shadow-md group-hover:scale-110 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
