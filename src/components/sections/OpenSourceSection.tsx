import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitPullRequest, Building2, BookOpen, ShieldCheck, X, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { createPortal } from 'react-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const organizations = [
  { name: 'microsoft', login: 'microsoft' },
  { name: 'vercel', login: 'vercel' },
  { name: 'cloudflare', login: 'cloudflare' },
  { name: 'langchain-ai', login: 'langchain-ai' },
  { name: 'zomato-ecosystem', login: 'zomato-ecosystem' },
  { name: 'kubeflow', login: 'kubeflow' },
  { name: 'Umbrella-io', login: 'Umbrella-io' },
  { name: 'llm-d', login: 'llm-d' },
  { name: 'lingdojo', login: 'lingdojo' },
];

const apertreBadges = [
  { 
    src: "/apertre_ticket.jpeg", 
    alt: "Apertre Ticket", 
    title: "APERTRE 3.0 Ticket", 
    description: "Official ticket for APERTRE 3.0, representing selection as a mentee in this prestigious open-source program."
  },
  { 
    src: "/APERTE.png", 
    alt: "Apertre Certificate", 
    title: "APERTRE Certificate", 
    description: "Official certificate of completion for successfully contributing to open-source projects under the APERTRE 3.0 initiative."
  }
];

const gssocBadges = [
  { 
    src: "/gssoc-badge-gssoc_champion.png", 
    alt: "Champion", 
    title: "GSSoC Champion", 
    description: "Awarded for exceptional performance and high-impact open-source contributions during GirlScript Summer of Code 2026."
  },
  { 
    src: "/gssoc-badge-legend.png", 
    alt: "Legend", 
    title: "GSSoC Legend", 
    description: "Achieved the 'Legend' status by consistently delivering top-tier pull requests and maintaining a strong commit streak."
  },
  { 
    src: "/gssoc-badge-top_10.png", 
    alt: "Top 10", 
    title: "GSSoC Top 10", 
    description: "Ranked among the Top 10 contributors out of thousands of participants worldwide in GSSoC '26."
  }
];

interface ActivityItem {
  title: string;
  url: string;
  createdAt: string;
  state: string;
}

interface GithubData {
  recentPRs: ActivityItem[];
  recentIssues: ActivityItem[];
}

