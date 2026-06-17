import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function EducationSection() {
  const education = [
    {
      id: 1,
      title: 'LKG to Class 12',
      institution: 'Fatima Senior Secondary School',
      duration: '2010 - 2024',
      location: 'Gonda, Uttar Pradesh - 271002',
      logo: '/Fatima.png',
      website: 'https://fatimaschoolgonda.in',
    },
    {
      id: 2,
      title: 'BTech in CSE (Specialization in Gaming Technology)',
      institution: 'VIT Bhopal University',
      duration: '2024 - 2028',
      location: 'Bhopal-Indore Highway, Kothrikalan, Sehore, Madhya Pradesh – 466114',
      logo: '/VIT.png',
      website: 'https://vitbhopal.ac.in',
    }
  ];

  return (
    <section id="education" className="isolate overflow-hidden relative py-32 px-6 lg:px-8 bg-transparent text-[#111111]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#f59e0b] to-[#d97706] rounded-2xl md:rounded-3xl shadow-md transform rotate-3">
              <GraduationCap className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Education
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">My academic background and qualifications.</span>
        </motion.h2>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {education.map((edu, idx) => (
            <motion.a 
              href={edu.website}
              target="_blank"
              rel="noopener noreferrer"
              key={edu.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
              transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
              className="group relative glassCard rounded-[3rem] p-2 flex flex-col cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-[#eaeaea]"
            >
              <div className="flex-1 rounded-[2.5rem] bg-white border border-[#f0f0f0] flex flex-col items-center text-center relative overflow-hidden p-6 sm:p-8 md:p-10 shadow-sm">
                {/* Logo Container */}
                <div className={`w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0 bg-white rounded-3xl flex items-center justify-center overflow-hidden border border-[#eee] shadow-md transition-all duration-500 relative z-10 mb-6 md:mb-8 ${edu.id === 2 ? 'p-2 sm:p-3' : ''}`}>
                  <div className={`w-full h-full flex items-center justify-center ${edu.id === 1 ? 'scale-[1.8]' : 'scale-100'}`}>
                    <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                
                {/* Typography */}
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#111] tracking-tight leading-tight mb-3 md:mb-4 transition-colors relative z-10">{edu.institution}</h3>
                
                <div className="text-base sm:text-lg md:text-xl font-bold text-[#555] mb-6 md:mb-8 relative z-10">{edu.title}</div>
                
                {/* Animated Divider */}
                <div className="w-16 h-1 bg-[#eaeaea] transition-all duration-500 mb-8 rounded-full relative z-10 group-hover:w-24 group-hover:bg-[#ccc]"></div>
                
                {/* Meta details */}
                <div className="flex flex-col gap-3 md:gap-4 w-full relative z-10 mt-auto bg-[#fafafa] p-5 md:p-6 rounded-3xl border border-[#f0f0f0] group-hover:border-[#e0e0e0] group-hover:bg-white transition-colors duration-500">
                  <div className="flex items-center justify-center gap-2 md:gap-3 text-xs sm:text-sm md:text-base font-black tracking-widest uppercase text-[#555]">
                    <Calendar size={16} className="md:w-[18px] md:h-[18px]" strokeWidth={2.5} />
                    {edu.duration}
                  </div>
                  <div className="flex items-start sm:items-center justify-center gap-2 md:gap-3 text-sm md:text-base font-medium text-[#666] text-left sm:text-center">
                    <MapPin size={16} className="shrink-0 mt-0.5 sm:mt-0 md:w-[18px] md:h-[18px]" />
                    <span className="leading-snug">{edu.location}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
