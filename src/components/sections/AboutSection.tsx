import { ArrowUpRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSection({ imageRef }: { imageRef: any }) {
  return (
    <section id="about" className="py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden isolate">
      <div className="max-w-[1280px] mx-auto">

        {/* Standardized Header block matching all other sections */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 30 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
          }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-24 text-[#111111] flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#667eea] to-[#764ba2] rounded-2xl md:rounded-3xl shadow-md transform -rotate-3">
              <User className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            About Me
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-8 text-center">Get to know the developer behind the code.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Left Side: Hey! and short bio */}
          <div className="md:col-span-3 flex flex-col justify-center items-center md:items-start text-center md:text-left h-full gap-4 md:gap-6">
            <div>
              <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#888888] mb-1 block">Hey! I'm</span>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-tight">Arsh Verma</h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl font-medium leading-snug tracking-tight max-w-[280px] md:max-w-[250px] text-[#444]">
              Frontend Developer & Open Source Contributor · Building modern web apps and seamless user experiences.
            </p>
          </div>

          {/* Center: Large Portrait (Global Animated App.tsx image anchors here) */}
          <div className="md:col-span-5 flex justify-center">
            {/* Profile Picture Placeholder Slot */}
            <div
              ref={imageRef}
              className="w-full max-w-[350px] aspect-[4/5] rounded-[2rem] bg-transparent opacity-0"
            />
          </div>

          {/* Right Side: Long Bio and Link */}
          <div className="md:col-span-4 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6 text-[#111111] font-medium tracking-tight mt-4 md:mt-0">
            <p className="text-base md:text-[17px] leading-relaxed text-[#333]">
              I build clean, fast, and functional interfaces that replace clunky workflows with seamless user experiences. Currently studying at VIT Bhopal University, I am actively open to freelance projects and early-stage startup collaborations in frontend and full-stack web development.
            </p>

            <p className="text-base md:text-[17px] leading-relaxed text-[#333]">
              I have a deep appreciation for well-crafted open-source work and modern web standards. Whether I am contributing to open-source projects or building products from scratch, I bring a sharp focus on performance, clean code, and experiences that just work.
            </p>

            <div className="mt-2 md:mt-4">
              <a href="#contact" className="inline-flex items-center gap-2 text-[#111111] font-bold text-lg hover:translate-x-2 transition-transform group">
                Let's collaborate
                <span className="p-1.5 border border-[#111] rounded-lg group-hover:bg-[#111] group-hover:text-white transition-colors">
                  <ArrowUpRight size={16} strokeWidth={3} />
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
