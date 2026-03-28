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
    // Adjust offset so the animation finishes while the component is still in the middle of the screen
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Map the smooth progress so the path reaches 100% (1.0) before the scroll is finished
  const pathLength = useTransform(smoothProgress, [0, 0.9], [0, 1]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="process-guide" className="section-padding py-32 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white capitalize">
          4 Step Guide For Extension Installation
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
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-white/5 overflow-hidden rounded-full font-bold">
          <motion.div 
            className="w-full bg-secondary origin-top"
            style={{ scaleY: smoothProgress }}
          />
        </div>

        {/* Steps Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 md:gap-0 w-full relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-start md:items-center h-full">
              
              {/* Desktop Layout */}
              <div className="hidden md:flex flex-col items-center w-full min-h-[500px] justify-center relative">
                
                {/* Text Card */}
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`absolute w-full max-w-[220px] z-30
                    ${step.position === 'top' ? 'bottom-[280px]' : 'top-[280px]'}`}
                >
                  <div className="glass-card p-5 border-white/10 hover:border-secondary/40 transition-all bg-black/60 backdrop-blur-xl shadow-2xl rounded-2xl">
                     <h3 className="text-lg font-bold text-white mb-3 leading-tight tracking-tight">{step.title}</h3>
                     <p className="text-[12px] text-muted-foreground/90 leading-relaxed font-bold">
                       {step.desc}
                     </p>
                  </div>
                </motion.div>

                {/* Numbered Marker */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="w-16 h-16 rounded-full bg-secondary text-white font-black text-xl flex items-center justify-center shadow-[0_0_40px_rgba(var(--secondary),0.4)] z-20 relative border-4 border-black/20"
                >
                  {step.number}
                  <div className="absolute inset-0 bg-secondary blur-2xl opacity-40 animate-pulse rounded-full -z-10" />
                </motion.div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col items-start pl-16">
                 <motion.div
                   initial={{ scale: 0, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   className="w-12 h-12 rounded-full bg-secondary text-white font-black flex items-center justify-center mb-4"
                 >
                   {step.number}
                 </motion.div>
                 <div className="glass-card p-4 border-white/10 bg-black/40 backdrop-blur-md">
                   <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                   <p className="text-sm text-muted-foreground leading-relaxed font-bold">{step.desc}</p>
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
