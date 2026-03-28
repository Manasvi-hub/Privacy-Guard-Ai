import { motion, useScroll, useTransform } from "framer-motion";
import { Settings, FolderOpen, PackageOpen, Pin } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: Settings,
    title: "Enable Developer Mode",
    desc: "Open your browser settings, go to the Extensions page, and toggle the 'Developer mode' switch.",
  },
  {
    number: "02",
    icon: FolderOpen,
    title: "Extract the ZIP",
    desc: "Locate 'extension.zip' and unzip it into a folder you can easily access later.",
  },
  {
    number: "03",
    icon: PackageOpen,
    title: "Load Unpacked",
    desc: "Click 'Load unpacked' and select the folder you just extracted from the ZIP.",
  },
  {
    number: "04",
    icon: Pin,
    title: "Confirm & Pin",
    desc: "The icon will appear in your toolbar. Pin it for quick access to your privacy vault.",
  },
];

const ExtensionGuide = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section id="extension-guide" className="section-padding py-32 bg-black/10 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Workflow</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white leading-none">
            Installation <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Simplified</span>
          </h2>
          <p className="text-muted-foreground/60 max-w-xl mx-auto text-sm md:text-base font-medium">
            Follow our professional onboarding sequence to get protected in under 60 seconds.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Connecting SVG Path (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 z-0">
            <svg width="100%" height="100%" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M 50 50 C 150 50, 200 80, 250 50 S 350 20, 450 50 S 550 80, 650 50 S 750 20, 850 50 S 950 80, 1000 50"
                stroke="url(#glow-gradient)"
                strokeWidth="2"
                strokeDasharray="8 12"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative group h-full"
              >
                {/* Watermark Number */}
                <span className="absolute -top-10 -left-4 text-8xl font-black text-white/5 select-none transition-all group-hover:text-primary/10 group-hover:-translate-y-2 duration-500">
                  {step.number}
                </span>

                <div className="glass-card-hover p-8 md:p-6 text-left h-full flex flex-col items-center md:items-start border-white/5 hover:border-primary/30 transition-all duration-500 group">
                  <div className="w-20 h-20 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    <step.icon className="w-8 h-8 md:w-6 md:h-6 text-primary relative z-10" />
                  </div>
                  
                  <h3 className="text-xl md:text-lg font-bold text-white mb-3 text-center md:text-left leading-tight tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-center md:text-left text-muted-foreground/70 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtensionGuide;
