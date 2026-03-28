import { motion } from "framer-motion";
import { Chrome, Compass, Flame, Globe, CircleDot } from "lucide-react";

/**
 * Update the href to "/extension.zip" for all browsers as requested.
 * This file is served from the public/ directory.
 */
const platforms = [
  {
    icon: Chrome,
    name: "Chrome",
    desc: "Direct ZIP Download",
    available: true,
    href: "/extension.zip",
    cta: "Download Zip",
  },
  {
    icon: Globe,
    name: "Edge",
    desc: "Direct ZIP Download",
    available: true,
    href: "/extension.zip",
    cta: "Download Zip",
  },
  {
    icon: Flame,
    name: "Firefox",
    desc: "Direct ZIP Download",
    available: true,
    href: "/extension.zip",
    cta: "Download Zip",
  },
  {
    icon: CircleDot,
    name: "Opera",
    desc: "Direct ZIP Download",
    available: true,
    href: "/extension.zip",
    cta: "Download Zip",
  },
  {
    icon: Compass,
    name: "Safari",
    desc: "Direct ZIP Download",
    available: true,
    href: "/extension.zip",
    cta: "Download Zip",
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
        <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">Extensions</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Download our <span className="text-muted-foreground">browser extension</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Our extension is currently in review on the web stores. You can download and install it manually via ZIP in the meantime.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="h-full"
          >
            <a
              href={p.available ? p.href : undefined}
              download="extension.zip"
              className={`glass-card-hover p-6 text-center flex flex-col h-full ${!p.available ? "opacity-50 pointer-events-none" : ""}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 shrink-0">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 text-base">{p.name}</h3>
              <p className="text-[10px] text-muted-foreground mb-4 flex-grow">{p.desc}</p>
              <div className="glow-button text-xs py-2 px-3 mt-auto">
                {p.available ? p.cta : "Coming Soon"}
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DownloadSection;
