import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ScanSearch, UserCheck, Send, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Type Message",
    desc: "Write naturally in any AI chat — PrivacyGuard runs silently in the background.",
    detail: "Works with ChatGPT, Claude, Gemini, and any web-based AI assistant.",
  },
  {
    icon: ScanSearch,
    title: "AI Detects",
    desc: "Sensitive data like API keys, emails, and SSNs are flagged instantly.",
    detail: "Local ML model scans text in real-time with zero network calls.",
  },
  {
    icon: UserCheck,
    title: "You Choose",
    desc: "Review each detection — redact, edit, or allow on a case-by-case basis.",
    detail: "Full control over what gets shared. Nothing is blocked without your approval.",
  },
  {
    icon: Send,
    title: "Safe Send",
    desc: "Your message is sent with all sensitive data safely protected.",
    detail: "The AI receives a clean message while your real data stays private.",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

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
    <section id="how-it-works" className="section-padding relative overflow-hidden bg-black/10">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <p className="text-primary text-[13px] font-bold tracking-[0.3em] uppercase mb-4">The Process</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Four steps to <br />
            <span className="premium-gradient">Total Privacy Control</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Step indicators */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 relative"
          >
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 -translate-y-1/2 hidden md:block z-0" />

            {steps.map((step, i) => (
              <motion.button
                key={step.title}
                variants={itemVariants}
                onClick={() => setActiveStep(i)}
                className={`text-left md:text-center relative group cursor-pointer transition-all duration-500 ${
                  i === activeStep ? "scale-105" : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                }`}
              >
                <div
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center relative z-10 transition-all duration-500 ${
                    i === activeStep
                      ? "bg-primary text-white shadow-[0_20px_40px_rgba(var(--primary),0.3)] border border-white/20"
                      : "glass-card-hover border-white/5"
                  }`}
                >
                  <step.icon className={`w-8 h-8 transition-transform duration-500 group-hover:scale-110 ${i === activeStep ? "text-white" : "text-primary"}`} />
                  <span
                    className={`absolute -top-3 -right-3 w-8 h-8 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-background z-20 ${
                      i === activeStep
                        ? "bg-white text-primary"
                        : "bg-primary text-white"
                    }`}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3 className={`font-black text-xs uppercase tracking-widest transition-colors text-center ${i === activeStep ? "text-white" : "text-white/40"}`}>
                  {step.title}
                </h3>
              </motion.button>
            ))}
          </motion.div>

          {/* Active step detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card-hover p-10 md:p-14 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
                <div className="w-20 h-20 rounded-[2rem] bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20 shadow-inner">
                  {(() => {
                    const Icon = steps[activeStep].icon;
                    return <Icon className="w-10 h-10 text-primary" />;
                  })()}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-primary text-[10px] uppercase font-black tracking-widest mb-2 block">Phase 0{activeStep + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/60 mb-6 font-medium leading-relaxed max-w-2xl">
                    {steps[activeStep].desc}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[12px] font-bold text-white/40">
                    <ChevronRight className="w-3 h-3 text-primary" />
                    {steps[activeStep].detail}
                  </div>
                </div>
                {activeStep < steps.length - 1 && (
                  <button
                    onClick={() => setActiveStep((s) => s + 1)}
                    className="glow-button flex items-center gap-2 px-8 py-4 rounded-2xl text-sm shrink-0 uppercase tracking-widest font-black self-center md:self-start group"
                  >
                    Proceed <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
