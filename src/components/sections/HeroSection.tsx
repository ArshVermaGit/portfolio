import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ResumeModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    document.documentElement.style.overflow = 'hidden';
    if ((window as any).lenis) (window as any).lenis.stop();
    return () => { 
      document.body.style.overflow = ''; 
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start(); 
    };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111111]/80 backdrop-blur-md p-4 md:p-10 overscroll-none"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative"
      >
        <div className="px-8 py-6 bg-white border-b border-[#eee] flex items-center justify-between shrink-0 gap-4">
          <h3 className="text-2xl font-black text-[#111] tracking-tight">Resume</h3>
          <div className="flex items-center gap-4">
            <a href="/RESUME.pdf" download className="hidden md:flex items-center justify-center gap-2 px-6 py-3 bg-[#111] text-white rounded-full font-bold text-sm hover:bg-black transition-colors shrink-0">
               Download <Download size={16} />
            </a>
            <button onClick={onClose} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md border border-[#eaeaea] shrink-0">
              <X size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="flex-1 w-full bg-[#ebebeb] relative overflow-hidden" data-lenis-prevent="true">
          <iframe 
            src="/RESUME.pdf#view=FitH" 
            className="w-full h-full border-none"
            title="Resume"
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function HeroSection({ imageRef }: { imageRef: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 overflow-hidden bg-transparent">

      {/* Flawless Fade Masked Background Image (Mobile) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none block md:hidden"
        style={{
          backgroundImage: "url('/landing_1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, transparent 100px, black 400px)',
          maskImage: 'linear-gradient(to top, transparent 0%, transparent 100px, black 400px)'
        }}
      >
        {/* Subtle dark overlay so white text remains readable */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Flawless Fade Masked Background Image (Desktop) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage: "url('/landing.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 400px)',
          maskImage: 'linear-gradient(to top, transparent 0%, black 400px)'
        }}
      >
        {/* Subtle dark overlay so white text remains readable */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto text-center flex flex-col items-center -mt-16 md:-mt-24">

        {/* Massive Typography (Invisible to maintain layout spacing) */}
        <h1
          className="text-[14vw] md:text-[11vw] leading-[0.95] tracking-tighter font-bold mx-auto max-w-full break-words opacity-0 pointer-events-none select-none"
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
          }}
        >
          Hey, I'm<br />Arsh Verma
        </h1>

        {/* Profile Picture Placeholder Slot */}
        <div
          ref={imageRef}
          className="mt-8 relative z-20 w-48 h-56 md:w-64 md:h-72 rounded-[2rem] bg-transparent opacity-0"
        />
      </div>

      {/* Footer-like elements of the hero */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-30 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#f4f4f2]/90 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white w-full md:w-auto px-6 py-3 rounded-full transition-all cursor-default flex items-center justify-center"
        >
          <span className="text-xs md:text-sm font-black tracking-widest uppercase text-[#111111]">© 2026</span>
        </motion.div>

        <motion.button onClick={() => setIsModalOpen(true)} whileHover={{ y: -5, scale: 1.05 }} className="bg-[#f4f4f2]/90 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white w-full md:w-auto px-6 py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-widest text-[#111111] transition-all flex items-center justify-center gap-2 group">
          View Resume <Download size={18} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform text-[#111]" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isModalOpen && <ResumeModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>

    </section>
  )
}
