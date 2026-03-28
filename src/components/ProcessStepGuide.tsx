import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: 1,
    title: "Enable Developer Menu",
    desc: "Open Browser > Settings > Advanced. Check 'Show features for web developers'.",
    position: "top",
  },
  {
    number: 2,
    title: "Extract the ZIP",
    desc: "Locate 'extension.zip' and unzip it into a dedicated folder on your desktop.",
    position: "bottom",
  },
  {
    number: 3,
    title: "Load Unpacked",
    desc: "In Extensions page, click 'Load unpacked' and select the unzipped folder.",
    position: "top",
  },
  {
    number: 4,
    title: "Pin & Protect",
    desc: "Verify the PrivacyGuard icon appears and pin it for real-time monitoring.",
    position: "bottom",
  },
];

const ProcessStepGuide = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="process-guide" className="section-padding py-32 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
          4 Step <span className="text-secondary">Process</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow our visually-guided installation sequence to manually load the extension.
        </p>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative px-4 min-h-[500px] flex items-center">
        {/* Desktop S-Curve Path */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <svg width="100%" height="100%" viewBox="0 0 1000 400" fill="none" className="overflow-visible">
            <motion.path
                d="M 50 200 C 150 50, 350 50, 500 200 S 850 350, 950 200"
                stroke="url(#process-gradient)"
                strokeWidth="4"
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

        {/* Mobile Zigzag/Process Line (for mobile) */}
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-white/5 overflow-hidden">
          <motion.div 
            className="w-full bg-secondary origin-top"
            style={{ scaleY: scrollYProgress }}
          />
        </div>

        {/* Steps Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 w-full relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-start md:items-center">
              {/* Step Marker (Circle) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.4 }}
                className="w-12 h-12 rounded-full bg-secondary text-white font-bold flex items-center justify-center shadow-[0_0_20px_rgba(var(--secondary),0.4)] z-20 mb-6 md:mb-0 relative"
                style={{
                    left: '0',
                    top: step.position === 'top' ? '-1.5rem' : 'auto',
                    bottom: step.position === 'bottom' ? '-1.5rem' : 'auto'
                }}
              >
                {step.number}
                <div className="absolute inset-0 bg-secondary blur-lg opacity-40 animate-pulse rounded-full -z-10" />
              </motion.div>

              {/* Step Info */}
              <motion.div
                initial={{ opacity: 0, y: step.position === 'top' ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.6 }}
                className={`flex flex-col items-start md:items-center text-left md:text-center max-w-[200px] 
                    ${step.position === 'top' ? 'md:-translate-y-40' : 'md:translate-y-40'}
                    md:absolute`}
              >
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic md:not-italic font-medium">
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepGuide;
