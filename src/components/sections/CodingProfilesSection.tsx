import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" as const, bounce: 0.2 } }
};

const defaultPfp = "https://github.com/ArshVermaGit.png";

export default function CodingProfilesSection() {
  return (
    <section id="coding-profiles" className="py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden isolate">

      

      
      {/* Background blob removed as requested */}

      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#8E2DE2] to-[#4A00E0] rounded-2xl md:rounded-3xl shadow-md transform rotate-3">
              <Terminal className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Coding & AI Profiles
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Tracking my continuous learning.</span>
        </motion.h2>

        {/* 2x2 LUXURIOUS DASHBOARD GRID */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          
          {/* 1. LEETCODE DASHBOARD CARD */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://leetcode.com/u/arsh-leetcode/" target="_blank" rel="noreferrer"
              className="group relative flex flex-col bg-[#1a1a1a] rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-[#333333] text-white p-6 gap-6 flex-1"
            >
              {/* Header / Identity */}
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={defaultPfp} alt="Arsh Verma" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight flex items-center gap-2">Arsh Verma <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span></h3>
                  <p className="text-xs text-[#888888] mb-1">arsh-leetcode</p>
                  <p className="text-sm font-semibold">Rank <span className="text-white">5,21,863</span></p>
                </div>
              </div>

              {/* Stats Panels */}
              <div className="flex gap-4 w-full h-32">
                {/* Contest Panel */}
                <div className="flex-1 bg-[#282828] rounded-xl p-4 flex flex-col justify-between border border-[#333]">
                  <div>
                    <p className="text-[10px] text-[#888] uppercase tracking-wider">Contest Rating</p>
                    <p className="text-2xl font-bold text-white">1,325</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#888]"><span className="text-white">836,211</span> Global Ranking</p>
                  </div>
                </div>
                {/* Solved Donut Panel */}
                <div className="flex-[1.5] bg-[#282828] rounded-xl p-4 flex items-center gap-4 border border-[#333]">
                  <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-[#FFA116] border-r-transparent border-b-transparent shrink-0">
                    <div className="text-center">
                      <p className="text-xl font-bold leading-none">278</p>
                      <p className="text-[8px] text-[#888]">Solved</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex justify-between items-center text-[10px] bg-[#333] px-2 py-1 rounded">
                      <span className="text-teal-400">Easy</span>
                      <span className="font-bold text-white">108/949</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] bg-[#333] px-2 py-1 rounded">
                      <span className="text-yellow-500">Med.</span>
                      <span className="font-bold text-white">135/2067</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] bg-[#333] px-2 py-1 rounded">
                      <span className="text-red-500">Hard</span>
                      <span className="font-bold text-white">35/942</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Submissions */}
              <div className="bg-[#282828] rounded-xl p-4 border border-[#333] flex justify-between items-center mt-auto">
                <p className="text-xs font-bold text-white">752 <span className="text-[#888] font-normal">submissions in the past one year</span></p>
                <div className="flex gap-1">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-[1px] ${i % 3 === 0 ? 'bg-green-500' : 'bg-[#333]'}`}></div>
                  ))}
                </div>
              </div>
            </motion.a>
            <p className="text-center text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">LeetCode</p>
          </motion.div>

          {/* 2. GEEKSFORGEEKS DASHBOARD CARD */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://www.geeksforgeeks.org/profile/arshver3wu0" target="_blank" rel="noreferrer"
              className="group relative flex flex-col bg-[#111111] rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-[#222] text-white p-6 gap-6 flex-1"
            >
              {/* Header / Identity */}
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#2F8D46]">
                  <img src="/youtube-profile-photo.jpeg" alt="Arsh Verma" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight uppercase tracking-wide">ARSH VERMA</h3>
                  <p className="text-xs text-[#888888]">Community Member</p>
                </div>
                <img src="https://images.yourstory.com/cs/images/companies/119169043101580097794440231905187057223611079n-1617083628661.png" alt="GFG" className="w-8 h-8 ml-auto filter brightness-0 invert opacity-20" />
              </div>

              {/* Stats Panels */}
              <div className="flex gap-4 w-full h-32">
                {/* Solved Donut Panel */}
                <div className="flex-1 bg-[#1A1A1A] rounded-xl p-4 flex flex-col items-center justify-center border border-[#222]">
                  <p className="text-[10px] text-[#888] mb-2">Problems Overview</p>
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-[5px] border-[#2F8D46] border-b-yellow-500 border-l-orange-500 shrink-0">
                    <div className="text-center">
                      <p className="text-xl font-bold leading-none">66</p>
                    </div>
                  </div>
                </div>
                {/* Score Panel */}
                <div className="flex-1 bg-[#1A1A1A] rounded-xl p-4 flex flex-col gap-2 border border-[#222] justify-center">
                  <div className="flex justify-between items-center bg-[#222] px-3 py-2 rounded-lg">
                    <span className="text-[10px] text-[#888] uppercase">Coding Score</span>
                    <span className="font-bold text-[#2F8D46]">263</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#222] px-3 py-2 rounded-lg">
                    <span className="text-[10px] text-[#888] uppercase">Problems Solved</span>
                    <span className="font-bold text-white">66</span>
                  </div>
                </div>
                {/* Streak Panel */}
                <div className="flex-1 bg-[#1A1A1A] rounded-xl flex flex-col border border-[#222] overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-center py-2">
                    <span className="text-[10px] font-bold text-white uppercase">0 Day POTD Streak</span>
                  </div>
                  <div className="p-3 text-center flex-1 flex flex-col justify-center">
                    <p className="text-[10px] text-[#888] uppercase">Longest Streak</p>
                    <p className="text-xl font-bold text-white">12 Days</p>
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Submissions */}
              <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#222] flex justify-between items-center mt-auto">
                <p className="text-xs font-bold text-white">67 <span className="text-[#888] font-normal">Submissions in Year <span className="text-blue-400">2026</span></span></p>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-[2px] ${i % 4 === 0 ? 'bg-[#2F8D46]' : 'bg-[#222]'}`}></div>
                  ))}
                </div>
              </div>
            </motion.a>
            <p className="text-center text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">GeeksForGeeks</p>
          </motion.div>

          {/* 3. KAGGLE DASHBOARD CARD */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://www.kaggle.com/arshvermadev" target="_blank" rel="noreferrer"
              className="group relative flex flex-col bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-[#111111] p-6 gap-6 flex-1"
            >
              {/* Header Banner Mock */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-80 pointer-events-none">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFDE00] rounded-bl-full translate-x-4 -translate-y-4"></div>
                <div className="absolute top-8 right-8 w-24 h-24 bg-[#20BEFF] rounded-tl-[3rem] rounded-bl-[3rem] transform rotate-12"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#2F8D46] rounded-tl-full translate-x-4 translate-y-4"></div>
              </div>

              {/* Header / Identity */}
              <div className="flex gap-6 items-center relative z-10 pt-4">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-[#20BEFF] p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src="/instagram-profile-photo.jpeg" alt="Arsh Verma" className="w-full h-full object-cover grayscale" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#888888] mb-1">arshvermadev</p>
                  <h3 className="text-2xl font-black leading-tight uppercase tracking-wider mb-2">ARSH VERMA</h3>
                  <p className="text-[10px] text-[#666] flex items-center gap-1">Joined 4 days ago · last seen 3 days ago</p>
                </div>
              </div>

              {/* Nav Mock */}
              <div className="flex gap-6 border-b border-[#eee] pb-2 mt-4">
                <span className="text-xs text-[#888]">About</span>
                <span className="text-xs font-bold text-[#111] border-b-2 border-[#111] pb-2 -mb-[9px]">Models (1)</span>
                <span className="text-xs text-[#888]">Code (1)</span>
              </div>

              {/* Content Mock */}
              <div className="flex-1 flex flex-col gap-4 mt-auto">
                <h4 className="font-bold text-lg">Public Models (1)</h4>
                <div className="border border-[#eee] rounded-xl p-4 flex gap-4 items-center group-hover:border-[#ccc] transition-colors">
                  <div className="w-10 h-10 rounded-full border border-[#eee] p-1 bg-[#f5f5f5]">
                    <img src={defaultPfp} className="w-full h-full rounded-full grayscale opacity-50" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#1a73e8]">REVIEW.AI</h5>
                    <p className="text-[10px] text-[#666] mt-1 truncate max-w-[200px]">BERT-base-uncased fine-tuned on the massive Amazon Reviews Multi dataset...</p>
                  </div>
                  <div className="ml-auto border border-[#eee] px-2 py-1 rounded-md text-[10px] font-bold text-[#111] flex items-center gap-1">
                    ^ 0
                  </div>
                </div>
              </div>
            </motion.a>
            <p className="text-center text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">Kaggle</p>
          </motion.div>

          {/* 4. HUGGING FACE DASHBOARD CARD */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://huggingface.co/ArshVerma" target="_blank" rel="noreferrer"
              className="group relative flex bg-[#0B0F19] rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-[#1e293b] text-white p-6 gap-6 flex-1"
            >
              {/* Left Sidebar */}
              <div className="w-1/3 flex flex-col gap-4 border-r border-[#1e293b] pr-6">
                <div className="w-full aspect-square rounded-full overflow-hidden border border-[#334155] relative">
                  <img src="/hugging-face-profile-picture.jpeg" alt="Arsh Verma" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 bg-[#1e293b] text-[10px] px-2 py-0.5 rounded-full border border-[#334155] flex items-center gap-1">
                    ❤️ 1
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">Arsh Verma</h3>
                  <p className="text-xs text-[#94a3b8] bg-[#1e293b] inline-block px-1.5 py-0.5 rounded mt-1">ArshVerma</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-[#1e293b] text-white px-2 py-1 rounded border border-[#334155]">+ New</span>
                  <span className="text-[10px] text-[#94a3b8] border border-[#334155] px-2 py-1 rounded">Edit profile</span>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 flex flex-col gap-6 pt-2">
                {/* Spaces Section */}
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-2 mb-3"><span className="w-3 h-3 grid grid-cols-2 gap-[1px]"><span className="bg-blue-400"></span><span className="bg-purple-400"></span><span className="bg-orange-400"></span><span className="bg-green-400"></span></span> Spaces <span className="text-[#94a3b8] font-normal">1</span></h4>
                  <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-4 flex flex-col gap-2 h-24 justify-between group-hover:scale-[1.02] transition-transform origin-left">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-medium">Sleeping</span>
                      <span className="text-[10px] font-medium flex items-center gap-1">🤍 1</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">CodeLens Environment 🔎</h5>
                      <p className="text-[10px] opacity-80 mt-1">View live CodeLens leaderboard and stats</p>
                    </div>
                  </div>
                </div>

                {/* Empty Sections */}
                <div className="mt-auto flex flex-col gap-4">
                  <div>
                    <h4 className="text-xs font-bold flex items-center gap-2 mb-2"><span className="w-3 h-3 bg-gray-400 rounded-sm"></span> Models <span className="text-[#94a3b8] font-normal">0</span></h4>
                    <p className="text-xs text-[#475569]">None yet</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold flex items-center gap-2 mb-2"><span className="w-3 h-3 bg-gray-400 rounded-sm"></span> Datasets <span className="text-[#94a3b8] font-normal">0</span></h4>
                    <p className="text-xs text-[#475569]">None yet</p>
                  </div>
                </div>
              </div>
            </motion.a>
            <p className="text-center text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">Hugging Face</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
