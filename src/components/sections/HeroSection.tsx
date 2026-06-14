import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
export default function HeroSection({ imageRef }: { imageRef: any }) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 overflow-hidden bg-transparent">

      {/* Flawless Fade Masked Background Image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
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

        <motion.a whileHover={{ y: -5, scale: 1.05 }} href="/RESUME.pdf" download className="bg-[#f4f4f2]/90 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white w-full md:w-auto px-6 py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-widest text-[#111111] transition-all flex items-center justify-center gap-2 group">
          Download Resume <Download size={18} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform text-[#111]" />
        </motion.a>
      </div>

    </section>
  )
}
