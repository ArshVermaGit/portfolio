import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Calendar, Award, Code, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const hackathons = [
  {
    id: 3,
    title: 'Dev Season of Code (DSOC) 2026',
    date: 'Jan 26 – Mar 18, 2026',
    shortDescription: 'A global hackathon encouraging innovation and real-world problem solving through technology.',
    description: 'Dev Season of Code (DSOC) 2026 is a global, professional hackathon designed to encourage innovation, collaboration, and real-world problem solving through technology. The event brings together coders, professionals, and independent developers to build impactful solutions across software engineering, artificial intelligence, data, and emerging technologies.',
    link: 'https://dev-season-of-code.devpost.com/?ref_content=default&ref_feature=challenge&ref_medium=portfolio&_gl=1*c33m6b*_gcl_au*MTI2NDM2ODgyLjE3ODE0Njg4NjQ.*_ga*MTk5NjQxODEwOC4xNzgxNDY4ODY1*_ga_0YHJK3Y10M*czE3ODE0NzM2ODYkbzIkZzEkdDE3ODE0NzM3MDEkajQ1JGwwJGgw',
    logo: '/dev-logo.jpeg',
    certificate: '/dev.png',
    project: {
      title: "SentinelOps",
      logo: "/SentinelOps.png",
      about: "SentinelOps is an autonomous, AI-powered DevOps co-pilot that helps developers understand their delivery pipelines better. It stops the \"fail-react\" loop by predicting risks at the PR gate and explaining CI/CD failures in plain English.",
      tech: ["ai", "devops", "automation", "python"],
      link: "https://github.com/ArshVermaGit/SentinelOps-Autonomous-DevOps-AI"
    }
  },
  {
    id: 1,
    title: 'WiCS Online Hackathon (Winter 2026)',
    date: 'Feb 9 – 16, 2026',
    shortDescription: 'A beginner-friendly, fully online hackathon designed to encourage learning and building without the stress.',
    description: 'The WiCS Online Hackathon is a 1-week, fully online, low-pressure hackathon focused on helping participants start projects they’ve been putting off. This event is beginner-friendly and designed to encourage learning, experimenting, and building without the stress of traditional hackathons.',
    link: 'https://da-wics-hackathon-26.devpost.com/?ref_feature=challenge&ref_medium=discover&_gl=1*1r2dxf8*_gcl_au*MTI2NDM2ODgyLjE3ODE0Njg4NjQ.*_ga*MTk5NjQxODEwOC4xNzgxNDY4ODY1*_ga_0YHJK3Y10M*czE3ODE0Njg4NjQkbzEkZzEkdDE3ODE0NjkxNzMkajU1JGwwJGgw',
    logo: '/WiCS.jpg',
    certificate: '/WiCS-certificate.jpeg',
    project: {
      title: "SimplyPDF",
      logo: "/simplypdf.png",
      about: "The Ultimate, Privacy-Focused PDF Swiss-Army Knife. SimplyPDF provides a seamless and secure environment to manipulate, edit, and organize your PDF files completely locally without sacrificing user experience.",
      tech: ["nextjs", "typescript", "tailwind", "vercel"],
      link: "https://github.com/ArshVermaGit/SimplyPDF"
    }
  }
];

