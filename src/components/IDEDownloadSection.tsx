import { motion } from "framer-motion";
import { Code, Cpu, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const idePlatforms = [
  {
    icon: Code,
    name: "VS Code",
    link: "https://marketplace.visualstudio.com/items?itemName=parth-dev.pii-blocker",
    desc: "Available on the VS Code Marketplace",
    type: "link" as const,
  },
  {
    icon: Cpu,
    name: "Antigravity",
    command: "antigravity install privacy-guard",
    desc: "Native integration for Antigravity AI",
    type: "command" as const,
  },
];

const IDECommandBox = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mt-4">
      <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-3 font-mono text-sm text-white/70 overflow-hidden group-hover:border-primary/30 transition-colors">
        <span className="truncate pr-8">{command}</span>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 p-2 hover:bg-white/10 rounded-md transition-colors text-white/40 hover:text-primary font-sans"
          title="Copy to clipboard"
        >
          {copied ? "✓" : "❐"}
        </button>
      </div>
    </div>
  );
};

const IDEDownloadSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="ide-install" className="section-padding relative overflow-hidden bg-black/5">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-24"
        >
          <p className="text-primary text-[13px] font-bold tracking-[0.3em] uppercase mb-4">Developer Tools</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Integrate with your <br />
            <span className="premium-gradient">IDE Workflow</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        >
          {idePlatforms.map((ide, i) => (
            <motion.div
              key={ide.name}
              variants={itemVariants}
              className="glass-card-hover p-10 flex flex-col group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex items-start justify-between mb-10 relative z-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:rotate-6">
                  <ide.icon className="w-8 h-8 text-primary transition-transform duration-500 group-hover:scale-110" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                  {ide.type === "link" ? "Marketplace" : "CLI tool"}
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-3 group-hover:glow-text transition-all duration-300">{ide.name}</h3>
              <p className="text-base text-white/50 mb-10 flex-grow font-medium leading-relaxed">{ide.desc}</p>
              
              <div className="mt-auto relative z-10">
                {ide.type === "command" ? (
                  <>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 font-black">Installation Script</p>
                    <IDECommandBox command={ide.command!} />
                  </>
                ) : (
                  <a
                    href={ide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button w-full flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <span className="relative z-10">View on Marketplace</span>
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IDEDownloadSection;
