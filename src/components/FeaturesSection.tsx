import { motion } from "framer-motion";
import { Zap, EyeOff, Cpu, SlidersHorizontal } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Interception",
    desc: "Instantly detects API keys, credit card numbers, SSNs, and other sensitive data as you type.",
  },
  {
    icon: EyeOff,
    title: "Smart Redaction",
    desc: "Automatically replaces sensitive information with safe placeholders before it reaches any AI.",
  },
  {
    icon: Cpu,
    title: "Local AI Detection",
    desc: "All processing happens in your browser. No cloud calls, no third-party servers, zero latency.",
  },
  {
    icon: SlidersHorizontal,
    title: "Full User Control",
    desc: "Review, edit, cancel, or allow any detected item. You're always in the driver's seat.",
  },
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-24"
        >
          <p className="text-primary text-[13px] font-bold tracking-[0.3em] uppercase mb-4">Core Capabilities</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Enterprise-grade protection, <br />
            <span className="premium-gradient">zero complexity</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="glass-card-hover p-10 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-500 group-hover:rotate-6">
                <f.icon className="w-8 h-8 text-primary transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:glow-text transition-all duration-300">{f.title}</h3>
              <p className="text-base text-white/50 leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
