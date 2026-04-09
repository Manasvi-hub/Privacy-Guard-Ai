import { motion } from "framer-motion";
import { Chrome, Edge, Firefox, Opera, Safari } from "./brandIcons";
import STORE_LINKS from "@/config/storeLinks";

// Animation config: tweak these values to adjust entrance stagger and pop intensity
const ANIM = {
  stagger: 0.10,
  initialDelay: 0,
  duration: 0.7,
  popStart: 0.96,
  popEnd: 1,
  popDuration: 0.7,
  hoverLift: -8,
  hoverScale: 1.03,
  tapScale: 0.985,
  spring: { type: "spring", stiffness: 320, damping: 28 },
};

const platforms = [
  { name: "Chrome", icon: Chrome, href: STORE_LINKS.chrome || "/extension.zip", available: true, cta: STORE_LINKS.chrome ? "Open on Chrome Web Store" : "Download ZIP" },
  { name: "Edge", icon: Edge, href: STORE_LINKS.edge || "/extension.zip", available: true, cta: STORE_LINKS.edge ? "Open on Edge Add-ons" : "Download ZIP" },
  { name: "Firefox", icon: Firefox, href: STORE_LINKS.firefox || "/extension.zip", available: true, cta: STORE_LINKS.firefox ? "Open on Firefox Add-ons" : "Download ZIP" },
  { name: "Opera", icon: Opera, href: STORE_LINKS.opera || "/extension.zip", available: true, cta: STORE_LINKS.opera ? "Open on Opera Add-ons" : "Download ZIP" },
  { name: "Safari", icon: Safari, href: STORE_LINKS.safari || "/extension.zip", available: true, cta: STORE_LINKS.safari ? "Open on App Store" : "Download ZIP" },
];

const DownloadSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIM.stagger,
        delayChildren: ANIM.initialDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22, scale: ANIM.popStart },
    visible: {
      opacity: 1,
      y: 0,
      scale: ANIM.popEnd,
      transition: {
        duration: ANIM.popDuration,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section id="download" className="section-padding relative overflow-hidden bg-black/10">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <p className="text-primary text-[13px] font-bold tracking-[0.3em] uppercase mb-4">Get Started</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Available on your <br />
            <span className="premium-gradient">favorite browser</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto"
        >
          {platforms.map((browser, i) => {
            const isExternal = !!browser.href && browser.href.startsWith("http");
            return (
              <motion.a
                key={browser.name}
                href={browser.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                whileHover={{ y: ANIM.hoverLift, scale: ANIM.hoverScale }}
                whileTap={{ scale: ANIM.tapScale }}
                transition={ANIM.spring}
                className="glass-card-hover p-8 flex flex-col items-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {browser.name === 'Edge' && STORE_LINKS.edge && (
                    <span className="absolute top-3 right-3 z-20 text-[10px] px-2 py-1 bg-white/6 text-white rounded-full border border-white/8 pointer-events-none">Edge Add-ons</span>
                  )}
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/5 relative z-10">
                  <browser.icon className={`w-8 h-8 transition-transform ${browser.name === 'Edge' ? 'scale-110' : ''}`} />
                </div>
                <h3 className="font-black text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors relative z-10 text-center">
                  {browser.name}
                </h3>
                <div className="mt-4 text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                  {browser.cta}
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
