import { useEffect, useState } from 'react';
import { Play, Calendar, X, Activity, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface YoutubeFeed {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
}

interface YoutubeItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
}

interface YoutubeData {
  status: string;
  feed: YoutubeFeed;
  items: YoutubeItem[];
}

export default function YoutubeSection() {
  const [data, setData] = useState<YoutubeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideoIdx, setSelectedVideoIdx] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/youtube');
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

  useEffect(() => {
    if (selectedVideoIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedVideoIdx]);

  if (loading) {
    return (
      <section className="py-24 px-6 bg-transparent text-[#111111] min-h-[600px] flex items-center justify-center relative overflow-hidden isolate">

      
        <div className="animate-pulse text-lg font-bold tracking-tight text-[#FF0000]">Loading YouTube Playlist...</div>
      </section>
    );
  }

  if (error || !data || data.items.length === 0) {
    return (
      <section className="py-24 px-6 bg-transparent text-[#111111]">
        <div className="max-w-[1280px] mx-auto text-center border border-red-200 bg-red-50 p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-red-600 mb-2">YouTube Integration Error</h2>
          <p className="text-red-800 text-sm">{error || "No videos found."}</p>
        </div>
      </section>
    );
  }

  const recentVideos = data.items.slice(0, 4);

  return (
    <section id="youtube" className="isolate py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden">

      
      {/* Background blob removed as requested */}

      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className="w-12 h-12 md:w-20 md:h-20 drop-shadow-sm" />
            YouTube
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Sharing knowledge and tutorials.</span>
        </motion.h2>

        {/* PLAYLIST LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Channel Profile Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col glassCard  rounded-[2.5rem] overflow-hidden shadow-sm border border-transparent hover:border-gray-100 transition-colors duration-500"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            {/* Banner Mock */}
            <div className="h-32 w-full bg-cover bg-center relative" style={{ backgroundImage: "url('/youtube-banner.jpg')" }}>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            <div className="px-8 pb-8 flex flex-col items-center -mt-12 relative z-10 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white shadow-md mb-4">
                <img src="/youtube-profile-photo.jpeg" alt="Arsh Creates" className="w-full h-full object-cover" />
              </div>
              
              <h3 className="text-3xl font-black text-[#111] leading-tight flex items-center justify-center gap-2 mb-1">
                Arsh Creates
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="Verified" className="w-5 h-5" />
              </h3>
              <p className="text-sm text-[#666] font-bold uppercase tracking-wider mb-6">@ArshCreates</p>

              <div className="w-full grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white rounded-2xl p-4 border border-[#eee] flex flex-col items-center justify-center">
                  <Activity size={18} className="text-[#888] mb-1" />
                  <span className="font-black text-[#111] text-lg">Active</span>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-[#eee] flex flex-col items-center justify-center">
                  <Video size={18} className="text-[#888] mb-1" />
                  <span className="font-black text-[#111] text-lg">Creator</span>
                </div>
              </div>

              <a 
                href="https://www.youtube.com/@ArshCreates" 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-4 bg-[#FF0000] text-white rounded-2xl font-black text-lg hover:bg-[#cc0000] transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Play className="fill-white" size={18} /> Subscribe
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4 px-4">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <Play size={20} className="fill-[#111]" /> Recent Uploads
              </h4>
              <span className="text-xs font-bold text-[#888] uppercase tracking-widest">{recentVideos.length} Videos</span>
            </div>

            <div className="flex flex-col gap-3">
              {recentVideos.map((video, idx) => (
                <motion.div 
                  key={video.guid}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onClick={() => setSelectedVideoIdx(idx)}
                  className="group flex flex-col sm:flex-row items-center gap-6 p-4 rounded-3xl bg-white/40   border border-transparent hover:border-[#e5e5e5] hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-full sm:w-48 xl:w-56 aspect-video rounded-2xl overflow-hidden shrink-0 shadow-sm border border-[#eee]">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/30  rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 border border-white/40">
                        <Play size={16} className="ml-0.5 fill-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Details */}
                  <div className="flex-1 flex flex-col w-full">
                    <h4 className="text-lg md:text-xl font-bold text-[#111] leading-tight line-clamp-2 mb-2 group-hover:text-[#FF0000] transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-xs font-bold text-[#888] uppercase tracking-widest flex items-center gap-1.5 mt-auto">
                      <Calendar size={14} className="text-[#ccc]" />
                      {new Date(video.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>

                  {/* Play Indicator */}
                  <div className="hidden md:flex shrink-0 w-12 h-12 rounded-full border border-[#eee] items-center justify-center text-[#ccc] group-hover:border-[#FF0000] group-hover:bg-[#FF0000] group-hover:text-white transition-all duration-300">
                    <Play size={16} className="ml-1 group-hover:fill-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Video Modal */}
      <AnimatePresence>
        {selectedVideoIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedVideoIdx(null)}
          >
            {/* Left Navigation */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideoIdx(prev => prev! > 0 ? prev! - 1 : recentVideos.length - 1);
              }} 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/90 text-[#111] rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-2xl backdrop-blur-md"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>

            {/* Right Navigation */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideoIdx(prev => prev! < recentVideos.length - 1 ? prev! + 1 : 0);
              }} 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/90 text-[#111] rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-2xl backdrop-blur-md"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>

            <motion.div 
              key={recentVideos[selectedVideoIdx].guid} // Re-animate when video changes
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-black rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] aspect-video border border-white/20"
            >
              <button 
                onClick={() => setSelectedVideoIdx(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-2xl border border-[#eaeaea]"
              >
                <X size={20} strokeWidth={3} />
              </button>
              
              <iframe 
                src={`https://www.youtube.com/embed/${recentVideos[selectedVideoIdx].link.split('v=')[1]}?autoplay=1&color=red`} 
                title={recentVideos[selectedVideoIdx].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
