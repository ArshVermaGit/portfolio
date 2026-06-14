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

      <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1 text-blue-50">
          <p className="font-black text-white text-2xl tracking-widest uppercase mb-2 drop-shadow-md">Arsh Verma</p>
          <p className="font-medium text-sm opacity-90">© {new Date().getFullYear()} All rights reserved.</p>
          <p className="font-medium text-sm flex items-center gap-1 opacity-90">Designed with <span className="text-white drop-shadow-md">♥</span> in India</p>
        </div>

        {/* Right: Socials */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="https://github.com/ArshVermaGit" target="_blank" rel="noreferrer" className="px-6 py-3.5 bg-white/50 hover:bg-white/60 border border-white/60 backdrop-blur-md rounded-2xl text-xs md:text-sm font-bold uppercase tracking-widest text-[#111111] transition-all hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 group">
            GitHub <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#111]" />
          </a>
          <a href="https://www.linkedin.com/in/arshvermadev/" target="_blank" rel="noreferrer" className="px-6 py-3.5 bg-white/50 hover:bg-white/60 border border-white/60 backdrop-blur-md rounded-2xl text-xs md:text-sm font-bold uppercase tracking-widest text-[#111111] transition-all hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 group">
            LinkedIn <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#111]" />
          </a>
          <a href="https://x.com/TheArshVerma" target="_blank" rel="noreferrer" className="px-6 py-3.5 bg-white/50 hover:bg-white/60 border border-white/60 backdrop-blur-md rounded-2xl text-xs md:text-sm font-bold uppercase tracking-widest text-[#111111] transition-all hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 group">
            Twitter <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#111]" />
          </a>
          <a href="https://www.youtube.com/@ArshCreates" target="_blank" rel="noreferrer" className="px-6 py-3.5 bg-white/50 hover:bg-white/60 border border-white/60 backdrop-blur-md rounded-2xl text-xs md:text-sm font-bold uppercase tracking-widest text-[#111111] transition-all hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 group">
            YouTube <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#111]" />
          </a>
        </div>

      </div>
    </footer>
  )
}
