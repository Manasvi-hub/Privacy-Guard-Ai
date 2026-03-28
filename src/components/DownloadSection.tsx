import { motion } from "framer-motion";
import { Chrome, Shield, Globe, Compass, Layout } from "lucide-react";

const platforms = [
  { name: "Chrome", icon: Chrome, href: "/extension.zip", available: true, cta: "Download ZIP" },
  { name: "Edge", icon: Shield, href: "/extension.zip", available: true, cta: "Download ZIP" },
  { name: "Firefox", icon: Globe, href: "/extension.zip", available: true, cta: "Download ZIP" },
  { name: "Opera", icon: Compass, href: "/extension.zip", available: true, cta: "Download ZIP" },
  { name: "Safari", icon: Layout, href: "/extension.zip", available: true, cta: "Download ZIP" },
];

const DownloadSection = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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
          {platforms.map((browser, i) => (
            <motion.a
              key={browser.name}
              href={browser.href}
              variants={itemVariants}
              className="glass-card-hover p-8 flex flex-col items-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/5 relative z-10">
                <browser.icon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-black text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors relative z-10 text-center">
                {browser.name}
              </h3>
              <div className="mt-4 text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                Download ZIP
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
