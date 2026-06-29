import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, X, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      role: 'Core Member (Tech Team)',
      organisation: 'UX Club VIT Bhopal University',
      location: 'On Site',
      shortDescription: 'Collaborating on UX projects, design events, and user-centered initiatives.',
      description: 'Core Member, UX Design Club | Collaborating on UX projects, design events, and initiatives that foster user-centered thinking and creativity across campus.',
      skills: ['UI/UX', 'JavaScript', 'TypeScript', 'React.js', 'Project Management', 'Teamwork'],
      logo: '/UX.jpeg',
      instagram: 'https://www.instagram.com/uxclub.vitb/',
      certificates: [
        {
          src: "/UX_certificate.jpg",
          alt: "UX Certificate",
          title: "Certificate of Appreciation",
          description: "Awarded for outstanding contribution to the successful organization of the Design2Code 2.0 Frontend Hackathon."
        }
      ]
    }
  ];

  const [detailsModal, setDetailsModal] = useState<number | null>(null);
  const [certModal, setCertModal] = useState<{ expId: number, index: number } | null>(null);

  useEffect(() => {
    if (certModal !== null || detailsModal !== null) {
      document.body.style.overflow = 'hidden'; if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = 'auto'; if ((window as any).lenis) (window as any).lenis.start();
    }
    return () => { document.body.style.overflow = 'auto'; if ((window as any).lenis) (window as any).lenis.start(); };
  }, [certModal, detailsModal]);

  return (
    <section id="experience" className="isolate overflow-hidden relative py-32 px-6 lg:px-8 bg-transparent text-[#111111]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#14b8a6] to-[#0ea5e9] rounded-2xl md:rounded-3xl shadow-md transform -rotate-3">
              <Briefcase className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Experience
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Professional journey and roles.</span>
        </motion.h2>

        <div className="w-full flex flex-col gap-8">
          {experiences.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                onClick={() => setDetailsModal(exp.id)}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
                transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                className="group glassCard rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative overflow-hidden cursor-pointer"
              >
                <div className="flex items-center gap-6 relative z-10 flex-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-[#eee] shadow-sm group-hover:border-[#14b8a6] group-hover:scale-110 transition-all duration-500 p-2">
                    <img src={exp.logo} alt={exp.organisation} className="w-full h-full object-contain rounded-xl" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-black text-[#111] tracking-tight mb-1 group-hover:text-[#14b8a6] transition-colors">{exp.role}</h3>
                    <p className="text-[11px] md:text-xs font-bold text-[#888] uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] inline-block"></span> 
                      {exp.organisation} • {exp.location}
                    </p>
                    <p className="text-sm md:text-base text-[#555] font-medium leading-relaxed line-clamp-2 max-w-2xl">
                      {exp.shortDescription}
                    </p>
                  </div>
                </div>

                {exp.certificates && exp.certificates.length > 0 && (
                  <div className="flex items-center gap-4 md:gap-8 bg-white/80 px-4 py-3 md:px-5 md:py-4 rounded-[1.5rem] border border-[#eaeaea] group-hover:border-[#14b8a6]/20 transition-colors w-full md:w-auto justify-center relative z-10 shrink-0">
                    <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-4">
                      {exp.certificates.map((cert, certIdx) => (
                        <div 
                          key={certIdx}
                          className="relative group/cert bg-white/50 border border-[#eaeaea] p-2 rounded-xl hover:bg-white hover:border-[#ddd] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col items-center gap-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCertModal({ expId: exp.id, index: certIdx });
                          }}
                        >
                          <img src={cert.src} className="h-12 md:h-16 drop-shadow-sm rounded-lg object-contain group-hover/cert:scale-[1.03] transition-transform duration-300" alt={cert.alt} />
                        </div>
                      ))}
                    </div>
                    <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#ddd] to-transparent"></div>
                    <ShieldCheck className="hidden md:block text-[#ddd] group-hover:text-[#14b8a6] transition-colors duration-500" size={32} strokeWidth={1.5} />
                  </div>
                )}
              </motion.div>
          ))}
        </div>

      </div>

      {/* Details Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {detailsModal !== null && (() => {
            const currentExp = experiences.find(e => e.id === detailsModal);
            if (!currentExp) return null;

            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-12 bg-[#111111]/80 backdrop-blur-md overscroll-none"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 30 }}
                  transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative"
                >
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDetailsModal(null);
                    }}
                    className="absolute top-3 right-3 md:top-6 md:right-6 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border border-[#eaeaea]"
                  >
                    <X size={20} strokeWidth={3} />
                  </button>

                  <div data-lenis-prevent="true" className="flex flex-col h-full overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ddd] [&::-webkit-scrollbar-thumb]:rounded-full text-[#111]">
                    
                    {/* Top Header Section */}
                    <div className="px-6 py-12 md:px-16 md:py-16 flex flex-col items-center justify-center border-b border-[#eee] bg-white text-center">
                      <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-6 md:mb-8 relative rounded-2xl overflow-hidden shadow-sm border border-[#eee] bg-white shrink-0 p-4 md:p-6">
                        <img src={currentExp.logo} alt={currentExp.organisation} className="w-full h-full object-contain" />
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
                        <div className="px-3 py-1 md:px-4 md:py-1.5 bg-[#f0fdfa] text-[#0d9488] rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase border border-[#ccfbf1] flex items-center gap-1.5 md:gap-2 shadow-sm">
                          <Briefcase className="w-3 h-3 md:w-3.5 md:h-3.5" /> {currentExp.location}
                        </div>
                        <div className="px-3 py-1 md:px-4 md:py-1.5 bg-[#f8fafc] text-[#475569] rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase border border-[#e2e8f0] flex items-center gap-1.5 md:gap-2 shadow-sm">
                          {currentExp.organisation}
                        </div>
                      </div>
                      
                      <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-[#111] mb-4 md:mb-6">{currentExp.role}</h2>
                      <p className="text-lg md:text-2xl text-[#666] font-medium leading-relaxed max-w-4xl">{currentExp.description}</p>

                      {currentExp.instagram && (
                        <div className="mt-8 md:mt-10">
                          <a 
                            href={currentExp.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-xl font-bold items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all text-base md:text-lg"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> 
                            View on Instagram
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Bottom Details Section */}
                    <div className="px-6 py-12 md:px-16 md:py-20 bg-[#f9f9f9] flex-1">
                      <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-16">
                        
                        {/* Skills */}
                        <section className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#eee] relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-[#14b8a6] opacity-[0.04] rounded-full blur-3xl"></div>
                          
                          <h3 className="text-2xl md:text-3xl font-black text-[#111] flex items-center gap-3 mb-6 md:mb-8">
                            <ShieldCheck className="text-[#14b8a6] w-6 h-6 md:w-7 md:h-7 shrink-0" /> Skills & Expertise
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-3 md:gap-4 relative z-10">
                            {currentExp.skills.map(skill => (
                              <span key={skill} className="px-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] text-[#475569] rounded-xl text-xs md:text-sm font-bold tracking-widest uppercase shadow-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </section>

                        {/* Certificates */}
                        {currentExp.certificates && currentExp.certificates.length > 0 && (
                          <section>
                            <h3 className="text-2xl md:text-3xl font-black text-[#111] flex items-center gap-3 mb-6 md:mb-8">
                              <ShieldCheck className="text-[#14b8a6] w-6 h-6 md:w-7 md:h-7 shrink-0" /> Official Credentials
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {currentExp.certificates.map((cert, certIdx) => (
                                <div 
                                  key={certIdx}
                                  className="bg-white p-4 md:p-6 border border-[#eee] rounded-[2rem] overflow-hidden group shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#14b8a6]/40 hover:shadow-md transition-all duration-300"
                                  onClick={() => setCertModal({ expId: currentExp.id, index: certIdx })}
                                >
                                  <img src={cert.src} alt={cert.alt} className="w-full h-auto max-h-[300px] object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500 mb-4" />
                                  <h4 className="text-lg font-bold text-[#111] text-center mb-1 group-hover:text-[#14b8a6] transition-colors">{cert.title}</h4>
                                  <p className="text-sm text-[#666] text-center line-clamp-2">{cert.description}</p>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                        
                      </div>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>,
        document.body
      )}

      {/* Image Zoom Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {certModal !== null && (() => {
            const currentExp = experiences.find(e => e.id === certModal.expId);
            const currentCerts = currentExp?.certificates || [];
            const currentCert = currentCerts[certModal.index];
            if (!currentCert) return null;

            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md overscroll-none"
              >
                {/* Left Navigation */}
                {certModal.index > 0 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCertModal(prev => prev ? { ...prev, index: prev.index - 1 } : null);
                    }} 
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg border border-white/10 backdrop-blur-md"
                  >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                )}
    
                {/* Right Navigation */}
                {certModal.index < currentCerts.length - 1 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCertModal(prev => prev ? { ...prev, index: prev.index + 1 } : null);
                    }} 
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg border border-white/10 backdrop-blur-md"
                  >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                )}
    
                <motion.div 
                  key={`${certModal.expId}-${certModal.index}`}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", bounce: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-white rounded-[2.5rem] p-6 md:p-12 max-w-[95vw] md:max-w-5xl w-full max-h-[90vh] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ddd] [&::-webkit-scrollbar-thumb]:rounded-full flex flex-col items-center shadow-2xl"
                >
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCertModal(null);
                    }}
                    className="absolute top-3 right-3 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-[#f4f4f5] hover:bg-[#e4e4e7] text-black rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-[#e4e4e7] z-[10000]"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                  </button>
                  <img 
                    src={currentCert.src} 
                    alt={currentCert.alt} 
                    className="w-full h-[40vh] md:h-[65vh] object-contain mb-6 md:mb-8 drop-shadow-xl" 
                  />
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#111] mb-3 text-center">
                    {currentCert.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#666] text-center leading-relaxed font-medium">
                    {currentCert.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
}
