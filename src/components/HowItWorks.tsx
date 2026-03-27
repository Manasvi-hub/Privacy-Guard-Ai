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

  return (
    <section id="how-it-works" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Four steps to{" "}
            <span className="text-muted-foreground">total privacy</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Step indicators */}
          <div className="grid grid-cols-4 gap-2 mb-8 relative">
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/50 rounded-full hidden md:block">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {steps.map((step, i) => (
              <motion.button
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={`text-center relative pb-6 group cursor-pointer transition-all duration-300 ${
                  i <= activeStep ? "opacity-100" : "opacity-50"
                }`}
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center relative z-10 transition-all duration-300 ${
                    i === activeStep
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "glass-card group-hover:border-primary/30"
                  }`}
                >
                  <step.icon className={`w-6 h-6 md:w-7 md:h-7 ${i === activeStep ? "text-primary-foreground" : "text-primary"}`} />
                  <span
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      i === activeStep
                        ? "bg-foreground text-background"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className={`font-semibold text-sm md:text-base transition-colors ${i === activeStep ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.title}
                </h3>
              </motion.button>
            ))}
          </div>

          {/* Active step detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  {(() => {
                    const Icon = steps[activeStep].icon;
                    return <Icon className="w-7 h-7 text-primary" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    Step {activeStep + 1}: {steps[activeStep].title}
                  </h3>
                  <p className="text-muted-foreground mb-3">{steps[activeStep].desc}</p>
                  <p className="text-sm text-muted-foreground/80 italic">{steps[activeStep].detail}</p>
                </div>
                {activeStep < steps.length - 1 && (
                  <button
                    onClick={() => setActiveStep((s) => s + 1)}
                    className="glow-button flex items-center gap-1 px-4 py-2 rounded-lg text-sm shrink-0"
                  >
                    Next <ChevronRight className="w-4 h-4" />
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
