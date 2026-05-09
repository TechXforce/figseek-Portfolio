import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useCallback } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 88 },
      { name: 'JavaScript', level: 85 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 93 },
      { name: 'Python', level: 90 },
      { name: 'FastAPI', level: 85 },
      { name: 'SQLite', level: 82 },
      { name: 'GraphQL', level: 80 },
    ],
  },
  {
    title: 'AI & APIs',
    skills: [
      { name: 'Google Gemini', level: 88 },
      { name: 'OpenRouter', level: 82 },
      { name: 'NLP Engine', level: 78 },
      { name: 'Chart.js', level: 75 },
      { name: 'PWA APIs', level: 70 },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Git', level: 94 },
      { name: 'VS Code', level: 90 },
      { name: 'Docker', level: 85 },
      { name: 'CI/CD', level: 82 },
      { name: 'Chrome DevTools', level: 78 },
    ],
  },
];

const barColors = [
  { from: '#3b82f6', to: '#60a5fa', glow: 'rgba(59, 130, 246, 0.7)' },
  { from: '#8b5cf6', to: '#a78bfa', glow: 'rgba(139, 92, 246, 0.7)' },
  { from: '#ec4899', to: '#f472b6', glow: 'rgba(236, 72, 153, 0.7)' },
  { from: '#06b6d4', to: '#22d3ee', glow: 'rgba(6, 182, 212, 0.7)' },
  { from: '#10b981', to: '#34d399', glow: 'rgba(16, 185, 129, 0.7)' },
];

function SkillCategoryCard({ category, index, isInView }: { category: any; index: number; isInView: boolean }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const updateBorder = useCallback((colorIndex: number | null, isHoveringSkill: boolean) => {
    const el = borderRef.current;
    if (!el) return;
    
    if (colorIndex !== null && isHoveringSkill) {
      const c = barColors[colorIndex % barColors.length];
      el.style.background = `linear-gradient(135deg, ${c.from}, ${c.to})`;
      el.style.boxShadow = `0 0 15px ${c.glow}, 0 0 30px ${c.glow}`;
      el.style.opacity = '1';
    } else if (isCardHovered && !isHoveringSkill) {
      el.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
      el.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.4)';
      el.style.opacity = '1';
    } else {
      el.style.opacity = '0';
    }
  }, [isCardHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => {
        setIsCardHovered(true);
        if (activeSkillIndex === null && borderRef.current) {
          borderRef.current.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
          borderRef.current.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.4)';
          borderRef.current.style.opacity = '1';
        }
      }}
      onMouseLeave={() => {
        setIsCardHovered(false);
        if (activeSkillIndex === null && borderRef.current) {
          borderRef.current.style.opacity = '0';
        }
      }}
      className="relative"
    >
      {/* Border glow element */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: '2px',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      />

      <div className="relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.08] backdrop-blur-sm h-full bg-black" style={{ zIndex: 1 }}>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          {category.title}
        </h3>

        <div className="space-y-6">
          {category.skills.map((skill: any, skillIndex: number) => {
            const color = barColors[skillIndex % barColors.length];
            const [isHovered, setIsHovered] = useState(false);

            return (
              <div
                key={skill.name}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setActiveSkillIndex(skillIndex);
                  updateBorder(skillIndex, true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setActiveSkillIndex(null);
                  updateBorder(null, false);
                }}
                style={{
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  zIndex: isHovered ? 10 : 1,
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    style={{
                      color: isHovered ? color.to : '#d1d5db',
                      fontWeight: isHovered ? 600 : 500,
                      transition: 'color 0.3s',
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      color: isHovered ? color.to : '#60a5fa',
                      transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                      transition: 'all 0.3s',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + skillIndex * 0.05 }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                      background: isHovered
                        ? `linear-gradient(to right, ${color.from}, ${color.to})`
                        : 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                      transition: 'background 0.3s',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: isHovered ? color.glow : 'rgba(255, 255, 255, 0.2)',
                        opacity: isHovered ? 0.5 : 0.2,
                        transition: 'all 0.3s',
                      }}
                    ></div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              index={categoryIndex}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg">
            Always learning and adapting to new technologies and methodologies
          </p>
        </motion.div>
      </div>
    </section>
  );
}