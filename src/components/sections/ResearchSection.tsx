import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, ArrowUpRight, Sparkles, Database, FileText, Quote, List, Globe, Shield, Code, GitBranch } from 'lucide-react';

const publications = [
  {
    id: 1,
    title: 'Designing for Hesitation: A Trust-First UX Framework for Healthcare Technology in Low-Trust Populations',
    publisher: 'Zenodo',
    date: 'June 24, 2026',
    doi: '10.5281/ZENODO.20817479',
    description: 'Despite rapid advancements in digital health technologies, user adoption in developing nations remains heavily constrained not by technological access, but by profound psychological hesitation. Traditional health-tech User Interfaces (UIs)—characterized by sterile visual design, mandatory data extraction (sign-ups), and clinical jargon—often exacerbate user anxiety rather than alleviate it.\n\nThis paper introduces the concept of "Healthcare Hesitation" and presents the "Trust-First UX Framework," a behavioral design methodology engineered explicitly for low-trust populations. By prioritizing zero-friction anonymity, empathetic conversational architecture, cognitive decoupling, and binary action-oriented triaging, this framework transforms health-seeking from an intimidating chore into a psychologically safe interaction.\n\nWe validate this framework through a comprehensive case study of a custom-built, multilingual web-based AI companion deployed in India. Our findings demonstrate that replacing traditional GUI elements with Trust-First conversational design significantly reduces time-to-disclosure for sensitive symptoms and dramatically increases triage completion rates, offering a new paradigm for public health technology design.',
    tags: ['Healthcare Hesitation', 'Trust-First UX', 'Conversational AI', 'Hinglish NLP', 'Low-Resource Languages', 'XLM-RoBERTa', 'Digital Health'],
    url: 'https://zenodo.org/records/20817479',
    details: {
      resourceType: 'Preprint',
      languages: 'English, Hindi',
      license: 'Creative Commons Attribution 4.0 International',
      copyright: 'Copyright (C) 2026 Arsh Verma'
    },
    citation: 'Verma, A. (2026). Designing for Hesitation: A Trust-First UX Framework for Healthcare Technology in Low-Trust Populations. Zenodo. https://doi.org/10.5281/zenodo.20817479',
    software: {
      repoUrl: 'https://github.com/ArshVermaGit/mannsaathi',
      languages: 'TypeScript, Python',
      status: 'Active'
    },
    references: [
      'Mayer, R. C., Davis, J. H., & Schoorman, F. D. (1995). An integrative model of organizational trust. Academy of Management Review, 20(3), 709-734.',
      'Dinev, T., & Hart, P. (2006). An extended privacy calculus model for e-commerce transactions. Information Systems Research, 17(1), 61-80.',
      'Lupton, D. (2014). The commodification of patient data in the digital health age. Critical Public Health, 24(4), 540-557.',
      'Fogg, B. J. (2003). Persuasive Technology: Using Computers to Change What We Think and Do. Morgan Kaufmann.',
      'Bickmore, T. W., & Picard, R. W. (2005). Establishing and maintaining long-term human-computer relationships. ACM Transactions on Computer-Human Interaction (TOCHI), 12(2), 293-327.',
      'Patel, R., & Sharma, A. (2021). The digital divide and health literacy in rural India: A qualitative study. Journal of Global Health Informatics, 13(2), 112-125.',
      'Norman, D. A. (2004). Emotional Design: Why We Love (or Hate) Everyday Things. Basic Books.',
      'Weizenbaum, J. (1966). ELIZA—a computer program for the study of natural language communication between man and machine. Communications of the ACM, 9(1), 36-45.'
    ]
  }
];

