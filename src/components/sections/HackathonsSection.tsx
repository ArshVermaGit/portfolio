import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ExternalLink, X, Calendar, Award, Code } from 'lucide-react';

export default function HackathonsSection() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const hackathons = [
    {
      id: 3,
      title: 'Dev Season of Code (DSOC) 2026',
      date: 'Jan 26 – Mar 18, 2026',
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
    },
    {
      id: 2,
      title: 'Jabali Game Jam',
      date: 'March 7–8, 2026',
      description: 'A creative game development competition that challenges participants to design and build original games within a set timeframe. It celebrates innovation, teamwork, and the passion for creating engaging gaming experiences.',
      link: 'https://www.jabali.ai/announcement/jabali-gdc-gamejam-2026/',
      logo: '/jabali-logo.jpeg',
      certificate: '/jabali.jpeg',
      project: {
        title: "Soul Rail Rivals",
        logo: "/Soul-Rail-Rivals.png",
        about: "Dive into a high-octane world where neon-lit subway lines twist above a pulsating metropolis, each track alive with music and danger. Dash through vibrant cityscapes, dodge obstacles in rhythm-infused districts, and outmaneuver rivals. Customize vehicles and unlock stylish characters in the relentless chase for urban glory.",
        tech: ["game design", "3d graphics", "rhythm", "racing"],
        link: "https://www.jabali.ai/game/91436521-bb5a-4dc4-8c5f-e09dc24132db/3d-racing/soul-rail-rivals"
      }
    }
  ];

  return (
    <section id="hackathons" className="isolate overflow-hidden relative py-32 px-6 lg:px-8 bg-transparent text-[#111111]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
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

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon, idx) => (
            <motion.div 
              key={hackathon.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
              transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
              className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 border border-[#eaeaea] flex flex-col relative overflow-hidden group w-full p-2"
            >
              <div className="flex-1 rounded-[2rem] bg-[#fafafa] border border-[#f0f0f0] p-6 flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6 relative z-10">
                   <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#eee] flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
                      <img src={hackathon.logo} alt={hackathon.title} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <div className="flex items-center gap-2 text-[#8b5cf6] font-bold text-xs tracking-widest uppercase mb-1">
                        <Calendar size={12} /> {hackathon.date}
                      </div>
                      <h3 className="text-xl font-black text-[#111] tracking-tight line-clamp-2 leading-tight">{hackathon.title}</h3>
                   </div>
                </div>

                <p className="text-[#555] text-sm leading-relaxed mb-8 line-clamp-4 relative z-10">
                  {hackathon.description}
                </p>

                <div className="flex flex-col gap-3 mt-auto relative z-10">
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setSelectedCert(hackathon.certificate)}
                        className="flex items-center justify-center gap-2 py-3 bg-white text-[#111] hover:bg-[#f1f5f9] border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-xl font-bold text-[13px] transition-colors shadow-sm"
                    >
                        <Award size={16} className="text-[#8b5cf6]" /> Certificate
                    </button>
                    <button 
                        onClick={() => setSelectedProject(hackathon.project)}
                        className="flex items-center justify-center gap-2 py-3 bg-white text-[#111] hover:bg-[#f1f5f9] border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-xl font-bold text-[13px] transition-colors shadow-sm"
                    >
                        <Code size={16} className="text-[#8b5cf6]" /> Project
                    </button>
                  </div>
                  <a 
                      href={hackathon.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 py-3 bg-[#111] text-white rounded-xl font-bold text-[13px] hover:bg-[#8b5cf6] hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                      <ExternalLink size={16} /> Hackathon Page
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCert && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl max-h-full flex flex-col bg-[#111] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <Trophy size={24} className="text-[#8b5cf6]" />
                    Hackathon Certificate
                  </h3>
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6 md:p-8 overflow-auto flex items-center justify-center bg-black/50">
                   <img src={selectedCert} alt="Certificate" className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-[2.5rem] p-8 md:p-12 flex flex-col overflow-hidden shadow-2xl border border-[#e2e8f0]"
                onClick={(e) => e.stopPropagation()}
              >
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white hover:bg-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#111] transition-colors z-10 shadow-sm border border-[#e2e8f0]"
                  >
                    <X size={20} />
                  </button>

                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#8b5cf6] opacity-[0.04] rounded-full blur-3xl"></div>
                  
                  <div className="flex items-center justify-between mb-8">
                     <div className="text-xs font-black tracking-widest uppercase text-[#64748b] bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#e2e8f0]">Submitted Project</div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
                      <div className="w-24 h-24 bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] flex items-center justify-center shrink-0">
                         <img src={selectedProject.logo} alt={selectedProject.title} className="w-full h-full object-contain" />
                      </div>
                      <h5 className="text-3xl md:text-4xl font-black text-[#0f172a]">{selectedProject.title}</h5>
                  </div>
                  
                  <p className="text-[#475569] text-base md:text-lg leading-relaxed mb-10">
                      {selectedProject.about}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                      {selectedProject.tech.map((t: string) => (
                         <span key={t} className="px-4 py-2 bg-white border border-[#e2e8f0] text-[#475569] rounded-xl text-xs font-bold tracking-widest uppercase shadow-sm">
                            {t}
                         </span>
                      ))}
                  </div>

                  <a 
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-4 bg-[#111] text-white rounded-xl font-bold text-[15px] hover:bg-[#8b5cf6] transition-colors mt-auto shadow-md hover:shadow-xl hover:-translate-y-1"
                  >
                      <ExternalLink size={18} /> View Project
                  </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
