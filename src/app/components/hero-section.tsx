import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';

// WhatsApp Icon Component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function HeroSection() {
  const name = "K J CHIGIYA";
  const title = "IT Technician & Web Developer";
  const description = "Building next-generation applications with modern technologies. Specialized in scalable systems, cloud infrastructure, and cutting-edge web development.";

  const [displayedText, setDisplayedText] = useState({ name: "", title: "", description: "" });

  useEffect(() => {
    let nameIndex = 0;
    let titleIndex = 0;
    let descIndex = 0;

    const nameStartDelay = setTimeout(() => {
      const nameInterval = setInterval(() => {
        if (nameIndex <= name.length) {
          setDisplayedText(prev => ({ ...prev, name: name.slice(0, nameIndex) }));
          nameIndex++;
        } else {
          clearInterval(nameInterval);
        }
      }, 100);
    }, 1500);

    const titleTimeout = setTimeout(() => {
      const titleInterval = setInterval(() => {
        if (titleIndex <= title.length) {
          setDisplayedText(prev => ({ ...prev, title: title.slice(0, titleIndex) }));
          titleIndex++;
        } else {
          clearInterval(titleInterval);
        }
      }, 50);
    }, 1500 + name.length * 100 + 200);

    const descTimeout = setTimeout(() => {
      const descInterval = setInterval(() => {
        if (descIndex <= description.length) {
          setDisplayedText(prev => ({ ...prev, description: description.slice(0, descIndex) }));
          descIndex++;
        } else {
          clearInterval(descInterval);
        }
      }, 30);
    }, 1500 + name.length * 100 + 200 + title.length * 50 + 200);

    return () => {
      clearTimeout(nameStartDelay);
      clearTimeout(titleTimeout);
      clearTimeout(descTimeout);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Profile Image - Top Left with split rotating ring */}
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          type: "spring",
          bounce: 0.4
        }}
        className="absolute top-20 left-6 md:top-24 md:left-8 z-20"
      >
        <div className="relative w-52 h-52 md:w-60 md:h-60">
          {/* Split Ring - Blue Arc (Clockwise) */}
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
          <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-blue-500 to-purple-500">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 blur-sm"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
              <ImageWithFallback
                src="/images/hero.jpg"
                alt="Profile"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-bold mb-6 min-h-[120px] md:min-h-[160px] mt-8">
          <span className="bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent ml-4">
            {displayedText.name}
          </span>
        </h1>

        <div className="mb-8 min-h-[160px]">
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 min-h-[40px]">
            {displayedText.title}
            {displayedText.title.length > 0 && displayedText.title.length < title.length && <span className="animate-pulse">|</span>}
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto min-h-[80px]">
            {displayedText.description}
            {displayedText.description.length > 0 && displayedText.description.length < description.length && <span className="animate-pulse">|</span>}
          </p>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Button
            size="lg"
            className="bg-transparent border-2 border-purple-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:text-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:bg-clip-border hover:border-transparent transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
          <Button
            size="lg"
            className="bg-transparent border-2 border-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:text-black hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:bg-clip-border hover:border-transparent transition-all duration-300"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </Button>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a href="https://github.com/TechXforce" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://zw.linkedin.com/in/kudakwashe-jabulani-chigiya-0a360b247" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="LinkedIn">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://wa.me/263713975875?text=Hello%20Kudakwashe%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors" title="WhatsApp">
            <WhatsAppIcon className="w-6 h-6" />
          </a>
          <a href="mailto:www.kjchigiya@gmail.com" className="text-gray-400 hover:text-white transition-colors" title="Email">
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </motion.div>
    </section>
  );
}