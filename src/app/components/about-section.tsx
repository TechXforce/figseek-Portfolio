import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Code2, Rocket, Zap, Globe, Download } from 'lucide-react';
import { Button } from './ui/button';

const features = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and efficient code following industry best practices.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge technologies and creative problem-solving.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing applications for speed, efficiency, and exceptional user experience.',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Building systems that serve millions of users across the globe seamlessly.',
  },
];

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    timerRef.current = setTimeout(() => {
      setIsStreaming(true);
      let index = 0;
      setDisplayedText('');
      streamRef.current = setInterval(() => {
        if (index <= description.length) {
          setDisplayedText(description.slice(0, index));
          index++;
        } else {
          if (streamRef.current) clearInterval(streamRef.current);
        }
      }, 20);
    }, 1000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsStreaming(false);
    setDisplayedText('');
    if (timerRef.current) clearTimeout(timerRef.current);
    if (streamRef.current) clearInterval(streamRef.current);
  };

  return (
    <motion.div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 h-full">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            animate={{
              scale: isHovered ? 0.5 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 ${
              isHovered ? 'w-14 h-14' : 'w-24 h-24'
            }`}
          >
            <Icon className={`${isHovered ? 'w-7 h-7' : 'w-12 h-12'} text-blue-400 transition-all duration-400`} />
          </motion.div>
          
          <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
          
          <div className="min-h-[60px]">
            {isStreaming && (
              <p className="text-gray-400 leading-relaxed">
                {displayedText}
                {displayedText.length < description.length && <span className="animate-pulse">|</span>}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PhilosophySection({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-white mb-4">Philosophy</h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            I believe in building software that not only meets requirements but exceeds expectations. 
            Every line of code is an opportunity to create something remarkable. I'm committed to 
            continuous learning, embracing new technologies, and contributing to the developer community.
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.06, 1, 1.04, 1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
            }}
            className="w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-1"
          >
            <motion.div
              className="w-full h-full rounded-2xl bg-black flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(59, 130, 246, 0)',
                  '0 0 30px rgba(59, 130, 246, 0.4)',
                  '0 0 0px rgba(139, 92, 246, 0)',
                  '0 0 25px rgba(139, 92, 246, 0.3)',
                  '0 0 0px rgba(59, 130, 246, 0)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                className="text-6xl"
                animate={{
                  y: [0, -2, 0, -1.5, 0, -0.5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
                }}
              >
                🚀
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>

          {/* Profile Image with split rotating ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex justify-center"
            style={{
              perspective: "1000px"
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
              const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
              setTilt({ x: y * 10, y: -x * 10 });
            }}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <div className="relative w-40 h-40">
              {/* Split Ring - Blue & Purple Arcs with Gaps */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-3 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #3b82f6 0deg, #3b82f6 60deg, transparent 60deg, transparent 120deg, #8b5cf6 120deg, #8b5cf6 240deg, transparent 240deg, transparent 300deg, #3b82f6 300deg, #3b82f6 360deg)',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
                }}
              />

              {/* Profile Picture */}
              <motion.div
                style={{
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-blue-500 to-purple-500"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 blur-sm"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                  <img
                    src="/images/about.jpg"
                    alt="Profile"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            I'm a passionate IT Technician & Web Developer with experience building
            applications. I thrive on solving complex challenges and delivering exceptional results.
          </p>

          {/* Download Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-transparent border-2 border-purple-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:text-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:bg-clip-border hover:border-transparent transition-all duration-300"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Kudakwashe_J_Chigiya_Resume.pdf';
                link.target = '_blank';
                link.click();
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <PhilosophySection isInView={isInView} />
      </div>
    </section>
  );
}