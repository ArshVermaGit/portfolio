import { motion } from 'framer-motion';
import { Mail, Send, Globe } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4, duration: 0.8 } }
};

const defaultPfp = "https://github.com/ArshVermaGit.png";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 bg-transparent text-[#111111] relative overflow-hidden isolate">

      

      
      {/* Background blob removed as requested */}

      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 30 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
          }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#1a73e8] to-[#00c6ff] rounded-2xl md:rounded-3xl shadow-md transform -rotate-3">
              <Globe className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Let's Connect
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-8">Find me across the web.</span>
        </motion.h2>

        {/* BENTO GRID - Chaotic layout */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[340px]"
        >
          
          {/* 1. LINKEDIN CARD (Wide) */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 md:col-span-2 h-full">
            <motion.a 
              href="https://www.linkedin.com/in/arshvermadev/" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500 flex-1"
            >
              <div className="h-[100px] w-full relative bg-cover bg-center" style={{ backgroundImage: "url('/linkedin-banner.jpeg')" }}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-[4px] border-white bg-white overflow-hidden shadow-sm">
                  <img src="/linkedin-profile-photo.jpeg" alt="Arsh Verma" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="pt-12 px-6 pb-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#111111] leading-tight">Arsh Verma</h3>
                <p className="text-sm text-[#666666] mb-3">Software Engineer | AI Developer</p>
                <p className="text-xs font-semibold text-[#888888] mb-4">500+ Connections • 2.5K Followers</p>
                <div className="mt-auto">
                  <div className="w-full py-2.5 bg-[#0a66c2] text-white rounded-xl text-sm font-bold text-center group-hover:bg-[#004182] transition-colors">Connect</div>
                </div>
              </div>
            </motion.a>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" className="w-4 h-4" />
              LinkedIn
            </p>
          </motion.div>

          {/* 2. GITHUB CARD (Standard) */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://github.com/ArshVermaGit" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="group relative flex flex-col bg-[#0d1117] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500 border border-[#30363d] text-white flex-1"
            >
              <div className="pt-8 px-6 pb-6 flex flex-col flex-1 items-center text-center">
                <img src="https://skillicons.dev/icons?i=github" className="absolute top-5 right-5 w-6 h-6 opacity-50 grayscale group-hover:grayscale-0 transition-all" />
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-[4px] border-[#30363d] shadow-sm">
                  <img src={defaultPfp} alt="GitHub" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold leading-tight">Arsh Verma</h3>
                <p className="text-sm text-[#8b949e] mb-3">ArshVermaGit</p>
                <p className="text-xs font-medium text-[#8b949e] mb-4">2.1K Contributions • 54 Repositories</p>
                <div className="mt-auto w-full">
                  <div className="w-full py-2.5 bg-[#21262d] border border-[#363b42] text-[#c9d1d9] rounded-xl text-sm font-bold text-center group-hover:bg-[#30363d] transition-colors">Follow</div>
                </div>
              </div>
            </motion.a>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="w-4 h-4 object-contain" />
              GitHub
            </p>
          </motion.div>

          {/* 3. X (TWITTER) CARD (Standard) */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://x.com/TheArshVerma" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="group relative flex flex-col bg-black rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500 border border-[#333333] text-white flex-1"
            >
              <div className="h-[100px] w-full relative bg-cover bg-center" style={{ backgroundImage: "url('/X-banner.jpg')" }}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-[4px] border-black bg-black overflow-hidden shadow-sm">
                  <img src="/x-profile-photo.jpeg" alt="Arsh Verma" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="pt-12 px-6 pb-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-bold leading-tight">Arsh Verma</h3>
                    <p className="text-sm text-[#888888]">@TheArshVerma</p>
                  </div>
                  <img src="https://skillicons.dev/icons?i=twitter" className="w-5 h-5 grayscale opacity-50 mt-1" />
                </div>
                <p className="text-xs text-[#cccccc] mb-3 line-clamp-2">Building scalable software and exploring AI.</p>
                <p className="text-xs font-medium text-[#888888] mb-4"><span className="text-white font-semibold">342</span> Following &nbsp; <span className="text-white font-semibold">1,245</span> Followers</p>
                <div className="mt-auto w-full">
                  <div className="w-full py-2.5 bg-white text-black rounded-xl text-sm font-bold text-center group-hover:bg-[#eeeeee] transition-colors">Follow</div>
                </div>
              </div>
            </motion.a>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="X" className="w-3.5 h-3.5 object-contain" />
              X (Twitter)
            </p>
          </motion.div>

          {/* 4. DISCORD CARD (Standard) */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://discord.com/users/975373913980825610" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="group relative flex flex-col bg-[#2b2d31] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500 border border-[#1e1f22] text-white flex-1"
            >
              <div className="h-[100px] w-full relative bg-cover bg-center" style={{ backgroundImage: "url('/discord-banner.jpg')" }}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-[4px] border-[#2b2d31] bg-[#2b2d31] relative">
                  <img src="/Discord-profile-photo.jpg" alt="Arsh Verma" className="w-full h-full object-cover rounded-full" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#23a559] border-[4px] border-[#2b2d31] rounded-full"></div>
                </div>
              </div>
              <div className="pt-12 px-6 pb-6 flex flex-col flex-1">
                <div className="bg-[#111214] p-3 rounded-xl mb-3 border border-[#1e1f22]">
                  <h3 className="text-lg font-bold leading-tight">Arsh</h3>
                  <p className="text-sm text-[#b5bac1]">ArshVerma</p>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b5bac1] mb-1">Playing</p>
                <p className="text-xs font-medium text-white mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5865F2]"></span>
                  Visual Studio Code
                </p>
                <div className="mt-auto w-full">
                  <div className="w-full py-2.5 bg-[#5865F2] text-white rounded-xl text-sm font-bold text-center group-hover:bg-[#4752c4] transition-colors">Send Message</div>
                </div>
              </div>
            </motion.a>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg" alt="Discord" className="w-4 h-4 object-contain" />
              Discord
            </p>
          </motion.div>

          {/* 5. YOUTUBE CARD (Wide) */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 md:col-span-2 h-full">
            <motion.a 
              href="https://www.youtube.com/@ArshCreates" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500 flex-1"
            >
              <div className="h-[100px] w-full relative bg-cover bg-center" style={{ backgroundImage: "url('/youtube-banner.jpg')" }}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-[4px] border-white bg-white overflow-hidden shadow-sm">
                  <img src="/youtube-profile-photo.jpeg" alt="Arsh Creates" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="pt-12 px-6 pb-6 flex flex-col flex-1 text-center">
                <h3 className="text-lg font-bold text-[#111111] leading-tight">Arsh Creates</h3>
                <p className="text-sm text-[#666666] mb-3">@ArshCreates</p>
                <p className="text-xs font-medium text-[#888888] mb-4">10.5K Subscribers • 120 Videos</p>
                <div className="mt-auto w-full max-w-xs mx-auto">
                  <div className="w-full py-2.5 bg-black text-white rounded-xl text-sm font-bold text-center group-hover:bg-[#FF0000] transition-colors">Subscribe</div>
                </div>
              </div>
            </motion.a>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className="w-4 h-4 object-contain" />
              YouTube
            </p>
          </motion.div>

          {/* 6. DEV.TO CARD (Standard) */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://dev.to/arshvermadev" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500 border-[3px] border-black flex-1"
            >
              <div className="pt-8 px-6 pb-6 flex flex-col flex-1 items-center text-center relative">
                <div className="absolute top-5 right-5 bg-black text-white text-[10px] font-black px-2 py-1 rounded">DEV</div>
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <img src={defaultPfp} alt="Arsh" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-black text-[#111111] leading-tight font-mono">Arsh Verma</h3>
                <p className="text-sm text-[#666666] mb-3 font-mono">@arshvermadev</p>
                <p className="text-xs font-bold text-[#111111] mb-4">850 Followers • 45 Posts</p>
                <div className="mt-auto w-full">
                  <div className="w-full py-2.5 bg-white border-[3px] border-black text-black rounded-xl text-sm font-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">Follow</div>
                </div>
              </div>
            </motion.a>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">
              <span className="bg-black text-white px-1 py-0.5 rounded text-[8px] leading-none">DEV</span>
              DEV.to
            </p>
          </motion.div>

          {/* 7. GMAIL CARD (Wide) */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 md:col-span-2 h-full">
            <motion.a 
              href="mailto:arshverma.dev@gmail.com" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500 flex-1"
            >
              <div className="pt-6 px-6 pb-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3 border-b border-[#eeeeee] pb-3">
                  <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-[#888888] uppercase tracking-widest mb-1">New Message</p>
                    <h3 className="text-base font-bold text-[#111111] truncate">arshverma.dev@gmail.com</h3>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="w-full py-2.5 bg-[#f5f5f5] rounded-xl px-4 text-sm text-[#888888] font-medium border border-transparent group-hover:border-[#eeeeee] transition-colors">Sub: Let's work together!</div>
                  <div className="w-full flex-1 min-h-[60px] bg-[#f5f5f5] rounded-xl p-4 text-sm text-[#cccccc] font-medium border border-transparent group-hover:border-[#eeeeee] transition-colors">Write your message...</div>
                </div>
                <div className="mt-3 flex justify-end">
                  <div className="px-8 py-2.5 bg-[#1a73e8] text-white rounded-xl text-sm font-bold text-center group-hover:bg-[#1557b0] transition-colors flex items-center justify-center gap-2">
                    <Send size={16} /> Send
                  </div>
                </div>
              </div>
            </motion.a>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-4 h-4 object-contain" />
              Gmail
            </p>
          </motion.div>

          {/* 8. WHATSAPP CARD (Standard) */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://wa.me/919555532013" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="group relative flex flex-col bg-[#efeae2] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500 flex-1"
            >
              <div className="bg-[#075E54] px-5 py-4 flex items-center gap-3 text-white shrink-0 z-10 relative shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white overflow-hidden shrink-0">
                  <img src="/whatsapp-profile-photo.png" alt="Arsh" className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-base font-bold leading-tight truncate">Arsh Verma</h3>
                  <p className="text-xs opacity-80">online</p>
                </div>
              </div>
              
              <div className="px-6 py-6 flex flex-col flex-1 relative bg-[url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')] bg-cover bg-center">
                 <div className="absolute inset-0 bg-[#efeae2]/90 "></div>
                 <div className="relative z-10 flex flex-col gap-3 h-full justify-center">
                   <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-sm self-start shadow-sm text-sm max-w-[90%] text-[#111111]">
                     Hey! Let's build something.
                   </div>
                   <div className="bg-[#dcf8c6] px-4 py-2.5 rounded-2xl rounded-tr-sm self-end shadow-sm text-sm max-w-[90%] text-[#111111] flex items-end gap-2 mt-2 group-hover:scale-105 origin-right transition-transform">
                     Click to text me. <span className="text-[10px] text-[#888] mb-0.5">✓✓</span>
                   </div>
                 </div>
              </div>
            </motion.a>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4 object-contain" />
              WhatsApp
            </p>
          </motion.div>

          {/* 9. INSTAGRAM CARD (Standard) */}
          <motion.div variants={cardVariants} className="flex flex-col gap-3 h-full">
            <motion.a 
              href="https://www.instagram.com/idc.arsh/" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500 flex-1"
            >
              <div className="pt-8 px-6 pb-6 flex flex-col flex-1 items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] mb-4">
                  <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden bg-white">
                    <img src="/instagram-profile-photo.jpeg" alt="Arsh" className="w-full h-full object-cover" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#111111] leading-tight">idc.arsh</h3>
                <p className="text-sm text-[#666666] mb-4">Arsh Verma</p>
                
                <div className="flex justify-center gap-6 w-full mb-6">
                  <div><p className="font-bold text-[#111111] text-base">12</p><p className="text-xs text-[#888]">posts</p></div>
                  <div><p className="font-bold text-[#111111] text-base">1.2k</p><p className="text-xs text-[#888]">followers</p></div>
                  <div><p className="font-bold text-[#111111] text-base">400</p><p className="text-xs text-[#888]">following</p></div>
                </div>
                <div className="mt-auto w-full">
                  <div className="w-full py-2.5 bg-[#0095f6] text-white rounded-xl text-sm font-bold text-center group-hover:bg-[#1877f2] transition-colors">Follow</div>
                </div>
              </div>
            </motion.a>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#111111] font-black uppercase tracking-widest shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-4 h-4 object-contain" />
              Instagram
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
