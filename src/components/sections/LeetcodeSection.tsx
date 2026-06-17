import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ExternalLink, Trophy, Flame, Code2, CalendarIcon, Shield, X, Medal, Activity, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface AllQuestionsCount {
  difficulty: string;
  count: number;
}

interface AcSubmissionNum {
  difficulty: string;
  count: number;
}

interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

interface LeetCodeData {
  allQuestionsCount: AllQuestionsCount[];
  matchedUser: {
    profile: {
      reputation: number;
      ranking: number;
    };
    submitStats: {
      acSubmissionNum: AcSubmissionNum[];
    };
    submissionCalendar: string;
    languageProblemCount: {
      languageName: string;
      problemsSolved: number;
    }[];
  };
  recentSubmissionList: RecentSubmission[];
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    topPercentage: number;
  };
}

function getHeatmapColor(count: number) {
  if (count === 0) return 'bg-[#ebedf0]'; 
  if (count <= 2) return 'bg-[#ffdfa6]';  
  if (count <= 4) return 'bg-[#ffc361]';  
  if (count <= 7) return 'bg-[#ffa71c]';  
  return 'bg-[#FFA116]';                  
}

function parseLeetCodeCalendar(submissionCalendar: string) {
  const parsed = JSON.parse(submissionCalendar);
  const daysMap = new Map<string, number>();
  
  for (const [timestamp, count] of Object.entries(parsed)) {
    const date = new Date(parseInt(timestamp) * 1000);
    const dateString = date.toISOString().split('T')[0];
    daysMap.set(dateString, count as number);
  }

  // Generate last 39 full weeks + current week aligned to Sunday
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  const today = new Date(`${year}-${month}-${day}T00:00:00Z`);
  const startDate = new Date(today);
  startDate.setUTCDate(today.getUTCDate() - (39 * 7 + today.getUTCDay()));

  const calendar = [];
  let currentWeek = { contributionDays: [] as any[] };

  for (let d = new Date(startDate); d <= today; d.setUTCDate(d.getUTCDate() + 1)) {
    const dateString = d.toISOString().split('T')[0];
    const count = daysMap.get(dateString) || 0;
    
    currentWeek.contributionDays.push({ date: dateString, contributionCount: count });
    
    if (currentWeek.contributionDays.length === 7) {
      calendar.push(currentWeek);
      currentWeek = { contributionDays: [] };
    }
  }

  if (currentWeek.contributionDays.length > 0) {
    calendar.push(currentWeek);
  }

  return calendar;
}

const leetcodeBadges = [
  { img: 'dcc-2026-3.png', name: 'March 2026' },
  { img: 'dcc-2026-4.png', name: 'April 2026' },
  { img: '50_1080_1080.png', name: '50 Days Badge' },
  { img: '100_1080_1080.png', name: '100 Days Badge' },
];