export default function OpenSourceSection() {
  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const [modalState, setModalState] = useState<{ type: 'apertre' | 'gssoc', index: number } | null>(null);

  useEffect(() => {
    if (modalState !== null) {
      document.body.style.overflow = 'hidden'; if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = 'auto'; if ((window as any).lenis) (window as any).lenis.start();
    }
    return () => { document.body.style.overflow = 'auto'; if ((window as any).lenis) (window as any).lenis.start(); };
  }, [modalState]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/github');
        if (response.ok) {
          const result = await response.json();
          setGithubData(result);
        }
      } catch (err) {
        console.error("Failed to fetch github data for open source section", err);
      }
    }
    fetchData();
  }, []);

  return (
    <section id="open-source" className="py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden isolate">

      

      
      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <GitPullRequest className="w-12 h-12 md:w-20 md:h-20 drop-shadow-sm text-[#3DA639]" strokeWidth={2.5} />
            Open Source
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Contributing to the global developer community.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Organizations & Contributed To */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Organizations Grid */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
              className="flex flex-col gap-5"
            >
              <div className="flex justify-between items-center px-1">
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <Building2 size={20} /> Organizations
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#888888]">{organizations.length} Orgs</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {organizations.map((org, idx) => (
                  <motion.a 
                    whileHover={{ y: -4, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
                    key={idx}
                    href={`https://github.com/${org.login}`} 
                    target="_blank"
                    rel="noreferrer"
                    className="glassCard rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-500 group flex items-center gap-3"
                  >
                    <img src={`https://github.com/${org.login}.png`} alt={org.name} className="w-10 h-10 rounded-full border border-[#eaeaea]" />
                    <span className="text-sm font-bold text-[#111] group-hover:text-[#3DA639] transition-colors truncate">@{org.login}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Activity Overview */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
              className="glassCard rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group flex-1 flex flex-col justify-center"
            >
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-[#111]" /> Activity Overview
              </h3>
              <p className="text-lg md:text-xl font-medium text-[#666] leading-relaxed relative z-10">
                Contributed to <a href="https://github.com/ArshVermaGit/ARSHCRM" target="_blank" rel="noreferrer" className="font-bold text-[#111] hover:text-[#3DA639] underline decoration-[#ddd] hover:decoration-[#3DA639] transition-all underline-offset-4">ArshVermaGit/ARSHCRM</a>, <a href="https://github.com/swayam03275/SkillsSphere" target="_blank" rel="noreferrer" className="font-bold text-[#111] hover:text-[#3DA639] underline decoration-[#ddd] hover:decoration-[#3DA639] transition-all underline-offset-4">swayam03275/SkillsSphere</a>, and <span className="font-bold text-[#111]">108 other repositories</span> across the open-source ecosystem.
              </p>
            </motion.div>
          </div>

          {/* MERGED PRs */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants} transition={{ delay: 0.1 }}
            className="lg:col-span-4 flex flex-col gap-5"
          >
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 px-1">
              <GitPullRequest size={20} /> Recent Activity
            </h3>
            
            <div className="flex flex-col gap-5 flex-1">
              {githubData ? (
                githubData.recentPRs.slice(0, 4).map((pr, idx) => (
                  <a 
                    key={idx}
                    href={pr.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="glassCard rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex items-start gap-4 flex-1"
                  >
                    <GitPullRequest size={20} className="text-[#a64aff] shrink-0 mt-1" strokeWidth={2} />
                    <div className="flex flex-col gap-1.5">
                      <p className="text-[15px] font-bold text-[#111] leading-snug group-hover:text-[#a64aff] transition-colors line-clamp-2">
                        {pr.title}
                      </p>
                      <p className="text-[13px] font-bold text-[#888]">
                        Merged PR • {new Date(pr.createdAt).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </a>
                ))
              ) : (
                <div className="animate-pulse flex flex-col gap-5">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="glassCard rounded-3xl h-[104px]"></div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* COMPETITIONS */}
          <div className="lg:col-span-12 flex flex-col gap-5 mt-4">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 px-1">
              <Trophy size={20} /> Competitions
            </h3>

            {/* APERTRE 3.0 - COMPACT COMPETITION BAR */}
            <motion.a 
              href="https://apertre.resourcio.in/profile?role=mentee"
              target="_blank"
              rel="noreferrer"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants} transition={{ delay: 0.2 }}
              className="glassCard rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 group relative overflow-hidden"
            >
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-white rounded-2xl border border-[#eaeaea] shadow-sm flex items-center justify-center p-2 shrink-0 group-hover:scale-110 group-hover:border-[#3DA639]/30 transition-all duration-500">
                <img src="/apertre_logo_mobile.svg" alt="Apertre" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#111] tracking-tight mb-1 group-hover:text-[#3DA639] transition-colors">APERTRE 3.0</h3>
                <p className="text-[11px] md:text-xs font-bold text-[#888] uppercase tracking-widest flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#3DA639] inline-block"></span> Official Mentee • Open Source Contribution</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8 bg-white/80 px-4 py-3 md:px-5 md:py-4 rounded-[1.5rem] border border-[#eaeaea] group-hover:border-[#3DA639]/20 transition-colors relative z-10 w-full md:w-auto justify-center">
              <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-4">
                <div 
                  className="relative group bg-white/50 border border-[#eaeaea] p-2 rounded-xl hover:bg-white hover:border-[#ddd] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalState({ type: 'apertre', index: 0 });
                  }}
                >
                  <img src="/apertre_ticket.jpeg" className="h-12 md:h-16 drop-shadow-sm rounded-lg object-contain group-hover:scale-[1.03] transition-transform duration-300" alt="Apertre Ticket" />
                </div>
                <div 
                  className="relative group bg-white/50 border border-[#eaeaea] p-2 rounded-xl hover:bg-white hover:border-[#ddd] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalState({ type: 'apertre', index: 1 });
                  }}
                >
                  <img src="/APERTE.png" className="h-12 md:h-16 drop-shadow-sm rounded-lg object-contain group-hover:scale-[1.03] transition-transform duration-300" alt="Apertre Certificate" />
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#ddd] to-transparent"></div>
              <ShieldCheck className="hidden md:block text-[#ddd] group-hover:text-[#3DA639] transition-colors duration-500" size={32} strokeWidth={1.5} />
            </div>
          </motion.a>

            {/* GSSoC - COMPACT COMPETITION BAR */}
            <motion.a 
              href="https://gssoc.girlscript.org/profile/a63f72ca-a146-4fca-b91a-6ebae839a029"
              target="_blank"
              rel="noreferrer"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants} transition={{ delay: 0.3 }}
              className="glassCard rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 group relative overflow-hidden"
            >
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl border border-[#eaeaea] shadow-sm flex items-center justify-center p-2 shrink-0 group-hover:scale-110 group-hover:border-[#f97316]/30 transition-all duration-500">
                <img src="https://gssoc.girlscript.org/icon-16.png" alt="GSSoC" className="w-full h-full object-contain" style={{ imageRendering: 'pixelated' }} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#111] tracking-tight mb-1 group-hover:text-[#f97316] transition-colors">GirlScript Summer of Code 2026</h3>
                <p className="text-[11px] md:text-xs font-bold text-[#888] uppercase tracking-widest flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#f97316] inline-block"></span> Currently Working • Official Badges Earned • Open Source Contributor</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8 bg-white/80 px-4 py-3 md:px-5 md:py-4 rounded-[1.5rem] border border-[#eaeaea] group-hover:border-[#f97316]/20 transition-colors relative z-10 w-full md:w-auto justify-center">
              <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-4">
                <div 
                  className="relative group bg-white/50 border border-[#eaeaea] p-2 rounded-xl hover:bg-white hover:border-[#ddd] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalState({ type: 'gssoc', index: 0 });
                  }}
                >
                  <img src="/gssoc-badge-gssoc_champion.png" className="w-12 h-12 md:w-16 md:h-16 drop-shadow-sm group-hover:scale-105 transition-transform duration-300" alt="Champion" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#888] group-hover:text-[#f97316] transition-colors">Champion</span>
                </div>
                <div 
                  className="relative group bg-white/50 border border-[#eaeaea] p-2 rounded-xl hover:bg-white hover:border-[#ddd] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalState({ type: 'gssoc', index: 1 });
                  }}
                >
                  <img src="/gssoc-badge-legend.png" className="w-12 h-12 md:w-16 md:h-16 drop-shadow-sm group-hover:scale-105 transition-transform duration-300" alt="Legend" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#888] group-hover:text-[#f97316] transition-colors">Legend</span>
                </div>
                <div 
                  className="relative group bg-white/50 border border-[#eaeaea] p-2 rounded-xl hover:bg-white hover:border-[#ddd] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalState({ type: 'gssoc', index: 2 });
                  }}
                >
                  <img src="/gssoc-badge-top_10.png" className="w-12 h-12 md:w-16 md:h-16 drop-shadow-sm group-hover:scale-105 transition-transform duration-300" alt="Top 10" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#888] group-hover:text-[#f97316] transition-colors">Top 10</span>
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#ddd] to-transparent"></div>
              <ShieldCheck className="hidden md:block text-[#ddd] group-hover:text-[#f97316] transition-colors duration-500" size={32} strokeWidth={1.5} />
            </div>
          </motion.a>
          </div>

        </div>
      </div>

      {/* Image Zoom Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {modalState !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-md"
            >
              {/* Left Navigation */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setModalState(prev => {
                    if (!prev) return null;
                    const list = prev.type === 'apertre' ? apertreBadges : gssocBadges;
                    return { ...prev, index: prev.index > 0 ? prev.index - 1 : list.length - 1 };
                  });
                }} 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/90 text-[#111] rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-2xl backdrop-blur-md"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
  
              {/* Right Navigation */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setModalState(prev => {
                    if (!prev) return null;
                    const list = prev.type === 'apertre' ? apertreBadges : gssocBadges;
                    return { ...prev, index: prev.index < list.length - 1 ? prev.index + 1 : 0 };
                  });
                }} 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/90 text-[#111] rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-2xl backdrop-blur-md"
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </button>
  
              <motion.div 
                key={`${modalState.type}-${modalState.index}`} // Add key to animate when index changes
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", bounce: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-[2.5rem] p-6 md:p-12 max-w-[95vw] md:max-w-5xl w-full flex flex-col items-center shadow-2xl"
              >
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalState(null);
                  }}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                >
                  <X size={20} className="text-gray-600" />
                </button>
                <img 
                  src={modalState.type === 'apertre' ? apertreBadges[modalState.index].src : gssocBadges[modalState.index].src} 
                  alt={modalState.type === 'apertre' ? apertreBadges[modalState.index].alt : gssocBadges[modalState.index].alt} 
                  className="w-full h-[40vh] md:h-[65vh] object-contain mb-6 md:mb-8 drop-shadow-xl" 
                />
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#111] mb-3 text-center">
                  {modalState.type === 'apertre' ? apertreBadges[modalState.index].title : gssocBadges[modalState.index].title}
                </h3>
                <p className="text-sm md:text-base text-[#666] text-center leading-relaxed font-medium">
                  {modalState.type === 'apertre' ? apertreBadges[modalState.index].description : gssocBadges[modalState.index].description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
}