function HackathonModal({ 
  hackathon, 
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}: { 
  hackathon: typeof hackathons[0], 
  onClose: () => void,
  onPrev: () => void,
  onNext: () => void,
  hasPrev: boolean,
  hasNext: boolean
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; if ((window as any).lenis) (window as any).lenis.stop();
    return () => { document.body.style.overflow = 'auto'; if ((window as any).lenis) (window as any).lenis.start(); };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111111]/80 backdrop-blur-md p-4 md:p-10"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative"
      >
        {/* Navigation Buttons (Outside Modal Box) */}
        {hasPrev && (
          <div className="fixed inset-y-0 left-4 md:left-10 flex items-center z-[10000] pointer-events-none">
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="pointer-events-auto p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all hover:scale-110">
              <ChevronLeft size={32} />
            </button>
          </div>
        )}
        {hasNext && (
          <div className="fixed inset-y-0 right-4 md:right-10 flex items-center z-[10000] pointer-events-none">
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="pointer-events-auto p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all hover:scale-110">
              <ChevronRight size={32} />
            </button>
          </div>
        )}

        <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border border-[#eaeaea]">
          <X size={20} strokeWidth={3} />
        </button>

        <div data-lenis-prevent="true" className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ddd] [&::-webkit-scrollbar-thumb]:rounded-full text-[#111]">
          
          <div className="px-6 py-12 md:px-16 md:py-16 flex flex-col items-center justify-center border-b border-[#eee] bg-white text-center">
             <div className="w-48 h-48 md:w-64 md:h-64 mb-8 relative rounded-2xl overflow-hidden shadow-sm border border-[#eee] bg-white">
                <img src={hackathon.logo} alt={hackathon.title} className="w-full h-full object-contain p-4" />
             </div>
             
             <div className="flex items-center gap-3 mb-6">
               <div className="px-4 py-1.5 bg-[#f8fafc] text-[#8b5cf6] rounded-full text-xs font-black tracking-widest uppercase border border-[#e2e8f0] flex items-center gap-2">
                 <Calendar size={14} /> {hackathon.date}
               </div>
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#111] mb-6">{hackathon.title}</h2>
             <p className="text-xl md:text-2xl text-[#666] font-medium leading-relaxed max-w-4xl">{hackathon.description}</p>

             <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
               <a href={hackathon.link} target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#f4f4f5] text-[#111] border border-[#e4e4e7] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#e4e4e7] transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-lg">
                 <Trophy className="text-yellow-500" size={20} /> Devpost / Details
               </a>
               <a href={hackathon.project.link} target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#111] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
                 <ArrowUpRight size={20} /> View Project
               </a>
             </div>
          </div>

          <div className="px-6 py-12 md:px-16 md:py-20 bg-[#f9f9f9] flex-1">
             <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-16">
               
               <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#eee] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#8b5cf6] opacity-[0.04] rounded-full blur-3xl"></div>
                 
                 <h3 className="text-3xl font-black text-[#111] flex items-center gap-3 mb-8"><Code className="text-[#8b5cf6]" size={28} /> Submitted Project</h3>
                 
                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 relative z-10">
                    <div className="w-24 h-24 bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] flex items-center justify-center shrink-0">
                        <img src={hackathon.project.logo} alt={hackathon.project.title} className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-[#111] mb-2">{hackathon.project.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {hackathon.project.tech.map((t: string) => (
                              <span key={t} className="px-3 py-1 bg-[#f8fafc] border border-[#e2e8f0] text-[#475569] rounded-xl text-xs font-bold tracking-widest uppercase shadow-sm">
                                {t}
                              </span>
                          ))}
                        </div>
                    </div>
                 </div>
                 
                 <p className="text-xl text-[#555] font-medium leading-relaxed relative z-10">{hackathon.project.about}</p>
               </section>

               <section>
                 <h3 className="text-3xl font-black text-[#111] flex items-center gap-3 mb-8"><Award className="text-orange-500" size={28} /> Achievement & Certificate</h3>
                 <div className="bg-white p-6 border border-[#eee] rounded-[2rem] overflow-hidden group shadow-sm flex items-center justify-center">
                    <img src={hackathon.certificate} alt="Hackathon Certificate" className="w-full h-auto max-h-[600px] object-contain rounded-xl hover:scale-[1.02] transition-transform duration-500" />
                 </div>
               </section>

             </div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function HackathonsSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section id="hackathons" className="py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden isolate">
      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#8b5cf6] to-[#d946ef] rounded-2xl md:rounded-3xl shadow-md transform rotate-3">
              <Trophy className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Hackathons
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Building, competing, and innovating.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[1000px] mx-auto">
            {hackathons.map((hackathon, idx) => (
              <motion.div 
                key={hackathon.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }} 
                whileInView={{ opacity: 1, scale: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} 
                whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
                transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                className="group glassCard rounded-[3rem] p-2 flex flex-col relative cursor-pointer w-full max-w-[450px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 mx-auto border border-[#eaeaea]"
                onClick={() => setSelectedIdx(idx)}
              >
                <div className="flex-1 rounded-[2.5rem] bg-[#fafafa] border border-[#f0f0f0] flex flex-col relative overflow-hidden">
                   <div className="w-full h-52 bg-white relative overflow-hidden flex items-center justify-center border-b border-[#eaeaea]">
                     <div className="absolute inset-0 opacity-60">
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8b5cf6]/20 via-transparent to-transparent group-hover:scale-110 group-hover:from-[#d946ef]/30 transition-all duration-1000"></div>
                     </div>
                     <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                     
                     <img 
                       src={hackathon.logo} 
                       alt={hackathon.title} 
                       className="w-32 h-32 object-contain rounded-2xl drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-700 relative z-10" 
                     />
                   </div>

                   <div className="flex-1 p-8 md:p-10 flex flex-col relative z-10 bg-white">
                     <div className="flex items-center gap-2 text-[#8b5cf6] font-bold text-xs tracking-widest uppercase mb-4">
                        <Calendar size={12} /> {hackathon.date}
                     </div>
                     <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-3xl font-black text-[#111] tracking-tight group-hover:text-[#8b5cf6] transition-colors line-clamp-2 leading-tight">{hackathon.title}</h3>
                     </div>
                     
                     <p className="text-[#555] text-base md:text-lg leading-relaxed mb-8 line-clamp-2">
                       {hackathon.shortDescription}
                     </p>
                     
                     <div className="mt-auto flex items-center justify-between border-t border-[#f5f5f5] pt-6">
                        <div className="flex items-center gap-2 overflow-hidden flex-wrap">
                           {hackathon.project.tech.slice(0, 3).map((t: string) => (
                              <span key={t} className="px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] text-[#475569] rounded-xl text-[11px] font-bold tracking-widest uppercase shadow-sm group-hover:border-[#cbd5e1] transition-colors">
                                 {t}
                              </span>
                           ))}
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shrink-0 group-hover:bg-[#8b5cf6]">
                          <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                     </div>
                   </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <HackathonModal 
            hackathon={hackathons[selectedIdx]} 
            onClose={() => setSelectedIdx(null)} 
            onPrev={() => setSelectedIdx(prev => prev! > 0 ? prev! - 1 : prev)}
            onNext={() => setSelectedIdx(prev => prev! < hackathons.length - 1 ? prev! + 1 : prev)}
            hasPrev={selectedIdx > 0}
            hasNext={selectedIdx < hackathons.length - 1}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
