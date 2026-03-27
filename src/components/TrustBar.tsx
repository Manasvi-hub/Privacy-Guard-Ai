import { motion } from "framer-motion";
import { Cpu, DatabaseZap, ShieldCheck } from "lucide-react";

const items = [
  { icon: Cpu, label: "Local-first Processing", desc: "All detection runs in your browser" },
  { icon: DatabaseZap, label: "Zero Data Storage", desc: "Nothing leaves your device" },
  { icon: ShieldCheck, label: "GDPR / HIPAA Ready", desc: "Enterprise compliance built-in" },
];

const TrustBar = () => (
  <section className="relative z-10 -mt-8">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-border"
      >
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-4 md:justify-center md:px-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustBar;