export default function LeetcodeSection() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBadgeIndex, setSelectedBadgeIndex] = useState<number | null>(null);
  const heatmapScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && heatmapScrollRef.current) {
      // Small timeout to let the DOM paint the new heatmap width
      setTimeout(() => {
        if (heatmapScrollRef.current) {
          heatmapScrollRef.current.scrollLeft = heatmapScrollRef.current.scrollWidth;
        }
      }, 100);
    }
  }, [data]);

  useEffect(() => {
    if (selectedBadgeIndex !== null) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = 'auto';
      if ((window as any).lenis) (window as any).lenis.start();
    }
  }, [selectedBadgeIndex]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/leetcode', { cache: 'no-store' });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to fetch data');
        }
        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 relative bg-transparent overflow-hidden min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#FFA116_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"></div>
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FFA116]/20"></div>
          <div className="h-4 w-32 bg-gray-200 rounded-full"></div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return null; 
  }

  const { matchedUser, recentSubmissionList } = data;
  const calendar = parseLeetCodeCalendar(matchedUser.submissionCalendar);
  
  const totalSolved = matchedUser.submitStats.acSubmissionNum.find(x => x.difficulty === 'All')?.count || 0;
  const easySolved = matchedUser.submitStats.acSubmissionNum.find(x => x.difficulty === 'Easy')?.count || 0;
  const mediumSolved = matchedUser.submitStats.acSubmissionNum.find(x => x.difficulty === 'Medium')?.count || 0;
  const hardSolved = matchedUser.submitStats.acSubmissionNum.find(x => x.difficulty === 'Hard')?.count || 0;

  return (
    <section id="competitive" className="py-24 px-6 relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#FFA116_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"></div>
      
      <div className="max-w-[1280px] mx-auto relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="LeetCode" className="w-12 h-12 md:w-20 md:h-20 drop-shadow-sm transform -rotate-3" />
            LeetCode
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">My competitive programming journey.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 1. PROFILE CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-4 glassCard  rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="w-20 h-20 rounded-[1rem] border-2 border-white shadow-sm overflow-hidden mb-4">
              <img src="https://github.com/ArshVermaGit.png" alt="Arsh Verma" className="w-full h-full object-cover" />
            </div>
            
            <h3 className="text-2xl font-black text-[#111] tracking-tight mb-0.5">Arsh Verma</h3>
            <a href="https://leetcode.com/u/arsh-leetcode/" target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#888] uppercase tracking-widest hover:text-[#FFA116] transition-colors mb-6 flex items-center justify-center gap-1">
              @arsh-leetcode <ExternalLink size={12} />
            </a>

            <div className="w-full grid grid-cols-2 gap-4">
              <div className="glassCard rounded-3xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888] flex items-center gap-1.5 mb-1.5"><Trophy size={12} className="text-[#FFA116]" /> Global Rank</span>
                <span className="text-xl font-black text-[#111]">{matchedUser.profile.ranking.toLocaleString()}</span>
              </div>
              <div className="glassCard rounded-3xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888] flex items-center gap-1.5 mb-1.5"><Shield size={12} className="text-[#00b8a3]" /> Reputation</span>
                <span className="text-xl font-black text-[#111]">{matchedUser.profile.reputation}</span>
              </div>
            </div>
          </motion.div>

          {/* 2. PROBLEM SOLVING MATRIX */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="lg:col-span-8 glassCard  rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-center h-full"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center h-full">
              
              {/* Total Solved Hero Block */}
              <div className="bg-[#FFA116] text-white py-12 md:p-8 rounded-[2rem] flex flex-col items-center justify-center shrink-0 w-full md:w-56 shadow-lg shadow-[#FFA116]/20 relative overflow-hidden md:h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <Flame size={120} className="absolute -right-4 -bottom-4 text-white opacity-10 rotate-12 group-hover:scale-110 group-hover:opacity-20 transition-all duration-500" />
                <p className="text-[10px] font-black uppercase tracking-widest text-white/90 mb-1 relative z-10">Total Solved</p>
                <p className="text-5xl font-black tracking-tighter relative z-10">{totalSolved}</p>
              </div>

              {/* Progress Bars */}
              <div className="flex-1 w-full flex flex-col justify-center gap-6">
                
                <div className="group">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-sm font-bold text-[#111] flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#00b8a3]"></div> Easy</span>
                    <span className="text-lg font-black text-[#111]">{easySolved} <span className="text-xs font-bold text-[#aaa] ml-1">/ 800+</span></span>
                  </div>
                  <div className="w-full bg-gray-200/50 rounded-full h-2.5 shadow-inner overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.min((easySolved / 800) * 100, 100)}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="bg-[#00b8a3] h-full rounded-full" />
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-sm font-bold text-[#111] flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#ffc01e]"></div> Medium</span>
                    <span className="text-lg font-black text-[#111]">{mediumSolved} <span className="text-xs font-bold text-[#aaa] ml-1">/ 1500+</span></span>
                  </div>
                  <div className="w-full bg-gray-200/50 rounded-full h-2.5 shadow-inner overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.min((mediumSolved / 1500) * 100, 100)}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }} className="bg-[#ffc01e] h-full rounded-full" />
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-sm font-bold text-[#111] flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#ef4743]"></div> Hard</span>
                    <span className="text-lg font-black text-[#111]">{hardSolved} <span className="text-xs font-bold text-[#aaa] ml-1">/ 700+</span></span>
                  </div>
                  <div className="w-full bg-gray-200/50 rounded-full h-2.5 shadow-inner overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.min((hardSolved / 700) * 100, 100)}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="bg-[#ef4743] h-full rounded-full" />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* 3. CONTESTS PARTICIPATED */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="lg:col-span-6 glassCard rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#111] tracking-tight flex items-center gap-2"><Trophy size={20} className="text-[#111]" /> Contests</h3>
              <span className="text-[9px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Trophy size={10} /> 1,325
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-center">
               <div className="flex justify-between items-center border-b border-[#eee] pb-4">
                 <span className="text-sm font-bold text-[#555]">Attended</span>
                 <span className="text-xl font-black text-[#111]">9</span>
               </div>
               <div className="flex justify-between items-center border-b border-[#eee] pb-4">
                 <span className="text-sm font-bold text-[#555]">Global Ranking</span>
                 <span className="text-xl font-black text-[#111]">836,211 <span className="text-[12px] text-[#aaa] font-bold">/874,367</span></span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm font-bold text-[#555]">Top</span>
                 <span className="text-xl font-black text-[#111]">95.7%</span>
               </div>
            </div>
          </motion.div>

          {/* 5. ACHIEVEMENTS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="lg:col-span-6 glassCard rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#111] tracking-tight flex items-center gap-2"><Medal size={20} className="text-[#111]" /> Achievements</h3>
              <button onClick={() => setSelectedBadgeIndex(0)} className="text-[11px] font-bold text-[#888] uppercase tracking-widest hover:text-[#FFA116] transition-colors flex items-center gap-1">
                View All <ExternalLink size={12} />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-4 gap-4 xl:gap-6 w-full items-center place-items-center mt-4">
               {leetcodeBadges.slice(0, 4).map((badge, idx) => (
                  <div key={idx} className="relative group glassCard border border-[#eaeaea] p-4 rounded-[1.5rem] hover:bg-white hover:border-[#ddd] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer aspect-square flex items-center justify-center w-full max-w-[130px]" onClick={() => setSelectedBadgeIndex(idx)}>
                    <img src={`/Leetcode/${badge.img}`} alt={badge.name} className="w-[90%] h-[90%] object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                  </div>
               ))}
            </div>
          </motion.div>

          {/* 6. HEATMAP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="lg:col-span-8 glassCard  rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#111] tracking-tight flex items-center gap-2"><Activity size={20} className="text-[#111]" /> Activity Heatmap</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#888] mt-1.5 flex items-center gap-1"><CalendarIcon size={12} /> Last 9 Months</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#888]">
                <span className="mr-1">Less</span>
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#ebedf0]"></div>
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#ffdfa6]"></div>
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#ffc361]"></div>
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#ffa71c]"></div>
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#FFA116]"></div>
                <span className="ml-1">More</span>
              </div>
            </div>

            <div ref={heatmapScrollRef} className="flex-1 w-full overflow-x-auto flex items-center justify-start xl:justify-center mt-2 pb-6 custom-scrollbar">
              <div className="flex flex-col gap-2 min-w-max">
                
                {/* Month Labels */}
                <div className="flex gap-[3px] md:gap-1 pl-[28px] md:pl-[32px]">
                  {calendar.map((week, weekIdx) => {
                     const d1 = new Date(week.contributionDays[0].date);
                     const d2 = weekIdx > 0 ? new Date(calendar[weekIdx-1].contributionDays[0].date) : null;
                     const isNewMonth = weekIdx === 0 || d1.getMonth() !== d2?.getMonth();
                     return (
                        <div key={`month-${weekIdx}`} className="w-[10px] md:w-3 relative">
                           {isNewMonth && (
                             <span className="absolute bottom-1 left-0 text-[10px] text-[#888] font-bold tracking-wide leading-none whitespace-nowrap">
                               {d1.toLocaleString('default', { month: 'short' })}
                             </span>
                           )}
                        </div>
                     )
                  })}
                </div>

                {/* Grid Area (Days + Heatmap) */}
                <div className="flex gap-2">
                  {/* Day Labels */}
                  <div className="flex flex-col gap-[3px] md:gap-1 mt-0">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
                      <div key={i} className="h-[10px] md:h-3 text-[9px] text-[#aaa] font-bold leading-none flex items-center justify-end w-5 md:w-6">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Heatmap Grid */}
                  <div className="flex gap-[3px] md:gap-1">
                    {calendar.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-[3px] md:gap-1">
                        {week.contributionDays.map((day: any) => (
                          <div
                            key={day.date}
                            title={`${day.contributionCount} submissions on ${day.date}`}
                            className={`w-[10px] h-[10px] md:w-3 md:h-3 rounded-[2px] ${getHeatmapColor(day.contributionCount)} hover:ring-1 ring-[#111] transition-all cursor-pointer`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 7. RECENT SUBMISSIONS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="lg:col-span-4 glassCard  rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#111] tracking-tight flex items-center gap-2"><CheckCircle size={20} className="text-[#111]" /> Recent Solutions</h3>
              <span className="text-[9px] font-black uppercase tracking-widest bg-[#FFA116]/10 text-[#FFA116] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#FFA116] rounded-full animate-pulse"></div> Live
              </span>
            </div>

            <div className="flex flex-col gap-4 flex-1 justify-center">
              {recentSubmissionList.slice(0, 2).map((sub, idx) => (
                <a 
                  key={`sub-${idx}`} 
                  href={`https://leetcode.com/problems/${sub.titleSlug}/`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="glassCard rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col gap-2 flex-1"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-bold text-[#111] leading-snug line-clamp-1 group-hover:text-[#FFA116] transition-colors flex items-center gap-1.5">
                      <Code2 size={16} className="text-[#ccc] group-hover:text-[#FFA116] transition-colors shrink-0" /> {sub.title}
                    </p>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00b8a3] shrink-0 bg-[#00b8a3]/10 px-2 py-0.5 rounded-md">{sub.statusDisplay}</span>
                  </div>
                  <div className="flex items-center justify-between pl-6">
                    <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest">
                      {new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-[10px] font-bold text-[#555] bg-[#f5f5f5] px-2 py-0.5 rounded-md">{sub.lang}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Badge Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedBadgeIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111111]/80 backdrop-blur-md p-4 overscroll-none"
            >
              {selectedBadgeIndex !== null && selectedBadgeIndex > 0 && (
                <div className="absolute inset-y-0 left-2 md:left-6 flex items-center z-[10000] pointer-events-none">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBadgeIndex(prev => prev === null ? null : (prev === 0 ? prev : prev - 1));
                    }}
                    className="pointer-events-auto p-2 md:p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full transition-all hover:scale-110 shadow-lg border border-white/10"
                  >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>
              )}

              {selectedBadgeIndex !== null && selectedBadgeIndex < leetcodeBadges.length - 1 && (
                <div className="absolute inset-y-0 right-2 md:right-6 flex items-center z-[10000] pointer-events-none">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBadgeIndex(prev => prev === null ? null : (prev === leetcodeBadges.length - 1 ? prev : prev + 1));
                    }}
                    className="pointer-events-auto p-2 md:p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full transition-all hover:scale-110 shadow-lg border border-white/10"
                  >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>
              )}

              <motion.div 
                key={selectedBadgeIndex} // Ensure animation triggers on index change
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="relative bg-white rounded-[2rem] p-8 md:p-10 max-w-[90vw] md:max-w-sm w-full max-h-[90vh] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ddd] [&::-webkit-scrollbar-thumb]:rounded-full flex flex-col items-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedBadgeIndex(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-10 md:h-10 bg-[#f4f4f5] hover:bg-[#e4e4e7] text-black rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-[#e4e4e7] z-[10000]"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </button>

                <img 
                  src={`/Leetcode/${leetcodeBadges[selectedBadgeIndex].img}`} 
                  alt={leetcodeBadges[selectedBadgeIndex].name} 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain mb-4 md:mb-6 drop-shadow-xl"
                />
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-[#111] text-center">{leetcodeBadges[selectedBadgeIndex].name}</h3>
                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
