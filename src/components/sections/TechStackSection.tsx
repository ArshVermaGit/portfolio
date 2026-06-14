import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const techStack = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
      { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
      { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
      { name: "C++", icon: "https://skillicons.dev/icons?i=cpp" },
      { name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
      { name: "C#", icon: "https://skillicons.dev/icons?i=cs" },
      { name: "Bash", icon: "https://skillicons.dev/icons?i=bash" },
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
      { name: "HTML5", icon: "https://skillicons.dev/icons?i=html" },
      { name: "CSS3", icon: "https://skillicons.dev/icons?i=css" },
      { name: "Sass", icon: "https://skillicons.dev/icons?i=sass" },
      { name: "Vite", icon: "https://skillicons.dev/icons?i=vite" },
      { name: "Redux", icon: "https://skillicons.dev/icons?i=redux" },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
      { name: "Express.js", icon: "https://skillicons.dev/icons?i=express" },
      { name: "FastAPI", icon: "https://skillicons.dev/icons?i=fastapi" },
      { name: "GraphQL", icon: "https://skillicons.dev/icons?i=graphql" },
      { name: "Nginx", icon: "https://skillicons.dev/icons?i=nginx" },
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
      { name: "Redis", icon: "https://skillicons.dev/icons?i=redis" },
      { name: "Supabase", icon: "https://skillicons.dev/icons?i=supabase" },
      { name: "SQLite", icon: "https://skillicons.dev/icons?i=sqlite" },
      { name: "Prisma", icon: "https://skillicons.dev/icons?i=prisma" },
    ]
  },
  {
    category: "DevOps & Infrastructure",
    skills: [
      { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
      { name: "Kubernetes", icon: "https://skillicons.dev/icons?i=kubernetes" },
      { name: "Linux", icon: "https://skillicons.dev/icons?i=linux" },
      { name: "Cloudflare", icon: "https://skillicons.dev/icons?i=cloudflare" },
      { name: "Vercel", icon: "https://skillicons.dev/icons?i=vercel" },
      { name: "GitHub Actions", icon: "https://skillicons.dev/icons?i=githubactions" },
      { name: "AWS", icon: "https://skillicons.dev/icons?i=aws" },
    ]
  },
  {
    category: "UI/UX & Design",
    skills: [
      { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
      { name: "Styled Components", icon: "https://skillicons.dev/icons?i=styledcomponents" },
    ]
  },
  {
    category: "Dev Tools",
    skills: [
      { name: "Git", icon: "https://skillicons.dev/icons?i=git" },
      { name: "GitHub", icon: "https://skillicons.dev/icons?i=github" },
      { name: "VS Code", icon: "https://skillicons.dev/icons?i=vscode" },
      { name: "Postman", icon: "https://skillicons.dev/icons?i=postman" },
      { name: "Jest", icon: "https://skillicons.dev/icons?i=jest" },
    ]
  }
];

const row1 = [...techStack[0].skills, ...techStack[6].skills];
const row2 = [...techStack[1].skills, ...techStack[5].skills];
const row3 = [...techStack[2].skills, ...techStack[3].skills, ...techStack[4].skills];

const MarqueeRow = ({ items, reverse = false, speed = 40 }: { items: any[], reverse?: boolean, speed?: number }) => {
  // Multiply items to ensure the marquee never runs out of width
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];
  
  return (
    <div className="flex overflow-hidden w-full relative py-2">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex gap-4 w-max shrink-0 px-2"
      >
        {duplicatedItems.map((skill, idx) => (
          <div 
            key={`${skill.name}-${idx}`} 
            className="flex items-center gap-4 glassCard  rounded-full pr-8 pl-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)]    hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            <div className="w-10 h-10 bg-[#f8f8f8] rounded-full flex items-center justify-center border border-[#eeeeee]">
              <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain drop-shadow-sm" loading="lazy" />
            </div>
            <span className="text-[15px] font-bold tracking-tight text-[#111111]">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="py-32 bg-transparent text-[#111111] overflow-hidden relative isolate">

      

      
      {/* Gradient Fades for Marquee */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F4F4F2] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F4F4F2] to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-6 mb-20 relative z-20 text-center">
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
            <div className="p-3 md:p-4 bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] rounded-2xl md:rounded-3xl shadow-md transform -rotate-3">
              <Cpu className="text-white w-10 h-10 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            Tech Stack
          </div>
          <span className="text-xl md:text-2xl text-[#888888] font-medium tracking-tight mt-6">Tools and technologies I work with.</span>
        </motion.h2>
      </div>

      <div className="flex flex-col gap-4 relative z-0 transform -rotate-2 scale-105">
        <MarqueeRow items={row1} speed={60} />
        <MarqueeRow items={row2} speed={55} reverse />
        <MarqueeRow items={row3} speed={65} />
      </div>
    </section>
  );
}
