import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative text-white py-32 px-6 overflow-hidden mt-20">
      {/* Background Image & Overlay with Flawless Fade Mask */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 400px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 400px)'
        }}
      >
        {/* Subtle dark overlay so white text remains readable */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-12">
        
        {/* Left: Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-white">
          <p className="font-black text-white text-4xl md:text-5xl tracking-tighter mb-2 drop-shadow-xl">Arsh Verma.</p>
          <p className="font-semibold text-sm md:text-base text-white/90 drop-shadow-md">© {new Date().getFullYear()} All rights reserved.</p>
          <p className="font-semibold text-sm md:text-base text-white/90 drop-shadow-md flex items-center gap-1.5">
            Designed with <span className="text-red-500 drop-shadow-md">♥</span> by Arsh
          </p>
        </div>

        {/* Right: Socials */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4">
          <a href="https://github.com/ArshVermaGit" target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-white/10 hover:bg-white border border-white/30 backdrop-blur-md rounded-full text-white hover:text-black text-sm font-bold tracking-wide transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center gap-2 group">
            GitHub <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a href="https://www.linkedin.com/in/arshvermadev/" target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-white/10 hover:bg-white border border-white/30 backdrop-blur-md rounded-full text-white hover:text-black text-sm font-bold tracking-wide transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center gap-2 group">
            LinkedIn <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a href="https://x.com/TheArshVerma" target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-white/10 hover:bg-white border border-white/30 backdrop-blur-md rounded-full text-white hover:text-black text-sm font-bold tracking-wide transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center gap-2 group">
            Twitter <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a href="https://www.youtube.com/@ArshCreates" target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-white/10 hover:bg-white border border-white/30 backdrop-blur-md rounded-full text-white hover:text-black text-sm font-bold tracking-wide transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center gap-2 group">
            YouTube <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </footer>
  )
}
