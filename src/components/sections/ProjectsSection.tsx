import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, GitFork, ArrowUpRight, Code, Layers, Sparkles, LayoutGrid } from 'lucide-react';

const projects = [
  {
    title: "SimplyPDF",
    repo: "SimplyPDF",
    logo: "/simplypdf.png",
    screenshot: "/1.png",
    about: "The Ultimate, Privacy-Focused PDF Swiss-Army Knife. SimplyPDF provides a seamless and secure environment to manipulate, edit, and organize your PDF files completely locally without sacrificing user experience.",
    features: [
      "100% Privacy Focused & Local Processing",
      "Merge, Split, and Compress PDFs instantly",
      "Intuitive Drag-and-Drop Interface",
      "Lightning-fast document generation"
    ],
    tech: ["nextjs", "typescript", "tailwind", "vercel"]
  },
  {
    title: "RAW.AI",
    repo: "RAW.AI",
    logo: "/rawai.png",
    screenshot: "/2.png",
    about: "Bypass AI detection with human-grade rewriting. RAW.AI leverages an advanced proprietary 'Ultra Logic' engine to transform your AI-generated content into authentic, undetectable, and engaging text.",
    features: [
      "Advanced Humanization with 99.9% bypass rate",
      "Integrated AI Detector (GPTZero, Turnitin)",
      "Standard, Academic, & Creative Writing Modes",
      "Real-time readability and authenticity analysis"
    ],
    tech: ["react", "nodejs", "tailwind", "supabase"]
  },
  {
    title: "REELSPOT",
    repo: "REELSPOT",
    logo: "/reelspot.png",
    screenshot: "/3.png",
    about: "The Ultimate Social Media Experience. Redefined. Reelspot isn't just a downloader; it's a statement on software aesthetics designed for creators who value precision, privacy, and performance.",
    features: [
      "Native-speed downloads from Instagram, YouTube, TikTok",
      "Privacy Zero: No tracking, no cookies, invisible browsing",
      "Obsidian UX with hand-crafted 60fps micro-animations",
      "Developer-first scalable screaming core architecture"
    ],
    tech: ["nextjs", "typescript", "tailwind", "vite"]
  }
];

