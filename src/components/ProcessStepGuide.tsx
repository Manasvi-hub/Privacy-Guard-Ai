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
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

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
    <section id="process-guide" className="section-padding py-40 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-32">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white uppercase italic">
          4 Step Guide For Extension Installation
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
          Follow our visually-guided installation sequence to manually load the extension bundle.
        </p>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative px-4 min-h-[600px] flex items-center">
        {/* Desktop Sinusoidal Path (flowing through centers) */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <svg width="100%" height="100%" viewBox="0 0 1000 400" fill="none" className="overflow-visible">
            <motion.path
                d="M 50 100 C 150 100, 250 300, 375 300 S 500 100, 625 100 S 750 300, 875 300"
                stroke="url(#process-gradient)"
                strokeWidth="4"
                strokeDasharray="12 12"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-32 md:gap-0 w-full relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-start md:items-center h-full">
              
              {/* Desktop Layout (Image-matched alignment) */}
              <div className="hidden md:flex flex-col items-center w-full min-h-[400px] justify-center relative">
                
                {/* Numbered Marker (Circle) */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className={`w-14 h-14 rounded-full bg-secondary text-white font-black text-xl flex items-center justify-center shadow-[0_0_30px_rgba(var(--secondary),0.4)] z-20 absolute
                    ${step.position === 'top' ? 'top-[75px]' : 'top-[275px]'}`}
                >
                  {step.number}
                  <div className="absolute inset-0 bg-secondary blur-2xl opacity-40 animate-pulse rounded-full -z-10" />
                </motion.div>

                {/* Text Card (REVERSED alignment based on image) */}
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`absolute w-full max-w-[240px] z-30
                    ${step.position === 'top' ? 'top-[160px]' : 'bottom-[160px]'}`}
                >
                  <div className="glass-card-hover p-6 border-white/5 bg-black/70 backdrop-blur-2xl shadow-2xl rounded-2xl text-center">
                     <h3 className="text-base font-black text-white mb-2 leading-tight tracking-tight uppercase italic">{step.title}</h3>
                     <p className="text-[11px] text-muted-foreground/80 leading-relaxed font-bold">
                       {step.desc}
                     </p>
                  </div>
                </motion.div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col items-start pl-16">
                 <motion.div
                   initial={{ scale: 0, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   className="w-12 h-12 rounded-full bg-secondary text-white font-black flex items-center justify-center mb-6"
                 >
                   {step.number}
                 </motion.div>
                 <div className="glass-card p-6 border-white/10 bg-black/60 backdrop-blur-md rounded-xl">
                   <h3 className="text-lg font-bold text-white mb-2 uppercase">{step.title}</h3>
                   <p className="text-sm text-muted-foreground leading-relaxed font-medium">{step.desc}</p>
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
