import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, X, ChevronLeft, ChevronRight, FileBadge } from 'lucide-react';

const certificates = [
  {
    company: "Deloitte Australia",
    course: "Data Analytics Job Simulation",
    link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_691ddbabc72988b4c63d861b_1768319467032_completion_certificate.pdf",
    color: "from-[#86efac] to-[#3b82f6]"
  },
  {
    company: "EAB",
    course: "GenAI for Proposal Generation",
    link: "https://www.theforage.com/completion-certificates/PSJm5xBFZtjjf9AnA/i2nMh36aEWT7awGCa_PSJm5xBFZtjjf9AnA_691ddbabc72988b4c63d861b_1768315564743_completion_certificate.pdf",
    color: "from-[#fca5a5] to-[#ef4444]"
  },
  {
    company: "Electronic Arts",
    course: "Software Engineering",
    link: "https://www.theforage.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_691ddbabc72988b4c63d861b_1766001074505_completion_certificate.pdf",
    color: "from-[#fbcfe8] to-[#db2777]"
  },
  {
    company: "Forage Academy",
    course: "Data Labeling Job Simulation",
    link: "https://www.theforage.com/completion-certificates/HgpPSsyQpzob6HEh9/Fnbjyox4Y4SciuEGF_HgpPSsyQpzob6HEh9_691ddbabc72988b4c63d861b_1764324602296_completion_certificate.pdf",
    color: "from-[#d8b4fe] to-[#9333ea]"
  },
  {
    company: "AWS",
    course: "Solutions Architecture",
    link: "https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_691ddbabc72988b4c63d861b_1763579648735_completion_certificate.pdf",
    color: "from-[#fcd34d] to-[#f59e0b]"
  },
  {
    company: "J.P. Morgan",
    course: "Software Engineering",
    link: "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_691ddbabc72988b4c63d861b_1763575348436_completion_certificate.pdf",
    color: "from-[#93c5fd] to-[#2563eb]"
  }
];

function CertModal({ 
  cert, 
  onClose, 
  onPrev, 
  onNext, 
  hasPrev, 
  hasNext 
}: { 
  cert: any, 
  onClose: () => void, 
  onPrev: () => void, 
  onNext: () => void, 
  hasPrev: boolean, 
  hasNext: boolean 
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'; if ((window as any).lenis) (window as any).lenis.stop();
    return () => {
      document.body.style.overflow = 'auto'; if ((window as any).lenis) (window as any).lenis.start();
    };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-10"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-full max-h-[90vh] bg-[#f4f4f2] rounded-[2rem] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative"
      >
        {/* Navigation Buttons */}
        {hasPrev && (
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/90 text-[#111] rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-2xl backdrop-blur-md hidden md:flex">
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
        )}
        {hasNext && (
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/90 text-[#111] rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-2xl backdrop-blur-md hidden md:flex">
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>
        )}

        {/* Header */}
        <div className="px-8 py-6 bg-white border-b border-[#eee] flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
          <div>
            <h3 className="text-2xl font-black text-[#111] tracking-tight">{cert.course}</h3>
            <p className="text-[#666] font-bold text-sm tracking-widest uppercase mt-1 flex items-center gap-2">
              <ShieldCheck size={16} /> {cert.company}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center justify-center gap-2 px-6 py-3 bg-[#111] text-white rounded-full font-bold text-sm hover:bg-black transition-colors shrink-0">
              Open Original <ExternalLink size={16} />
            </a>
            <button onClick={onClose} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md border border-[#eaeaea] shrink-0">
              <X size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* PDF Iframe Viewer */}
        <div className="flex-1 w-full bg-[#ebebeb] relative overflow-hidden" data-lenis-prevent="true">
          <iframe 
            src={`${cert.link}#view=FitH`} 
            className="w-full h-full border-none"
            title={`${cert.company} Certificate`}
          />
        </div>

      </motion.div>
    </motion.div>,
    document.body
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4, duration: 0.8 } }
};

export default function CertificationsSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section id="certifications" className="py-32 px-6 bg-transparent relative isolate">
      <div className="max-w-[1280px] mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 30 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4, duration: 0.8 } }
          }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#f59e0b] to-[#ea580c] rounded-2xl md:rounded-3xl shadow-md transform rotate-3">
              <Award className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Certifications
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Professional training and simulations.</span>
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", bounce: 0.5 } }}
              className="cursor-pointer glassCard rounded-[2rem] p-2 flex flex-col group relative overflow-hidden h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Inner certificate frame */}
              <div className="flex-1 rounded-[1.5rem] bg-[#fafafa] border border-[#f0f0f0] p-8 flex flex-col relative overflow-hidden">
                
                {/* Large watermark icon */}
                <FileBadge className="absolute -bottom-10 -right-10 w-64 h-64 text-black/[0.02] group-hover:text-black/[0.04] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />

                {/* Top bar: Company & Status */}
                <div className="flex items-start justify-between mb-10 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cert.color} flex items-center justify-center shadow-md transform -rotate-6 group-hover:rotate-0 transition-transform duration-500`}>
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black tracking-widest text-[#888] uppercase mb-1">Issuer</span>
                    <span className="text-sm font-bold text-[#111] bg-white px-3 py-1 rounded-full shadow-sm border border-[#eee]">
                      {cert.company}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center mb-8">
                  <span className="text-xs font-black tracking-widest text-[#aaa] uppercase mb-2">Certification / Program</span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#111] leading-tight group-hover:text-blue-600 transition-colors">
                    {cert.course}
                  </h3>
                </div>

                {/* Bottom Bar */}
                <div className="mt-auto pt-6 border-t border-[#eaeaea] flex items-center justify-between text-[#888] group-hover:text-[#111] transition-colors relative z-10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-green-500" />
                    <span className="font-bold text-sm tracking-widest uppercase text-[#555]">Verified</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-[#eee] group-hover:bg-[#111] group-hover:border-[#111] group-hover:text-white flex items-center justify-center transition-all">
                    <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <CertModal 
            cert={certificates[selectedIdx]}
            onClose={() => setSelectedIdx(null)}
            onPrev={() => setSelectedIdx(prev => prev! > 0 ? prev! - 1 : certificates.length - 1)}
            onNext={() => setSelectedIdx(prev => prev! < certificates.length - 1 ? prev! + 1 : 0)}
            hasPrev={certificates.length > 1}
            hasNext={certificates.length > 1}
          />
        )}
      </AnimatePresence>

    </section>
  );
}
