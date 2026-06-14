import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitPullRequest, Building2, BookOpen, ShieldCheck, X } from 'lucide-react';

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
  const [selectedBadge, setSelectedBadge] = useState<{src: string, alt: string} | null>(null);

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
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <GitPullRequest className="w-12 h-12 md:w-20 md:h-20 drop-shadow-sm text-[#3DA639]" strokeWidth={2.5} />
            Open Source
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Contributing to the global developer community.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ORGANIZATIONS & CONTRIBUTED TO */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}
            className="lg:col-span-8 bg-white/70  rounded-[2.5rem] p-8 md:p-10 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 h-full flex flex-col justify-between gap-12 relative overflow-hidden"
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl md:text-3xl font-black text-[#111] tracking-tight flex items-center gap-3">
                  <div className="p-2.5 bg-[#3DA639]/10 rounded-2xl">
                    <Building2 className="text-[#3DA639]" size={28} strokeWidth={2.5} />
                  </div>
                  Organizations
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3DA639] bg-[#3DA639]/10 px-4 py-1.5 rounded-full shadow-sm border border-[#3DA639]/20">{organizations.length} Orgs</span>
              </div>
              
              <div className="flex flex-wrap gap-3 md:gap-4">
                {organizations.map((org, idx) => (
                  <a 
                    key={idx}
                    href={`https://github.com/${org.login}`} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 bg-white border border-[#eaeaea] rounded-2xl hover:border-[#3DA639]/40 hover:shadow-[0_8px_20px_rgba(61,166,57,0.12)] hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#f8f9fa] flex items-center justify-center p-1.5 border border-[#eee] group-hover:border-[#3DA639]/20 group- transition-colors">
                      <img src={`https://github.com/${org.login}.png`} alt={org.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-sm font-bold text-[#444] group-hover:text-[#111] transition-colors pr-1">@{org.login}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative z-10 bg-[#111] text-white rounded-[2rem] p-8 border border-[#222] hover:border-[#333] transition-colors overflow-hidden group shadow-2xl">
              {/* Dynamic subtle glow inside the dark card */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#3DA639]/20 rounded-full blur-[80px] group-hover:bg-[#3DA639]/30 transition-colors duration-700 pointer-events-none"></div>
              
              <p className="text-[11px] text-[#888] font-bold uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                <BookOpen size={16} className="text-[#3DA639]" /> Activity Overview
              </p>
              <p className="text-lg md:text-xl font-medium text-[#bbb] leading-relaxed relative z-10">
                Contributed to <a href="https://github.com/ArshVermaGit/ARSHCRM" target="_blank" rel="noreferrer" className="font-bold text-white hover:text-[#3DA639] underline decoration-[#333] hover:decoration-[#3DA639] transition-all underline-offset-4">ArshVermaGit/ARSHCRM</a>, <a href="https://github.com/swayam03275/SkillsSphere" target="_blank" rel="noreferrer" className="font-bold text-white hover:text-[#3DA639] underline decoration-[#333] hover:decoration-[#3DA639] transition-all underline-offset-4">swayam03275/SkillsSphere</a>, and <span className="font-bold text-white">108 other repositories</span> across the open-source ecosystem.
              </p>
            </div>
          </motion.div>

          {/* MERGED PRs */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} transition={{ delay: 0.1 }}
            className="lg:col-span-4 h-full flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-black text-[#111] tracking-tight">
                Recent Activity
              </h3>
            </div>

            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#eaeaea] overflow-hidden flex flex-col flex-1 relative z-10">
              <div className="px-6 py-5 border-b border-[#eaeaea]">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#888]">Merged PRs & Closed Issues</span>
              </div>

              <div className="flex flex-col flex-1 bg-white">
                {githubData ? (
                  githubData.recentPRs.slice(0, 4).map((pr, idx) => (
                    <a 
                      key={idx}
                      href={pr.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-start gap-4 p-6 border-b border-[#eaeaea] last:border-0 hover:bg-[#fafafa] transition-colors group"
                    >
                      <GitPullRequest size={20} className="text-[#a64aff] shrink-0 mt-1" strokeWidth={2} />
                      <div className="flex flex-col gap-1.5">
                        <p className="text-[15px] font-bold text-[#111] leading-snug group-hover:text-[#a64aff] transition-colors line-clamp-2">
                          {pr.title}
                        </p>
                        <p className="text-[13px] font-bold text-[#888]">
                          Merged • {new Date(pr.createdAt).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="animate-pulse flex flex-col">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-[104px] bg-white border-b border-[#eaeaea] last:border-0"></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* APERTRE 3.0 - COMPACT COMPETITION BAR */}
          <motion.a 
            href="https://apertre.resourcio.in/profile?role=mentee"
            target="_blank"
            rel="noreferrer"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} transition={{ delay: 0.2 }}
            className="lg:col-span-12 bg-white/70  rounded-[2.5rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(61,166,57,0.15)] hover:border-[#3DA639]/30 hover:bg-gradient-to-r hover:from-white/70 hover:to-[#3DA639]/5 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 group relative overflow-hidden"
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

            <div className="flex items-center gap-6 md:gap-10 bg-white/80 px-4 py-3 md:px-6 md:py-4 rounded-[1.5rem] border border-[#eaeaea] group-hover:border-[#3DA639]/20 transition-colors relative z-10">
              <div className="flex items-center gap-4">
                <div 
                  className="flex flex-col items-center gap-1 group/ticket cursor-zoom-in"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedBadge({ src: "/apertre_ticket.jpeg", alt: "Apertre Ticket" });
                  }}
                >
                  <img src="/apertre_ticket.jpeg" className="h-20 md:h-28 drop-shadow-md rounded-xl object-contain group-hover/ticket:scale-[1.03] transition-transform duration-300" alt="Apertre Ticket" />
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
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} transition={{ delay: 0.3 }}
            className="lg:col-span-12 bg-white/70  rounded-[2.5rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] hover:border-[#f97316]/30 hover:bg-gradient-to-r hover:from-white/70 hover:to-[#f97316]/5 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 group relative overflow-hidden"
          >
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl border border-[#eaeaea] shadow-sm flex items-center justify-center p-2 shrink-0 group-hover:scale-110 group-hover:border-[#f97316]/30 transition-all duration-500">
                <img src="https://gssoc.girlscript.org/icon-16.png" alt="GSSoC" className="w-full h-full object-contain" style={{ imageRendering: 'pixelated' }} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#111] tracking-tight mb-1 group-hover:text-[#f97316] transition-colors">GirlScript Summer of Code 2026</h3>
                <p className="text-[11px] md:text-xs font-bold text-[#888] uppercase tracking-widest flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#f97316] inline-block"></span> Official Badges Earned • Open Source Contributor</p>
              </div>
            </div>

            <div className="flex items-center gap-6 md:gap-10 bg-white/80 px-4 md:px-6 py-4 rounded-[1.5rem] border border-[#eaeaea] group-hover:border-[#f97316]/20 transition-colors relative z-10 w-full md:w-auto justify-center">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <div 
                  className="flex flex-col items-center gap-2 group/badge cursor-zoom-in"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedBadge({ src: "/gssoc-badge-gssoc_champion.png", alt: "Champion" });
                  }}
                >
                  <img src="/gssoc-badge-gssoc_champion.png" className="w-14 h-14 md:w-20 md:h-20 drop-shadow-md group-hover/badge:scale-110 group-hover/badge:-translate-y-1 transition-all duration-300" alt="Champion" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#888] group-hover/badge:text-[#f97316] transition-colors">Champion</span>
                </div>
                <div 
                  className="flex flex-col items-center gap-2 group/badge cursor-zoom-in"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedBadge({ src: "/gssoc-badge-legend.png", alt: "Legend" });
                  }}
                >
                  <img src="/gssoc-badge-legend.png" className="w-14 h-14 md:w-20 md:h-20 drop-shadow-md group-hover/badge:scale-110 group-hover/badge:-translate-y-1 transition-all duration-300" alt="Legend" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#888] group-hover/badge:text-[#f97316] transition-colors">Legend</span>
                </div>
                <div 
                  className="flex flex-col items-center gap-2 group/badge cursor-zoom-in"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedBadge({ src: "/gssoc-badge-top_10.png", alt: "Top 10" });
                  }}
                >
                  <img src="/gssoc-badge-top_10.png" className="w-14 h-14 md:w-20 md:h-20 drop-shadow-md group-hover/badge:scale-110 group-hover/badge:-translate-y-1 transition-all duration-300" alt="Top 10" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#888] group-hover/badge:text-[#f97316] transition-colors">Top 10</span>
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#ddd] to-transparent"></div>
              <ShieldCheck className="hidden md:block text-[#ddd] group-hover:text-[#f97316] transition-colors duration-500" size={32} strokeWidth={1.5} />
            </div>
          </motion.a>

        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedBadge(null);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative p-6 md:p-16 bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl flex flex-col items-center"
            >
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedBadge(null);
                }}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xl"
              >
                <X size={24} />
              </button>
              <img src={selectedBadge.src} alt={selectedBadge.alt} className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl rounded-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
