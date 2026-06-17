import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { GitPullRequest, CircleDot, Star, GitFork, BookOpen, MapPin, Calendar, Users, Trophy, X, ChevronLeft, ChevronRight, Activity, UserCheck, Code, GitCommit, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const badgesList = [
  { name: "Pull Shark", file: "pull-shark-default-498c279a747d.png" },
  { name: "Pair Extraordinaire", file: "pair-extraordinaire-default-579438a20e01.png" },
  { name: "Starstruck", file: "starstruck-default--light-a594e2a027e0.png" },
  { name: "Public Sponsor", file: "public-sponsor-default-9fa68986b057.png" },
  { name: "Galaxy Brain", file: "galaxy-brain-default-847262c21056.png" },
  { name: "YOLO", file: "yolo-default-be0bbff04951.png" },
  { name: "Quickdraw", file: "quickdraw-default--light-8f798b35341a.png" }
];

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface Repo {
  name: string;
  stargazerCount: number;
  forkCount: number;
  description: string;
  url: string;
  primaryLanguage: { name: string; color: string } | null;
}

interface ActivityItem {
  title: string;
  url: string;
  createdAt: string;
  state: string;
}

interface GithubData {
  profile: {
    avatarUrl: string;
    name: string;
    login: string;
    bio: string;
    location: string;
    createdAt: string;
    followers: number;
    following: number;
  };
  stats: {
    totalRepos: number;
    totalContributions: number;
    currentStreak: number;
    maxStreak: number;
    totalStars: number;
    totalForks: number;
  };
  topLanguages: { name: string; color: string; count: number }[];
  calendar: Week[];
  repos: Repo[];
  recentPRs: ActivityItem[];
  recentIssues: ActivityItem[];
}

function getHeatmapColor(count: number) {
  if (count === 0) return 'bg-[#ebedf0]'; 
  if (count <= 3) return 'bg-[#9be9a8]';  
  if (count <= 6) return 'bg-[#40c463]';  
  if (count <= 9) return 'bg-[#30a14e]';  
  return 'bg-[#216e39]';                  
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" as const, bounce: 0.2 } }
};

export default function GithubSection() {
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBadgeIndex, setSelectedBadgeIndex] = useState<number | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedBadgeIndex(null);
      if (e.key === 'ArrowRight') setSelectedBadgeIndex(prev => prev === null ? null : (prev === badgesList.length - 1 ? 0 : prev + 1));
      if (e.key === 'ArrowLeft') setSelectedBadgeIndex(prev => prev === null ? null : (prev === 0 ? badgesList.length - 1 : prev - 1));
    };
    if (selectedBadgeIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = 'auto'; if ((window as any).lenis) (window as any).lenis.start();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [selectedBadgeIndex]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/github');
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

      
        <div className="animate-pulse text-lg font-medium tracking-tight">Loading GitHub Activity...</div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-24 px-6 bg-transparent text-[#111111]">
        <div className="max-w-[1280px] mx-auto text-center border border-red-200 bg-red-50 p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-red-600 mb-2">GitHub Integration Error</h2>
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  const startDate = new Date(data.profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <section id="github" className="isolate overflow-hidden relative py-32 px-6 bg-transparent text-[#111111]">

      
      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 30 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
          }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <img src="https://skillicons.dev/icons?i=github" alt="GitHub" className="w-12 h-12 md:w-20 md:h-20 drop-shadow-sm transform rotate-3" />
            GitHub
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">My daily contribution graph.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            
            {/* Profile Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
              className="glassCard  rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-all duration-500 text-center flex flex-col items-center"
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
            >
              <img 
                src="https://github.com/ArshVermaGit.png" 
                alt={data.profile.name} 
                className="w-36 h-36 rounded-full mb-6 filter grayscale border border-gray-200"
              />
              <h3 className="text-[2rem] font-bold tracking-tight mb-1">{data.profile.name || data.profile.login}</h3>
              <p className="text-xl text-[#888888] font-medium tracking-tight mb-8">@{data.profile.login}</p>
              
              <p className="text-[#666666] leading-relaxed mb-10 max-w-[280px] font-medium">
                Building. Shipping. Contributing.<br/>Learning. Repeating.
              </p>

              <div className="flex flex-col items-center gap-4 text-[15px] text-[#888888] font-medium w-full">
                {data.profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={18} /> {data.profile.location}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={18} /> Joined {startDate}
                </div>
                
                <a 
                  href={`https://github.com/${data.profile.login}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full py-3.5 bg-[#111111] text-white rounded-xl font-bold tracking-tight hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                >
                  View GitHub Profile
                </a>
              </div>
            </motion.div>

            {/* Followers / Following */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
              className="glassCard  rounded-[2rem] py-6 px-8 shadow-sm hover:shadow-xl transition-all duration-500 flex justify-around items-center"
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl font-black tracking-tighter text-[#111111]">{data.profile.followers}</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#888888] flex items-center gap-1.5"><Users size={14} /> Followers</span>
              </div>
              <div className="w-[1px] h-12 bg-[#eeeeee]"></div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl font-black tracking-tighter text-[#111111]">{data.profile.following}</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#888888] flex items-center gap-1.5"><UserCheck size={14} /> Following</span>
              </div>
            </motion.div>

            {/* Top Languages */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
              className="glassCard  rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500"
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
            >
              <h4 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2"><Code size={20} /> Top Languages</h4>
              <div className="flex flex-wrap gap-3">
                {data.topLanguages.map((lang, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-full text-sm font-semibold border border-[#eeeeee] hover:bg-[#ececec] transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }}></span>
                    {lang.name}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Stats, Heatmap, Repos, Activity */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Top Stats Grid */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { label: 'CONTRIBUTIONS', value: data.stats.totalContributions, icon: <GitCommit size={14} /> },
                { label: 'TOTAL STARS', value: data.stats.totalStars, icon: <Star size={14} /> },
                { label: 'TOTAL FORKS', value: data.stats.totalForks, icon: <GitFork size={14} /> },
                { label: 'MAX STREAK', value: `${data.stats.maxStreak} Days`, icon: <Flame size={14} /> },
              ].map((stat, idx) => (
                <motion.div key={idx} whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }} className="glassCard  rounded-[2rem] p-4 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-center items-center text-center">
                  <p className="text-[10px] md:text-[11px] text-[#888888] font-bold uppercase tracking-widest mb-2 md:mb-3 flex items-center gap-1.5 justify-center">{stat.icon} {stat.label}</p>
                  <p className="text-3xl md:text-5xl font-black tracking-tighter text-[#111111]">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Heatmap */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
              className="glassCard  rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto relative"
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-2"><Activity size={20} /> Historical Heatmap</h3>
                  <p className="text-sm font-medium text-[#888888] mt-1">Last 12 months</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#888888]">
                  <span className="mr-1">Less</span>
                  <div className="w-3 h-3 rounded-sm bg-[#ebedf0]"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#9be9a8]"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#40c463]"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#30a14e]"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#216e39]"></div>
                  <span className="ml-1">More</span>
                </div>
              </div>

            <div className="flex-1 w-full overflow-hidden flex items-center justify-end">
              <div className="flex gap-[2px] sm:gap-[3px] lg:gap-[4px]">
                {data.calendar.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[2px] sm:gap-[3px] lg:gap-[4px]">
                    {week.contributionDays.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.contributionCount} contributions on ${day.date}`}
                        className={`w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] md:w-[10px] md:h-[10px] xl:w-3 xl:h-3 rounded-[1px] md:rounded-[2px] ${getHeatmapColor(day.contributionCount)} hover:ring-1 ring-[#111] transition-all cursor-pointer`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            </motion.div>

            {/* Bottom Row: 2 Repos + Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Top 2 Repositories */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
                className="flex flex-col gap-5"
              >
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 px-1">
                  <BookOpen size={20} /> Top Repos
                </h3>
                {data.repos.slice(0, 2).map((repo, idx) => (
                  <a 
                    key={idx} 
                    href={repo.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 glassCard  rounded-3xl p-6 shadow-sm    hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-lg font-bold tracking-tight mb-2 group-hover:underline flex items-center gap-2">
                        {repo.name}
                      </h4>
                      <p className="text-sm text-[#666666] line-clamp-2 mb-4 leading-relaxed">
                        {repo.description || "No description provided."}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#888888]">
                      {repo.primaryLanguage && (
                         <div className="flex items-center gap-1.5">
                           <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }}></span>
                           {repo.primaryLanguage.name}
                         </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Star size={14} /> {repo.stargazerCount}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GitFork size={14} /> {repo.forkCount}
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>

              {/* Recent Merged/Closed Activity */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
                className="flex flex-col gap-5"
              >
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 px-1">
                  <GitPullRequest size={20} /> Recent Activity
                </h3>
                <div className="flex flex-col gap-5 flex-1">
                  {[...data.recentPRs.map((pr: any) => ({...pr, type: 'pr'})), ...data.recentIssues.map((issue: any) => ({...issue, type: 'issue'}))]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 3)
                    .map((item, idx) => (
                      <a 
                        key={idx} 
                        href={item.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="glassCard rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex items-start gap-4 flex-1"
                      >
                        {item.type === 'pr' ? (
                          <GitPullRequest size={20} className="text-[#a64aff] shrink-0 mt-1" strokeWidth={2} />
                        ) : (
                          <CircleDot size={20} className="text-[#a64aff] shrink-0 mt-1" strokeWidth={2} />
                        )}
                        <div className="flex flex-col gap-1.5">
                          <p className="text-[15px] font-bold text-[#111] leading-snug group-hover:text-[#a64aff] transition-colors line-clamp-2">{item.title}</p>
                          <p className="text-[13px] font-bold text-[#888]">{item.type === 'pr' ? 'Merged PR' : 'Closed Issue'} • {new Date(item.createdAt).toLocaleDateString('en-GB')}</p>
                        </div>
                      </a>
                    ))}
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* Achievements */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
          className="glassCard rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 mt-10"
          whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
        >
          <h3 className="text-xl font-bold tracking-tight mb-8 flex items-center justify-center md:justify-start gap-2">
            <Trophy size={20} className="text-[#111111]" /> Achievements
          </h3>
          <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-center md:justify-evenly w-full">
            {badgesList.map((badge, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedBadgeIndex(idx)}
                className="relative group bg-white/50 border border-[#eaeaea] p-3 rounded-2xl hover:bg-white hover:border-[#ddd] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              >
                <img 
                  src={`/Github/${badge.file}`} 
                  alt={badge.name} 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Badge Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedBadgeIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111111]/80 backdrop-blur-md p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="relative bg-white rounded-[2rem] p-10 max-w-sm w-full flex flex-col items-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedBadgeIndex(null)}
                  className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>

                <img 
                  src={`/Github/${badgesList[selectedBadgeIndex].file}`} 
                  alt={badgesList[selectedBadgeIndex].name} 
                  className="w-48 h-48 object-contain mb-6 drop-shadow-xl"
                />
                <h3 className="text-2xl font-black tracking-tight text-[#111]">{badgesList[selectedBadgeIndex].name}</h3>
                
                {selectedBadgeIndex !== null && selectedBadgeIndex > 0 && (
                  <div className="fixed inset-y-0 left-4 md:left-10 flex items-center z-[10000] pointer-events-none">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBadgeIndex(prev => prev === null ? null : (prev === 0 ? prev : prev - 1));
                      }}
                      className="pointer-events-auto p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all hover:scale-110"
                    >
                      <ChevronLeft size={32} />
                    </button>
                  </div>
                )}

                {selectedBadgeIndex !== null && selectedBadgeIndex < badgesList.length - 1 && (
                  <div className="fixed inset-y-0 right-4 md:right-10 flex items-center z-[10000] pointer-events-none">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBadgeIndex(prev => prev === null ? null : (prev === badgesList.length - 1 ? prev : prev + 1));
                      }}
                      className="pointer-events-auto p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all hover:scale-110"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
}
