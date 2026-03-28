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
    title: "Extract The ZIP",
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
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathLength = useTransform(smoothProgress, [0, 0.9], [0, 1]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  };

  return (
    <section id="process-guide" className="section-padding bg-black/20 overflow-hidden relative">
      <div className="container mx-auto px-4 text-center mb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white leading-none">
            Installation <span className="premium-gradient">Workflow</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto font-medium text-lg">
            A precise, world-class sequence to manually integrate PrivacyGuard into your machine.
          </p>
        </motion.div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative px-4 min-h-[700px] flex items-center">
        {/* Desktop Sinusoidal Path */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <svg width="100%" height="100%" viewBox="0 0 1000 400" fill="none" className="overflow-visible">
            <motion.path
                d="M 50 100 C 150 100, 250 300, 375 300 S 500 100, 625 100 S 750 300, 875 300"
                stroke="url(#process-gradient)"
                strokeWidth="6"
                strokeDasharray="16 16"
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
            className="w-full bg-primary origin-top"
            style={{ scaleY: smoothProgress }}
          />
        </div>

        {/* Steps Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-40 md:gap-0 w-full relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-start md:items-center h-full">
              
              {/* Desktop Layout */}
              <div className="hidden md:flex flex-col items-center w-full min-h-[450px] justify-center relative">
                
                {/* Numbered Marker */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className={`w-16 h-16 rounded-3xl bg-primary text-white font-black text-2xl flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.3)] z-20 absolute border border-white/10
                    ${step.position === 'top' ? 'top-[60px]' : 'top-[280px]'}`}
                >
                  {step.number}
                  <div className="absolute inset-0 bg-primary blur-3xl opacity-30 animate-pulse rounded-full -z-10" />
                </motion.div>

                {/* Text Card */}
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`absolute w-full max-w-[260px] z-30
                    ${step.position === 'top' ? 'top-[160px]' : 'bottom-[160px]'}`}
                >
                  <div className="glass-card-hover p-8 border-white/5 bg-black/80 backdrop-blur-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[2rem] text-center group">
                     <h3 className="text-lg font-bold text-white mb-3 leading-tight tracking-tight group-hover:glow-text transition-all duration-300">{step.title}</h3>
                     <p className="text-[12px] text-white/50 leading-relaxed font-semibold">
                       {step.desc}
                     </p>
                  </div>
                </motion.div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col items-start pl-20">
                 <motion.div
                   initial={{ scale: 0, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   className="w-14 h-14 rounded-2xl bg-primary text-white font-black text-xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20"
                 >
                   {step.number}
                 </motion.div>
                 <div className="glass-card p-8 border-white/10 bg-black/60 backdrop-blur-2xl rounded-3xl">
                   <h3 className="text-xl font-bold text-white mb-3 leading-tight">{step.title}</h3>
                   <p className="text-base text-white/50 leading-relaxed font-medium">{step.desc}</p>
                 </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepGuide;
