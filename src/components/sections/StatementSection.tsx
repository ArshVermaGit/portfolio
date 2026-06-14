import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const statementText = '"If it can be built beautifully and shipped fast, it should be. My goal is to become the go-to frontend engineer for products that actually ship and scale."';

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="text-[#111111]">
      {children}
    </motion.span>
  );
};

export default function StatementSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const words = statementText.split(" ");

  return (
    <section ref={containerRef} className="py-40 px-6 bg-transparent flex justify-center text-center">
      <div className="max-w-[900px] mx-auto">
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight leading-snug flex flex-wrap justify-center gap-x-[0.3em] gap-y-2">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h3>
      </div>
    </section>
  )
}
