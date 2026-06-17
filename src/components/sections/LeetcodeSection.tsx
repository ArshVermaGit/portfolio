import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Trophy, Flame, Code2, CalendarIcon, Shield, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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

export default function LeetcodeSection() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="LeetCode" className="w-12 h-12 md:w-20 md:h-20 drop-shadow-sm" />
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
              <div className="bg-white/80 rounded-2xl p-4 flex flex-col items-center justify-center border border-[#eee] shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888] flex items-center gap-1.5 mb-1.5"><Trophy size={12} className="text-[#FFA116]" /> Global Rank</span>
                <span className="text-xl font-black text-[#111]">{matchedUser.profile.ranking.toLocaleString()}</span>
              </div>
              <div className="bg-white/80 rounded-2xl p-4 flex flex-col items-center justify-center border border-[#eee] shadow-sm">
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
              <div className="bg-[#FFA116] text-white py-12 md:p-8 rounded-[1.5rem] flex flex-col items-center justify-center shrink-0 w-full md:w-56 shadow-lg shadow-[#FFA116]/20 relative overflow-hidden md:h-full">
                <Flame size={120} className="absolute -right-4 -bottom-4 text-white opacity-10 rotate-12" />
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
            className="lg:col-span-4 glassCard rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#111] tracking-tight">Contests</h3>
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

          {/* 4. LANGUAGES USED */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            className="lg:col-span-4 glassCard rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#111] tracking-tight">Languages</h3>
            </div>

            <div className="flex-1 flex flex-col gap-3 justify-center">
               {[
                 { languageName: 'C++', problemsSolved: 226 },
                 { languageName: 'JavaScript', problemsSolved: 30 },
                 { languageName: 'TypeScript', problemsSolved: 22 },
                 { languageName: 'Python3', problemsSolved: 4 },
                 { languageName: 'Python', problemsSolved: 3 },
                 { languageName: 'MySQL', problemsSolved: 2 }
               ].slice(0, 5).map((lang, idx) => (
                 <div key={idx} className="flex justify-between items-center">
                   <span className="text-[11px] font-bold text-[#555] bg-[#f5f5f5] border border-[#eee] px-2.5 py-1 rounded-lg tracking-wide">{lang.languageName}</span>
                   <span className="text-sm font-black text-[#111]">{lang.problemsSolved} <span className="text-[10px] text-[#888] font-bold ml-0.5">solved</span></span>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* 5. ACHIEVEMENTS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="lg:col-span-4 glassCard rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#111] tracking-tight">Achievements</h3>
              <button onClick={() => setIsModalOpen(true)} className="text-[11px] font-bold text-[#888] uppercase tracking-widest hover:text-[#FFA116] transition-colors flex items-center gap-1">
                View All <ExternalLink size={12} />
              </button>
            </div>

            <div className="flex-1 flex justify-between items-center w-full">
               {['dcc-2026-3.png', 'dcc-2026-4.png', '50_1080_1080.png', '100_1080_1080.png'].map((badge, idx) => (
                  <div key={idx} className="w-[22%] aspect-square max-w-[100px] rounded-[1.5rem] bg-white border border-[#eee] shadow-sm flex items-center justify-center overflow-hidden hover:scale-110 hover:shadow-md transition-all cursor-pointer group" onClick={() => setIsModalOpen(true)}>
                    <img src={`/Leetcode/${badge}`} alt="Badge" className="w-[80%] h-[80%] object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
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
                <h3 className="text-xl font-bold text-[#111] tracking-tight">Activity Heatmap</h3>
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

            <div className="flex-1 w-full overflow-x-auto flex items-center justify-start xl:justify-center mt-2 pb-6 custom-scrollbar">
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
              <h3 className="text-xl font-bold text-[#111] tracking-tight">Recent Solutions</h3>
              <span className="text-[9px] font-black uppercase tracking-widest bg-[#FFA116]/10 text-[#FFA116] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#FFA116] rounded-full animate-pulse"></div> Live
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-1 justify-center">
              {recentSubmissionList.slice(0, 2).map((sub, idx) => (
                <a 
                  key={`sub-${idx}`} 
                  href={`https://leetcode.com/problems/${sub.titleSlug}/`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex flex-col gap-2 p-4 rounded-2xl bg-white/80 border border-[#eee] hover:border-[#FFA116]/50 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[13px] font-bold text-[#111] leading-snug line-clamp-1 group-hover:text-[#FFA116] transition-colors flex items-center gap-1.5">
                      <Code2 size={14} className="text-[#ccc] group-hover:text-[#FFA116] transition-colors shrink-0" /> {sub.title}
                    </p>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00b8a3] shrink-0 bg-[#00b8a3]/10 px-2 py-0.5 rounded-md">{sub.statusDisplay}</span>
                  </div>
                  <div className="flex items-center justify-between pl-5">
                    <span className="text-[9px] font-bold text-[#888] uppercase tracking-widest">
                      {new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-[9px] font-black text-[#555] bg-gray-100 px-2 py-0.5 rounded-md uppercase tracking-widest">{sub.lang}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Achievements Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#111]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[2rem] p-6 md:p-8 max-w-4xl w-full shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8 border-b border-[#eee] pb-4 shrink-0">
                <h3 className="text-2xl md:text-3xl font-black text-[#111] tracking-tight flex items-center gap-3">
                  <Trophy className="text-[#FFA116]" size={28} /> Badges & Achievements
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#555]">
                  <X size={24} />
                </button>
              </div>
              
              <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {[
                    { img: 'dcc-2026-3.png', name: 'March 2026' },
                    { img: 'dcc-2026-4.png', name: 'April 2026' },
                    { img: '50_1080_1080.png', name: '50 Days Badge' },
                    { img: '100_1080_1080.png', name: '100 Days Badge' },
                  ].map((badge, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3 group">
                      <div className="w-full aspect-square rounded-[1.5rem] bg-[#fafafa] border border-[#eee] flex items-center justify-center p-6 group-hover:shadow-lg group-hover:-translate-y-2 transition-all duration-300">
                        <img src={`/Leetcode/${badge.img}`} alt={badge.name} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <span className="text-sm font-bold text-[#333] text-center">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