function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/repos/ArshVermaGit/${project.repo}`);
        if (res.ok) {
           const repoData = await res.json();
           setData(repoData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60  p-4 md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/50  text-white rounded-full flex items-center justify-center hover:bg-black transition-colors shadow-lg">
          <X size={24} strokeWidth={2.5} />
        </button>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-white">
             <div className="w-10 h-10 border-4 border-[#eee] border-t-[#111] rounded-full animate-spin"></div>
             <p className="font-bold text-[#888] tracking-widest uppercase text-sm animate-pulse">Loading GitHub Data...</p>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ddd] [&::-webkit-scrollbar-thumb]:rounded-full">
            
            {/* Top Header: Massive Screenshot */}
            <div className="w-full bg-[#f9f9f9] relative min-h-[300px] md:min-h-[450px] border-b border-[#eee]">
               <img 
                  src={project.screenshot} 
                  alt={`${project.title} Screenshot`} 
                  className="w-full h-full object-cover absolute inset-0" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[#ccc] font-bold tracking-widest uppercase text-xl">No Screenshot Available</div>`;
                  }}
                />
            </div>

            {/* Middle Section: Meta Info & Buttons */}
            <div className="px-8 py-10 md:px-12 flex flex-col md:flex-row gap-8 items-start justify-between border-b border-[#eee] bg-white">
               <div className="flex-1">
                 <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111] mb-4">{project.title}</h2>
                 <p className="text-xl text-[#666] font-medium leading-relaxed max-w-3xl">{data?.description || "No description provided."}</p>
                 
                 <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-[#f9f9f9] rounded-full border border-[#eee]">
                       <Star size={18} className="text-[#e3b341] fill-[#e3b341]" />
                       <span className="font-bold text-[#111] text-lg">{data?.stargazers_count || 0}</span>
                    </div>
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-[#f9f9f9] rounded-full border border-[#eee]">
                       <GitFork size={18} className="text-[#888]" />
                       <span className="font-bold text-[#111] text-lg">{data?.forks_count || 0}</span>
                    </div>
                 </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                 <a 
                   href={data?.html_url || `https://github.com/ArshVermaGit/${project.repo}`} 
                   target="_blank" 
                   rel="noreferrer"
                   className="px-8 py-4 bg-[#111] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
                 >
                   <Code size={20} /> View Repo
                 </a>
                 {data?.homepage && (
                   <a 
                     href={data.homepage} 
                     target="_blank" 
                     rel="noreferrer"
                     className="px-8 py-4 bg-white border-2 border-[#111] text-[#111] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#f9f9f9] transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-lg"
                   >
                     <ArrowUpRight size={20} /> Live Demo
                   </a>
                 )}
               </div>
            </div>

            {/* Bottom Section: Curated Details */}
            <div className="p-8 md:p-12 bg-transparent flex-1">
               <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                 
                 {/* About & Features */}
                 <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm  flex flex-col h-full">
                   <h3 className="text-2xl md:text-3xl font-black text-[#111] mb-6">About the Project</h3>
                   <p className="text-lg text-[#555] font-medium leading-relaxed mb-10">{project.about}</p>
                   
                   <h4 className="text-xl font-bold text-[#111] mb-6 flex items-center gap-2">
                     <Sparkles size={20} className="text-indigo-500" /> Key Features
                   </h4>
                   <ul className="flex flex-col gap-4 flex-1">
                     {project.features.map((feature: string, i: number) => (
                       <li key={i} className="flex items-start gap-4">
                         <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                           <span className="text-sm font-black">✓</span>
                         </div>
                         <span className="text-[#333] font-medium text-lg">{feature}</span>
                       </li>
                     ))}
                   </ul>
                 </div>

                 {/* Tech Stack */}
                 <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm  flex flex-col h-full">
                   <h3 className="text-2xl md:text-3xl font-black text-[#111] mb-8">Tech Stack</h3>
                   <div className="flex flex-wrap gap-4">
                     {project.tech.map((tech: string, i: number) => (
                       <div key={i} className="px-6 py-4 bg-[#f9f9f9] hover:bg-[#f0f0f0] border border-[#eee] hover:border-[#ddd] rounded-2xl flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-sm cursor-default">
                         <img src={`https://skillicons.dev/icons?i=${tech}`} className="w-10 h-10 drop-shadow-sm" alt={tech} />
                         <span className="font-bold text-[#111] text-lg capitalize">{tech}</span>
                       </div>
                     ))}
                   </div>
                   
                   <div className="mt-auto pt-10">
                     <div className="flex items-center justify-between p-6 bg-[#f9f9f9] border border-[#eee] rounded-2xl">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-[#888] uppercase tracking-widest mb-1.5">Project Status</span>
                          <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            <span className="font-bold text-[#111] tracking-tight">Actively Maintained</span>
                          </div>
                        </div>
                        
                        {data?.license && (
                          <div className="flex flex-col text-right border-l border-[#ddd] pl-6">
                            <span className="text-xs font-black text-[#888] uppercase tracking-widest mb-1.5">License</span>
                            <span className="font-bold text-[#111] tracking-tight truncate max-w-[120px]" title={data.license.name}>{data.license.spdx_id || data.license.name}</span>
                          </div>
                        )}
                     </div>
                   </div>
                 </div>

               </div>
            </div>

          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ProjectListItem({ project, onClick, idx }: { project: any, onClick: () => void, idx: number }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchRepo() {
      try {
        const res = await fetch(`https://api.github.com/repos/ArshVermaGit/${project.repo}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {}
    }
    fetchRepo();
  }, [project.repo]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-50px" }} 
      transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", bounce: 0.2 }}
      className="group bg-white/70  rounded-[2.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white hover:border-[#eee] transition-all duration-500 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
    >
       {/* Clickable Overlay for Modal */}
       <div className="absolute inset-0 z-0 cursor-pointer" onClick={onClick}></div>

       {/* Logo */}
       <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-[#f9f9f9] rounded-[2rem] flex items-center justify-center p-4 border border-[#eee] group-hover:scale-105 transition-transform duration-500 relative z-10 pointer-events-none">
         <img 
           src={project.logo} 
           alt={project.title} 
           className="w-full h-full object-contain drop-shadow-sm rounded-2xl" 
           onError={(e) => {
             e.currentTarget.style.display = 'none';
           }}
         />
       </div>

       {/* Details */}
       <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative z-10 pointer-events-none">
         <h3 className="text-3xl font-black text-[#111] tracking-tight mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
         <p className="text-[#666] font-medium leading-relaxed mb-6 line-clamp-2 max-w-2xl">{data?.description || "Fetching repository details from GitHub..."}</p>
         
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#eee] shadow-sm">
               <Star size={16} className="text-[#e3b341] fill-[#e3b341]" />
               <span className="font-bold text-[#111]">{data?.stargazers_count || 0}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#eee] shadow-sm">
               <GitFork size={16} className="text-[#888]" />
               <span className="font-bold text-[#111]">{data?.forks_count || 0}</span>
            </div>
         </div>
       </div>

       {/* Actions */}
       <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 relative z-10">
         <a 
           href={data?.html_url || `https://github.com/ArshVermaGit/${project.repo}`} 
           target="_blank" 
           rel="noreferrer"
           className="flex-1 md:w-48 py-3.5 px-6 bg-[#111] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
         >
           <Code size={18} /> GitHub Repo
         </a>
         {data?.homepage ? (
           <a 
             href={data.homepage} 
             target="_blank" 
             rel="noreferrer"
             className="flex-1 md:w-48 py-3.5 px-6 bg-white border border-[#ddd] text-[#111] rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#f9f9f9] transition-all shadow-sm hover:-translate-y-1"
           >
             <ArrowUpRight size={18} /> Live Demo
           </a>
         ) : (
           <button 
             onClick={onClick}
             className="flex-1 md:w-48 py-3.5 px-6 bg-white border border-[#ddd] text-[#111] rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#f9f9f9] transition-all shadow-sm hover:-translate-y-1"
           >
             <LayoutGrid size={18} /> View Details
           </button>
         )}
       </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="works" className="py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden isolate">

      

      
      <div className="max-w-[1000px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-[#111] rounded-2xl md:rounded-3xl shadow-md transform -rotate-3">
              <Layers className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Featured Work
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Selected open-source projects.</span>
        </motion.h2>
        
        <div className="flex flex-col gap-6">
          {projects.map((project, idx) => (
            <ProjectListItem 
              key={idx} 
              project={project} 
              idx={idx} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
