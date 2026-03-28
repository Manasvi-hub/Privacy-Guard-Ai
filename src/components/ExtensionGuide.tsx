import { motion } from "framer-motion";
import { ArrowRight, Settings, FolderOpen, PackageOpen, Pin } from "lucide-react";

const steps = [
  {
    icon: Settings,
    title: "1. Enable Developer Mode",
    desc: "Open your browser settings, go to the Extensions page, and toggle the 'Developer mode' switch in the top right corner.",
  },
  {
    icon: FolderOpen,
    title: "2. Extract the ZIP",
    desc: "Locate the downloaded 'extension.zip' file and unzip it into a folder that you can easily access.",
  },
  {
    icon: PackageOpen,
    title: "3. Load Unpacked",
    desc: "In the Extensions page, click 'Load unpacked' and select the folder you just extracted.",
  },
  {
    icon: Pin,
    title: "4. Confirm & Pin",
    desc: "The PrivacyGuard AI icon should now appear in your browser's toolbar. Pin it for quick access to privacy features.",
  },
];

const ExtensionGuide = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section id="extension-guide" className="section-padding py-24 bg-black/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Installation <span className="text-muted-foreground">Guide</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to secure your browser? Follow these simple steps to manually install the PrivacyGuard AI extension from the ZIP download.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
        >
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center group">
              {/* Step Card */}
              <motion.div
                variants={itemVariants}
                className="glass-card-hover p-6 text-center w-full z-10 min-h-[220px] flex flex-col justify-center border-white/5 hover:border-primary/20"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-primary shadow-glow" />
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground/80 leading-relaxed font-medium">{step.desc}</p>
              </motion.div>

              {/* Glowing Arrow (Desktop only) */}
              {index < steps.length - 1 && (
                <motion.div
                  variants={arrowVariants}
                  className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20"
                >
                  <ArrowRight className="w-8 h-8 text-primary/40 animate-pulse drop-shadow-[0_0_8px_hsl(var(--primary))]" />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExtensionGuide;
