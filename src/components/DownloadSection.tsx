import { motion } from "framer-motion";
import { Monitor, Terminal, Smartphone } from "lucide-react";

const platforms = [
  {
    icon: Monitor,
    name: "Windows",
    desc: "Windows 10+ supported",
    available: true,
    href: "#",
    cta: "Download for Windows",
  },
  {
    icon: Terminal,
    name: "Linux",
    desc: "Ubuntu, Fedora, Arch",
    available: true,
    href: "#",
    cta: "Download for Linux",
  },
  {
    icon: Smartphone,
    name: "iOS",
    desc: "iPhone & iPad",
    available: false,
    href: "#",
    cta: "Coming Soon",
  },
];

const DownloadSection = () => (
  <section id="download" className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">Download</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Get protected <span className="text-muted-foreground">today</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <a
              href={p.available ? p.href : undefined}
              className={`glass-card-hover p-8 text-center block ${!p.available ? "opacity-50 pointer-events-none" : ""}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <p.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{p.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{p.desc}</p>
              <span className={`text-sm font-medium ${p.available ? "text-primary" : "text-muted-foreground"}`}>
                {p.cta} →
              </span>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DownloadSection;
