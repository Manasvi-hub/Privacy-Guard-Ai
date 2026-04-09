import { useState, Suspense, lazy, useRef, useEffect } from "react";
import { Play, ShieldCheck, Lock, Fingerprint } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
const VideoModal = lazy(() => import("./VideoModal"));

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shieldRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRef.current.x = x;
      targetRef.current.y = y;
    };
    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.12;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.12;
      const tx = currentRef.current.x * 14;
      const ty = currentRef.current.y * 12;
      if (shieldRef.current) {
        shieldRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      el.removeEventListener("pointermove", onMove as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
        {/* Subtle grid and background elements */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        {/* Ambient Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" 
          style={{ willChange: "transform" }}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[160px] pointer-events-none" 
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-5xl mx-auto"
          >
            {/* Premium Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 glass-card-hover px-5 py-2.5 mb-10 text-[13px] font-bold tracking-widest text-primary-foreground/90 uppercase border-white/5"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-background bg-primary/40 backdrop-blur-sm" />
                ))}
              </div>
              <span className="ml-1">Trusted by 50,000+ privacy-first users</span>
            </motion.div>

            {/* Industrial Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white"
            >
              Protect Your <br />
              <span className="premium-gradient">Digital Privacy</span>
            </motion.h1>

            {/* World-Class Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-2xl text-white/50 max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
            >
              Stop sensitive data leaks before they reach the cloud. Our industrial-grade firewall 
              intercepts PII in real-time — keeping your secrets strictly local.
            </motion.p>

            {/* High-Impact CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
            >
              <a data-ripple href="#download" className="glow-button flex items-center gap-3 text-base px-10 py-5 rounded-2xl group min-w-[240px]">
                <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Add to Browser — Free</span>
              </a>
              <button
                onClick={() => setShowVideo(true)}
                data-ripple
                className="flex items-center gap-3 text-white/70 hover:text-white transition-all px-8 py-5 glass-card-hover rounded-2xl cursor-pointer group min-w-[200px]"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                 Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Floating Visual Masterpiece */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mt-24 md:mt-32 flex justify-center perspective-1000"
          >
            <div className="relative group">
              {/* Outer Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/5 rounded-full -m-20 pointer-events-none"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/5 border-dashed rounded-full -m-32 pointer-events-none"
              />

              {/* Central Shield Visual */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateX: [0, 5, 0],
                  rotateY: [0, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-56 h-56 md:w-80 md:h-80 rounded-[3rem] bg-gradient-to-br from-white/10 via-primary/5 to-transparent flex items-center justify-center backdrop-blur-lg border border-white/10 shadow-[0_40px_100px_-20px_rgba(33,28,68,0.6)] group-hover:border-primary/30 transition-colors duration-700">
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2rem] bg-card/60 flex items-center justify-center border border-white/5 overflow-hidden relative shadow-inner">
                    <img loading="eager" decoding="sync" src="/logo.jpg" alt="PrivacyGuard AI Logo" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
                  </div>
                </div>

                {/* Floating Orbitals */}
                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-6 -right-6 w-14 h-14 glass-card-hover flex items-center justify-center text-primary shadow-xl">
                  <Lock className="w-6 h-6" />
                </motion.div>
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -bottom-10 -left-6 w-14 h-14 glass-card-hover flex items-center justify-center text-accent shadow-xl">
                  <Fingerprint className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={null}>
        <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
      </Suspense>
    </>
  );
};

export default HeroSection;
