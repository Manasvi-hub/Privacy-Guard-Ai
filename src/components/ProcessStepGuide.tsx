import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: 1,
    title: "Enable Developer Menu",
    desc: "Browser > Settings > Advanced. Check 'Show features for web developers'.",
    position: "top" as const,
  },
  {
    number: 2,
    title: "Extract the ZIP",
    desc: "Unzip 'extension.zip' into a folder on your system.",
    position: "bottom" as const,
  },
  {
    number: 3,
    title: "Load Unpacked",
    desc: "Extensions page > 'Load unpacked' > Select the folder.",
    position: "top" as const,
  },
  {
    number: 4,
    title: "Pin & Protect",
    desc: "Confirm 'PrivacyGuard' icon and pin for active scanning.",
    position: "bottom" as const,
  },
];

const ProcessStepGuide = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out the scroll progress for a more professional feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="process-guide" className="section-padding py-32 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
          4 step guide for <span className="text-secondary text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">extension installation</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow our visually-guided installation sequence to manually load the extension bundle.
        </p>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative px-4 min-h-[600px] flex items-center">
        {/* Desktop S-Curve Path */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <svg width="100%" height="100%" viewBox="0 0 1000 400" fill="none" className="overflow-visible">
            <motion.path
                d="M 50 200 C 150 100, 350 100, 500 200 S 850 300, 950 200"
                stroke="url(#process-gradient)"
                strokeWidth="3"
                strokeDasharray="10 10"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength }}
            />
            <defs>
              <linearGradient id="process-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Mobile Process Line */}
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-white/5 overflow-hidden rounded-full">
          <motion.div 
            className="w-full bg-secondary origin-top"
            style={{ scaleY: smoothProgress }}
          />
        </div>

        {/* Steps Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-0 w-full relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-start md:items-center">
              {/* Step Marker (Circle) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="w-14 h-14 rounded-full bg-secondary text-white font-black flex items-center justify-center shadow-[0_0_30px_rgba(var(--secondary),0.3)] z-20 relative md:absolute md:top-1/2 md:-translate-y-1/2"
              >
                {step.number}
                <div className="absolute inset-0 bg-secondary blur-xl opacity-30 animate-pulse rounded-full -z-10" />
              </motion.div>

              {/* Step Info */}
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`flex flex-col items-start md:items-center text-left md:text-center max-w-[220px] pt-4 md:pt-0
                    ${step.position === 'top' ? 'md:-translate-y-48' : 'md:translate-y-48'}
                    md:absolute md:top-1/2 md:-mt-6`}
              >
                <div className="glass-card p-4 border-white/10 hover:border-secondary/30 transition-colors bg-black/40 backdrop-blur-md">
                   <h3 className="text-lg font-bold text-white mb-2 leading-tight">{step.title}</h3>
                   <p className="text-[11px] text-muted-foreground/80 leading-relaxed font-semibold">
                     {step.desc}
                   </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepGuide;
