import { motion } from "framer-motion";
import { Cpu, DatabaseZap, ShieldCheck } from "lucide-react";

const items = [
  { icon: Cpu, label: "100% Local Processing", desc: "All detection runs in your browser" },
  { icon: DatabaseZap, label: "Zero Data Storage", desc: "Nothing leaves your device" },
  { icon: ShieldCheck, label: "GDPR / HIPAA Ready", desc: "Enterprise compliance built-in" },
];

const TrustBar = () => (
  <section className="relative z-10 pb-8">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="glass-card p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-white/5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-5 md:justify-center md:px-8 group cursor-default"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all duration-500 group-hover:rotate-6">
              <item.icon className="w-7 h-7 text-primary transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div>
              <p className="font-black text-sm text-white tracking-tight">{item.label}</p>
              <p className="text-xs text-white/40 font-medium">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustBar;
