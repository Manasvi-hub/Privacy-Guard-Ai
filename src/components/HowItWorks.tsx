import { motion } from "framer-motion";
import { MessageSquare, ScanSearch, UserCheck, Send } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Type Message", desc: "Write naturally in any AI chat" },
  { icon: ScanSearch, title: "AI Detects", desc: "Sensitive data is flagged instantly" },
  { icon: UserCheck, title: "You Choose", desc: "Review, redact, or allow each item" },
  { icon: Send, title: "Safe Send", desc: "Message sent with data protected" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">How It Works</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Four steps to{" "}
          <span className="text-muted-foreground">total privacy</span>
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/40 via-glow-purple/40 to-primary/40" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-24 h-24 rounded-2xl glass-card mx-auto mb-5 flex items-center justify-center relative z-10 group hover:border-primary/30 transition-colors">
                <step.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
