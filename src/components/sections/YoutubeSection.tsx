import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [currentPage, setCurrentPage] = useState(0);

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
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = 'auto';
      if ((window as any).lenis) (window as any).lenis.start();
    }
    return () => { 
      document.body.style.overflow = 'auto'; 
      if ((window as any).lenis) (window as any).lenis.start();
    };
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

  const videosPerPage = 2;
  const totalPages = Math.ceil(data.items.length / videosPerPage);
  const currentVideos = data.items.slice(currentPage * videosPerPage, (currentPage + 1) * videosPerPage);

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
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className="w-12 h-12 md:w-20 md:h-20 drop-shadow-sm transform rotate-3" />
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
            className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col glassCard rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300"
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

          {/* RIGHT: Recent Uploads */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 glassCard rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Play size={20} className="fill-[#111]" /> Recent Uploads
              </h3>
              <span className="text-[9px] font-black text-[#888] uppercase tracking-widest">{data.items.length} Videos</span>
            </div>

            <div className="flex flex-col gap-4 flex-1 justify-center">
              {currentVideos.map((video, idx) => {
                const globalIdx = currentPage * videosPerPage + idx;
                return (
                <motion.div 
                  key={video.guid}
                  onClick={() => setSelectedVideoIdx(globalIdx)}
                  className="group flex flex-col sm:flex-row items-center gap-6 p-5 rounded-3xl glassCard shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
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
              )})}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#eee]">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all ${currentPage === 0 ? 'text-[#ccc] cursor-not-allowed bg-transparent' : 'text-[#555] bg-gray-50 hover:bg-gray-100 hover:text-[#111]'}`}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${currentPage === idx ? 'bg-[#FF0000] scale-125' : 'bg-gray-200 hover:bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all ${currentPage === totalPages - 1 ? 'text-[#ccc] cursor-not-allowed bg-transparent' : 'text-[#555] bg-gray-50 hover:bg-gray-100 hover:text-[#111]'}`}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>

        </div>
      </div>

      {/* Embedded Video Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedVideoIdx !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md overscroll-none"
            >
              {/* Left Navigation */}
              {selectedVideoIdx !== null && selectedVideoIdx > 0 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVideoIdx(prev => prev! > 0 ? prev! - 1 : prev);
                  }} 
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg border border-white/10 backdrop-blur-md"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              )}

            {/* Right Navigation */}
            {selectedVideoIdx !== null && selectedVideoIdx < data.items.length - 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVideoIdx(prev => prev! < data.items.length - 1 ? prev! + 1 : prev);
                }} 
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg border border-white/10 backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            )}

            <motion.div 
              key={data.items[selectedVideoIdx].guid} // Re-animate when video changes
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-black rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] aspect-video border border-white/20 overscroll-contain"
            >
              <button 
                onClick={() => setSelectedVideoIdx(null)}
                className="absolute top-3 right-3 md:top-6 md:right-6 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md text-black rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-2xl border border-white/20"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
              </button>
              
              <iframe 
                src={`https://www.youtube.com/embed/${data.items[selectedVideoIdx].link.split('v=')[1]}?autoplay=1&color=red`} 
                title={data.items[selectedVideoIdx].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
