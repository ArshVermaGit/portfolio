import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function SupportSection() {
  useEffect(() => {
    // Inject the Buy Me A Coffee Widget Script
    const script = document.createElement('script');
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute('data-name', "BMC-Widget");
    script.setAttribute('data-cfasync', "false");
    script.setAttribute('data-id', "ArshVerma");
    script.setAttribute('data-description', "Support me on Buy me a coffee!");
    script.setAttribute('data-message', "");
    script.setAttribute('data-color', "#5F7FFF");
    script.setAttribute('data-position', "Right");
    script.setAttribute('data-x_margin', "18");
    script.setAttribute('data-y_margin', "18");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      const bmcWidget = document.getElementById('bmc-wbtn');
      if (bmcWidget) bmcWidget.remove();
    };
  }, []);

  return (
    <section id="support" className="py-32 px-6 bg-transparent text-[#111111] overflow-hidden relative isolate">

      

      
      {/* Background blobs removed as requested */}

      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 flex flex-col items-center justify-center text-center text-[#111111]"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-[#FFDD00] rounded-2xl md:rounded-3xl shadow-md transform rotate-6 flex items-center justify-center p-2.5">
              <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="BMC" className="w-full h-full object-contain" />
            </div>
            Support Me
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-8 flex items-center justify-center gap-2">
            Fuel my late-night coding sessions <Heart className="text-pink-500 fill-pink-500 w-5 h-5 md:w-6 md:h-6 inline" />
          </span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto glassCard   rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden"
        >
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-[#111]">Buy me a <span className="text-[#fca016]">Coffee</span></h3>
            <p className="text-lg text-[#666] mb-10 leading-relaxed max-w-md font-medium">
              If you found my open-source projects useful or enjoyed my content, consider buying me a coffee! It directly supports my work and helps me build more amazing things.
            </p>
            
            <a 
              href="https://www.buymeacoffee.com/ArshVerma" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 bg-[#FFDD00] text-[#111111] font-black rounded-full text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,221,0,0.4)] transition-all flex items-center gap-3"
            >
              <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" className="w-6 h-6" />
              Support on BMC
            </a>
          </div>

          <div className="w-full md:w-auto flex flex-col items-center gap-6 z-10">
            <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-2xl transform hover:-rotate-2 hover:scale-105 transition-all duration-300">
              <img src="/qr-code.png" alt="Support QR Code" className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-xl" />
            </div>
            <p className="text-xs font-bold text-[#888888] uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/10">Scan to Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
