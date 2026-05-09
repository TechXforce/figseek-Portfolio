import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export function ParallaxBackground() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const scrollYRef = useRef(0);

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        baseOpacity: Math.random() * 0.25 + 0.1,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);

    const particles = particlesRef.current;
    const time = Date.now();
    const scrollOffset = scrollYRef.current * 0.3;

    // Move & draw particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const drawY = p.y + scrollOffset;
      const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.08 + p.baseOpacity;

      // Outer glow
      ctx.beginPath();
      ctx.arc(p.x, drawY, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${pulse * 0.3})`;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${pulse})`;
      ctx.fill();
    });

    // Draw connections
    const maxDist = 150;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const yi = particles[i].y + scrollOffset;
        const yj = particles[j].y + scrollOffset;
        const dx = particles[i].x - particles[j].x;
        const dy = yi - yj;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;

          ctx.beginPath();
          ctx.moveTo(particles[i].x, yi);
          ctx.lineTo(particles[j].x, yj);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    initParticles();
    animationRef.current = requestAnimationFrame(draw);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;

      if (orb1Ref.current) orb1Ref.current.style.transform = `translateY(${window.scrollY * 0.08}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translateY(${window.scrollY * 0.06}px)`;
      if (gridRef.current) gridRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [initParticles, draw]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ overflow: 'hidden' }}>
      {/* Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Gradient Orbs */}
      <div ref={orb1Ref} className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] will-change-transform"></div>
      <div ref={orb2Ref} className="absolute top-3/4 -right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] will-change-transform"></div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.02] will-change-transform"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      ></div>
    </div>
  );
}