function ResearchModal({ pub, onClose }: { pub: any, onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    if ((window as any).lenis) (window as any).lenis.stop();
    return () => {
      document.body.style.overflow = 'auto'; 
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-xl p-0 sm:p-4 md:p-10 overscroll-none"
    >
      <motion.div
        key={pub.id}
        initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }} transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl h-[100dvh] max-h-[100dvh] md:h-full md:max-h-[95vh] bg-[#fdfdfd] rounded-none sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative"
      >
        <button onClick={onClose} className="absolute top-6 right-4 md:top-6 md:right-6 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-black/20 hover:bg-black/40 backdrop-blur-xl text-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl border border-white/20">
          <X size={22} strokeWidth={2.5} />
        </button>

        <div data-lenis-prevent="true" className="flex flex-col h-full overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ccc] [&::-webkit-scrollbar-thumb]:rounded-full">
          
          {/* Stunning Deep Blue Header */}
          <div className="w-full relative min-h-[320px] md:min-h-[450px] shrink-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563eb] flex items-center justify-center overflow-hidden pt-8 pb-16 md:py-16">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            
            {/* Glowing Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-30 mix-blend-screen pointer-events-none" />
            
            <motion.div 
              initial={{ y: 40, rotate: -4 }}
              animate={{ y: 0, rotate: -4 }}
              className="w-[180px] md:w-[280px] aspect-[1/1.4] bg-white rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 relative z-10 overflow-hidden group hover:rotate-0 hover:scale-105 transition-all duration-700 ease-out cursor-pointer"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden bg-white">
                <img src="/research_1.png" alt="Research Paper Preview" className="w-full h-full object-cover object-top opacity-95 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent z-10 pointer-events-none" />
              </div>
            </motion.div>
          </div>

          <div className="px-4 md:px-12 -mt-16 md:-mt-20 relative z-20 flex-shrink-0">
             <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-[#eaeaea] flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center justify-between backdrop-blur-xl">
               <div className="flex-1">
                 <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-black tracking-tight text-[#111] mb-5 leading-[1.15]">{pub.title}</h2>
                 
                 <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#f8f9fa] rounded-xl border border-[#eee]">
                       <Database className="w-[14px] h-[14px] md:w-4 md:h-4 text-[#8b5cf6]" />
                       <span className="font-bold text-[#333] text-sm md:text-base">{pub.publisher}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                       <span className="font-bold text-[#2563eb] text-sm md:text-base">DOI: {pub.doi}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#f8f9fa] rounded-xl border border-[#eee]">
                       <span className="font-bold text-[#555] text-sm md:text-base">{pub.date}</span>
                    </div>
                 </div>
               </div>

               <div className="w-full md:w-auto shrink-0 mt-2 md:mt-0">
                 <a 
                   href={pub.url} 
                   target="_blank" 
                   rel="noreferrer"
                   className="w-full md:w-auto px-8 py-4 bg-[#111] hover:bg-[#2563eb] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg shadow-md"
                 >
                   <FileText size={20} /> Read Full Paper
                 </a>
               </div>
             </div>
          </div>

          <div className="px-4 md:px-12 py-8 md:py-12 flex-1 bg-[#fdfdfd]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              
              {/* Main Left Column */}
              <div className="lg:col-span-8 flex flex-col gap-8 md:gap-10">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black text-[#111] mb-6 flex items-center gap-3">
                    <Sparkles className="text-[#2563eb]" /> Abstract
                  </h3>
                  <div className="space-y-5">
                    {pub.description.split('\n\n').map((paragraph: string, i: number) => (
                      <p key={i} className="text-[17px] text-[#444] font-medium leading-[1.8]">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                <hr className="border-[#eee]" />

                <div className="flex flex-col">
                  <h3 className="text-2xl font-black text-[#111] mb-6 flex items-center gap-3">
                    <Quote className="text-[#8b5cf6]" /> Citation (APA)
                  </h3>
                  <div className="bg-[#f9f9f9] p-6 md:p-8 rounded-[1.5rem] border border-[#eaeaea] text-[#333] font-serif leading-[1.8] text-base md:text-lg shadow-inner">
                    {pub.citation}
                  </div>
                </div>

                <hr className="border-[#eee]" />

                <div className="flex flex-col">
                  <h3 className="text-2xl font-black text-[#111] mb-6 flex items-center gap-3">
                    <List className="text-[#10b981]" /> References
                  </h3>
                  <ul className="space-y-5">
                    {pub.references.map((ref: string, i: number) => (
                      <li key={i} className="text-[#555] text-sm md:text-[15px] leading-[1.7] pl-5 relative before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#cbd5e1] before:rounded-full">
                        {ref}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                
                {/* Keywords */}
                <div className="bg-[#f9f9f9] p-6 md:p-8 rounded-[2rem] border border-[#eaeaea] flex flex-col">
                  <h3 className="text-lg font-black text-[#111] mb-5">Keywords & Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-3.5 py-1.5 bg-white border border-[#ddd] rounded-lg text-[13px] font-bold text-[#444] shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="bg-[#f9f9f9] p-6 md:p-8 rounded-[2rem] border border-[#eaeaea] flex flex-col">
                  <h3 className="text-lg font-black text-[#111] mb-6">Details</h3>
                  <div className="flex flex-col gap-5">
                     <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#888] block mb-1">Resource Type</span>
                       <span className="font-bold text-[#222] text-[15px]">{pub.details.resourceType}</span>
                     </div>
                     <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#888] block mb-1">Languages</span>
                       <div className="flex items-center gap-2 font-bold text-[#222] text-[15px]">
                         <Globe size={16} className="text-[#555]" /> {pub.details.languages}
                       </div>
                     </div>
                     <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#888] block mb-1">License</span>
                       <div className="flex items-center gap-2 font-bold text-[#222] leading-tight mt-1 text-[15px]">
                         <Shield size={16} className="text-[#555] shrink-0" /> {pub.details.license}
                       </div>
                     </div>
                     <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#888] block mb-1">Copyright</span>
                       <span className="font-medium text-[#444] text-sm">{pub.details.copyright}</span>
                     </div>
                  </div>
                </div>

                {/* Software */}
                <div className="bg-[#f9f9f9] p-6 md:p-8 rounded-[2rem] border border-[#eaeaea] flex flex-col">
                  <h3 className="text-lg font-black text-[#111] mb-6 flex items-center gap-2">
                    <Code size={18} className="text-[#2563eb]" /> Software
                  </h3>
                  <div className="flex flex-col gap-5">
                     <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#888] block mb-2">Repository</span>
                       <a href={pub.software.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 bg-white border border-[#ddd] shadow-sm rounded-xl font-bold text-[#333] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors text-sm break-all">
                         <GitBranch size={16} className="shrink-0" /> mannsaathi
                       </a>
                     </div>
                     <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#888] block mb-1">Programming Language</span>
                       <span className="font-bold text-[#222] text-[15px]">{pub.software.languages}</span>
                     </div>
                     <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#888] block mb-1">Development Status</span>
                       <span className="inline-flex px-3 py-1 bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black tracking-widest uppercase rounded-md mt-1">
                         {pub.software.status}
                       </span>
                     </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function ResearchListItem({ pub, onClick, idx }: { pub: any, onClick: () => void, idx: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-6 rounded-[2rem] bg-white border border-[#f0f0f0] hover:border-blue-200 shadow-sm hover:shadow-[0_10px_40px_rgb(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500 cursor-pointer w-full relative overflow-hidden"
      onClick={onClick}
    >

       <div className="relative w-full md:w-[200px] xl:w-[250px] shrink-0 aspect-[4/3] sm:aspect-[3/4.2] rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#e2e8f0] flex flex-col items-center justify-end shadow-inner border border-[#e2e8f0]">
         
         <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none mix-blend-overlay"></div>
         
         {/* Live Badge */}
         <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white shadow-sm rounded-xl border border-[#e2e8f0] z-20 group-hover:border-[#2563eb]/30 transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse shadow-[0_0_8px_#2563eb]"></span>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#1e293b]">Published</span>
         </div>

         {/* PDF Paper Preview Wrapper */}
         <div className="w-[86%] h-[82%] bg-white rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.12)] overflow-hidden relative group-hover:h-[96%] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] border border-[#e2e8f0] border-b-0 z-10">
           <img src="/research_1.png" alt="Research Paper Preview" className="w-full h-full object-cover object-top pointer-events-none" />
           <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)] pointer-events-none" />
         </div>
         
       </div>

       <div className="flex-1 flex flex-col w-full h-full py-2 z-10">
         <h4 className="text-xl md:text-2xl lg:text-[1.7rem] font-black text-[#111] leading-tight mb-3 group-hover:text-[#2563eb] transition-colors duration-300">
            {pub.title}
         </h4>
         <p className="text-[15px] md:text-base text-[#666] font-medium line-clamp-3 mb-6 leading-relaxed">
           {pub.description}
         </p>
         
         <div className="mt-auto flex items-center justify-between">
           <div className="flex flex-wrap items-center gap-2">
             <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-50 border border-blue-100 text-[#2563eb] rounded-xl text-[10px] md:text-[11px] font-bold tracking-widest uppercase shadow-sm flex items-center gap-1.5">
                <Database size={14} /> {pub.publisher}
             </span>
             <span className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-50 border border-gray-200 text-[#555] rounded-xl text-[10px] md:text-[11px] font-bold tracking-widest uppercase shadow-sm flex items-center gap-1.5">
                <Globe size={14} /> {pub.date}
             </span>
           </div>

           <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f9f9f9] text-[#111] border border-[#eee] flex items-center justify-center group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb] group-hover:scale-110 transition-all duration-300 shadow-sm shrink-0">
             <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
           </div>
         </div>
       </div>
    </motion.div>
  );
}

export default function ResearchSection() {
  const [selectedPubIndex, setSelectedPubIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedPubIndex !== null) {
      document.body.style.overflow = 'hidden'; 
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = 'unset'; 
      if ((window as any).lenis) (window as any).lenis.start();
    }
    return () => {
      document.body.style.overflow = 'unset'; 
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [selectedPubIndex]);

  return (
    <section id="research" className="py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden isolate">
      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#2563eb] to-[#3b82f6] rounded-2xl md:rounded-3xl shadow-md transform -rotate-3">
              <BookOpen className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Research
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Academic papers and publications.</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* LEFT: Author Profile Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col glassCard rounded-[2.5rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 border border-white/60 p-6 md:p-10 order-2 lg:order-1"
            whileHover={{ y: -5, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-[6px] border-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] mb-6 flex items-center justify-center relative bg-gradient-to-tr from-gray-50 to-[#fdfdfd]">
                <img src="https://github.com/ArshVermaGit.png" alt="Arsh Verma" className="w-full h-full object-cover" />
              </div>
              
              <h3 className="text-3xl md:text-[2rem] font-black text-[#111] leading-tight mb-2">
                Arsh Verma
              </h3>
              <p className="text-xs text-[#888] font-black uppercase tracking-[0.2em] mb-10">Author & Researcher</p>

              {/* Exact ORCID Widget Match - Highly Polished */}
              <div className="w-full relative mt-2 pt-10 pb-8 px-4 bg-white border-[2px] border-[#2563eb] rounded-2xl flex flex-col items-center justify-center shadow-sm">
                
                {/* Overlapping ORCID Logo */}
                <div className="absolute -top-[1.65rem] left-1/2 -translate-x-1/2 bg-white px-3">
                  <svg viewBox="0 0 256 256" className="w-[3.25rem] h-[3.25rem] fill-[#2563eb]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M128,0C57.3,0,0,57.3,0,128c0,70.7,57.3,128,128,128c70.7,0,128-57.3,128-128C256,57.3,198.7,0,128,0z M90.4,195.5H62.9V91.2h27.5V195.5z M76.6,76.9c-8.8,0-15.9-7.1-15.9-15.9c0-8.8,7.1-15.9,15.9-15.9s15.9,7.1,15.9,15.9C92.5,69.8,85.4,76.9,76.6,76.9z M197.8,143.4c0,35.4-23.7,52.1-57.1,52.1h-39.7V91.2h39.7c33.4,0,57.1,16.8,57.1,52.1V143.4z M170.3,143.4c0-20.9-10.7-30.8-31.5-30.8h-10.2v61.7h10.2C159.5,174.3,170.3,164.4,170.3,143.4z"/>
                  </svg>
                </div>
                
                <div className="flex flex-col items-center text-center w-full">
                  <span className="text-[#333] font-semibold text-[17px] md:text-[18px] leading-none mb-1.5">https://orcid.org/</span>
                  <span className="text-[#111] font-black text-[22px] md:text-[24px] tracking-tight mb-6 whitespace-nowrap">
                    0009-0005-0171-857X
                  </span>
                </div>
                
                <a 
                  href="https://orcid.org/my-orcid?orcid=0009-0005-0171-857X"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0077b5] font-bold text-[16px] hover:text-[#005582] hover:underline underline-offset-4 decoration-[#0077b5] transition-colors"
                >
                  Preview public record
                </a>
              </div>

            </div>
          </motion.div>

          <div className="lg:col-span-8 flex flex-col h-full order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="glassCard rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 flex flex-col flex-1 border border-[#eaeaea]"
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <BookOpen size={20} className="text-[#2563eb]" /> Recent Publications
                </h3>
                <span className="text-[9px] font-black text-[#888] uppercase tracking-widest">{publications.length} Papers</span>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                {publications.map((pub, idx) => (
                  <ResearchListItem 
                    key={pub.id} 
                    pub={pub} 
                    idx={idx} 
                    onClick={() => setSelectedPubIndex(idx)} 
                  />
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedPubIndex !== null && (
          <ResearchModal 
            pub={publications[selectedPubIndex]} 
            onClose={() => setSelectedPubIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
