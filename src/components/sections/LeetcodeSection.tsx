import { useEffect, useState } from 'react';
import { Trophy, Shield, Flame, Calendar as CalendarIcon, ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
  };
  recentSubmissionList: RecentSubmission[];
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
  const daysMap = new Map();
  for (const [timestamp, count] of Object.entries(parsed)) {
    const date = new Date(parseInt(timestamp) * 1000);
    const dateString = date.toISOString().split('T')[0];
    daysMap.set(dateString, count as number);
  }

  // Generate last 365 days
  const today = new Date();
  const calendar = [];
  let currentWeek = { contributionDays: [] as any[] };
  
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/leetcode');
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
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
      <section className="py-24 px-6 bg-transparent text-[#111111] min-h-[600px] flex items-center justify-center relative overflow-hidden isolate">

      
        <div className="animate-pulse text-lg font-bold tracking-tight text-[#FFA116]">Loading LeetCode Data...</div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-24 px-6 bg-transparent text-[#111111]">
        <div className="max-w-[1280px] mx-auto text-center border border-red-200 bg-red-50 p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-red-600 mb-2">LeetCode Integration Error</h2>
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  const { matchedUser, recentSubmissionList } = data;
  const calendar = parseLeetCodeCalendar(matchedUser.submissionCalendar);
  
  const acSubmissionMap = new Map(matchedUser.submitStats.acSubmissionNum.map(s => [s.difficulty, s.count]));
  const totalSolved = acSubmissionMap.get('All') || 0;
  const easySolved = acSubmissionMap.get('Easy') || 0;
  const mediumSolved = acSubmissionMap.get('Medium') || 0;
  const hardSolved = acSubmissionMap.get('Hard') || 0;

  return (
    <section id="leetcode" className="isolate py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden">

      
      {/* Background blob removed as requested */}

      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
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
            className="lg:col-span-4 glassCard  rounded-[2rem] p-8   hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
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
            className="lg:col-span-8 glassCard  rounded-[2rem] p-8   hover:shadow-xl transition-all duration-300 flex flex-col justify-center h-full"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center h-full">
              
              {/* Total Solved Hero Block */}
              <div className="bg-[#FFA116] text-white p-8 rounded-[1.5rem] flex flex-col items-center justify-center shrink-0 w-full md:w-56 shadow-lg shadow-[#FFA116]/20 relative overflow-hidden h-full">
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

          {/* 3. HEATMAP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="lg:col-span-8 glassCard  rounded-[2rem] p-8   hover:shadow-xl transition-all duration-300 h-full flex flex-col"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#111] tracking-tight">Activity Heatmap</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#888] mt-1.5 flex items-center gap-1"><CalendarIcon size={12} /> Last 365 Days</p>
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

            <div className="flex-1 w-full overflow-hidden flex items-center justify-center">
              <div className="flex gap-[3px] md:gap-1 w-full justify-between">
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
          </motion.div>

          {/* 4. RECENT SUBMISSIONS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="lg:col-span-4 glassCard  rounded-[2rem] p-8   hover:shadow-xl transition-all duration-300 h-full flex flex-col"
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
    </section>
  );
}
