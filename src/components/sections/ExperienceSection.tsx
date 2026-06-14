import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      role: 'Core Member (Tech Team)',
      organisation: 'UX Club VIT Bhopal University',
      location: 'On Site',
      description: 'Core Member, UX Design Club | Collaborating on UX projects, design events, and initiatives that foster user-centered thinking and creativity across campus.',
      skills: ['UI/UX', 'JavaScript', 'TypeScript', 'React.js', 'Project Management', 'Teamwork'],
      logo: '/UX.jpeg'
    }
  ];

  return (
    <section id="experience" className="isolate overflow-hidden relative py-32 px-6 lg:px-8 bg-transparent text-[#111111]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-16 text-[#111111] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#14b8a6] to-[#0ea5e9] rounded-2xl md:rounded-3xl shadow-md transform -rotate-3">
              <Briefcase className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Experience
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Professional journey and roles.</span>
        </motion.h2>

        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          {experiences.map((exp, idx) => (
            <motion.a 
              href="https://www.instagram.com/uxclub.vitb/"
              target="_blank"
              rel="noopener noreferrer"
              key={exp.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}
              transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
              className="bg-white rounded-[3rem] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] transition-all duration-500 border border-[#eaeaea] flex flex-col relative group cursor-pointer"
            >
              <div className="flex-1 rounded-[2.5rem] bg-[#fafafa] border border-[#f0f0f0] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-[#eee] shadow-sm group-hover:border-[#14b8a6] transition-colors duration-300 relative z-10">
                  <img src={exp.logo} alt={exp.organisation} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-[#111] tracking-tight mb-2 group-hover:text-[#14b8a6] transition-colors">{exp.role}</h3>
                      <div className="text-lg font-bold text-[#555]">{exp.organisation}</div>
                    </div>
                    <div className="px-4 py-1.5 bg-white text-[#0ea5e9] rounded-full text-sm font-black tracking-widest uppercase border border-[#e0f2fe] shadow-sm whitespace-nowrap self-start md:self-auto mt-2 md:mt-0">
                      {exp.location}
                    </div>
                  </div>

                  <p className="text-lg text-[#666] font-medium leading-relaxed mb-8">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 bg-white border border-[#eee] text-[#555] rounded-xl text-xs font-bold tracking-widest uppercase shadow-sm group-hover:border-[#ddd] transition-colors">
                        {skill}
                      </span>
                    ))}
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
