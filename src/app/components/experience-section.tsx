import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'Midlands State University',
    position: 'Web Developer / IT Support Specialist / Administrator',
    period: '2024 - 2025',
    location: 'Gweru, Zimbabwe',
    description: 'Developed a database management system for the WRL-Office. Led troubleshooting and system configurations across departments. Managed complex schedule planning and IT infrastructure coordination.',
    achievements: [
      'Built a custom database system that reduced data retrieval time by 70%',
      'Resolved 25+ technical support tickets with 98% satisfaction rate',
      'Streamlined scheduling processes saving hours per week across teams',
    ],
    image: '/images/msu.jpg',
  },
  {
    company: 'Great International Foundation',
    position: 'IT Support Specialist / Graphic Designer / Manager',
    period: '2023 - 2024',
    location: 'Harare, Zimbabwe',
    description: 'Managed computer repair, maintenance, and IT support operations. Designed compelling visual content for events and marketing campaigns. Coordinated event planning and team management initiatives.',
    achievements: [
      'Designed world class marketing materials that increased event attendance by 40%',
      'Repaired and maintained 20+ devices ensuring zero downtime for critical operations',
      'Led a team of 8 staff members to execute successful corporate events',
    ],
    image: '/images/gif.jpeg',
  },
  {
    company: '@TheBeachBar',
    position: 'Waiter',
    period: '2018 - 2019',
    location: 'Pretoria, South Africa',
    description: 'Delivered exceptional hospitality and customer care in a high-volume environment. Built strong interpersonal skills while managing fast-paced service operations.',
    achievements: [
      'Served 60+ customers daily maintaining a 5-star satisfaction rating',
      'Recognized as Employee of the Month for outstanding service',
      'Trained on service standards and customer engagement',
    ],
    image: '/images/@thebeachbar.jpeg',
  },
];

function PhotoCard({ image, company }: { image: string; company: string }) {
  return (
    <div className="p-1 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-sm overflow-hidden h-full">
      <div className="relative w-full h-full min-h-[320px] rounded-xl overflow-hidden">
        <img
          src={image}
          alt={`Working at ${company}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 inline-block">
            📍 {company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="experience" className="relative py-32 overflow-hidden">

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My professional journey across industries and borders
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-black z-10"></div>

                {/* Desktop Layout: Side by side */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 items-stretch">
                  {index % 2 === 0 ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                      >
                        <ExperienceCard exp={exp} />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                      >
                        <PhotoCard image={exp.image} company={exp.company} />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                      >
                        <PhotoCard image={exp.image} company={exp.company} />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                      >
                        <ExperienceCard exp={exp} />
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Mobile Layout: Stacked */}
                <div className="md:hidden space-y-4 pl-8">
                  <ExperienceCard exp={exp} />
                  <PhotoCard image={exp.image} company={exp.company} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp }: { exp: any }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{exp.position}</h3>
          <p className="text-blue-400 font-semibold">{exp.company}</p>
          <p className="text-gray-500 text-xs">{exp.location}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Calendar className="w-4 h-4" />
        <span>{exp.period}</span>
      </div>

      <p className="text-gray-300 mb-4 leading-relaxed">
        {exp.description}
      </p>

      <div className="space-y-2">
        {exp.achievements.map((achievement: string) => (
          <div key={achievement} className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">▸</span>
            <span className="text-gray-400 text-sm">{achievement}</span>
          </div>
        ))}
      </div>
    </div>
  );
}