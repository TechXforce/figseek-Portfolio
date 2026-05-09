import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
  {
    title: 'Quantum Analytics Platform',
    description: 'Real-time data visualization and analytics platform processing 10M+ events per day. Built with microservices architecture and distributed systems.',
    tech: ['React', 'Node.js', 'Kafka', 'PostgreSQL', 'AWS'],
    gradient: 'from-blue-500 to-cyan-500',
    emoji: '📊',
    image: '',
  },
  {
    title: 'Hyperion E-Commerce',
    description: 'Next-generation e-commerce platform with AI-powered recommendations, serving 500K+ users with 99.9% uptime.',
    tech: ['Next.js', 'Python', 'TensorFlow', 'MongoDB', 'Redis'],
    gradient: 'from-purple-500 to-pink-500',
    emoji: '🛍️',
    image: '',
  },
  {
    title: 'Stellar Cloud Console',
    description: 'Cloud infrastructure management dashboard with real-time monitoring, auto-scaling, and cost optimization features.',
    tech: ['Vue.js', 'Go', 'Kubernetes', 'Prometheus', 'GCP'],
    gradient: 'from-green-500 to-emerald-500',
    emoji: '☁️',
    image: '',
  },
  {
    title: 'Neural Chat Engine',
    description: 'AI-powered chat application with natural language processing, supporting multiple languages and real-time translation.',
    tech: ['React', 'WebSocket', 'OpenAI', 'Node.js', 'Docker'],
    gradient: 'from-orange-500 to-red-500',
    emoji: '💬',
    image: '',
  },
];

function ProjectCard({ project }: { project: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<NodeJS.Timeout | null>(null);
  const hasImage = project.image && project.image.length > 0;

  const handleMouseEnter = () => {
    setIsHovered(true);
    timerRef.current = setTimeout(() => {
      setIsStreaming(true);
      let index = 0;
      setDisplayedText('');
      streamRef.current = setInterval(() => {
        if (index <= project.description.length) {
          setDisplayedText(project.description.slice(0, index));
          index++;
        } else {
          if (streamRef.current) clearInterval(streamRef.current);
          setShowTech(true);
        }
      }, 20);
    }, 1000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsStreaming(false);
    setShowTech(false);
    setDisplayedText('');
    if (timerRef.current) clearTimeout(timerRef.current);
    if (streamRef.current) clearInterval(streamRef.current);
  };

  return (
    <motion.div
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
        <div className={`relative h-64 overflow-hidden ${!hasImage ? `bg-gradient-to-br ${project.gradient}` : ''}`}>
          {hasImage && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
          
          {!hasImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: isHovered ? 0.5 : 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className={`${isHovered ? 'text-4xl' : 'text-7xl'} transition-all duration-400`}>
                  {project.emoji}
                </div>
                <h3 className="text-2xl font-bold text-white mt-4">{project.title}</h3>
              </motion.div>
            </div>
          )}

          {hasImage && (
            <motion.div
              animate={{
                opacity: isHovered ? 0 : 1,
                y: isHovered ? -20 : 0,
              }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-6 left-6 right-6"
            >
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
            </motion.div>
          )}
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent flex items-end justify-center pb-6 gap-3 transition-opacity duration-300 ${isStreaming ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="min-h-[80px]">
            {isStreaming && (
              <p className="text-gray-400 mb-4 leading-relaxed">
                {displayedText}
                {displayedText.length < project.description.length && <span className="animate-pulse">|</span>}
              </p>
            )}
          </div>
          
          {showTech && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2"
            >
              {project.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing some of my most impactful work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a href="https://github.com/TechXforce" target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Github className="w-5 h-5 mr-2" />
            View More on GitHub
          </Button>
        </a>
        </motion.div>
      </div>
    </section>
  );
}