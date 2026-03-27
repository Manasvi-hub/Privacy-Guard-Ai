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

const FeaturesSection = () => (
  <section id="features" className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">Features</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Enterprise-grade protection,{" "}
          <span className="text-muted-foreground">zero complexity</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-8 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
