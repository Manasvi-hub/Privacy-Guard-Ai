import { motion } from "framer-motion";
import { Code, Cpu, Copy, Check, ExternalLink } from "lucide-react";
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
      <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-3 font-mono text-sm text-primary-foreground/80 overflow-hidden group-hover:border-primary/30 transition-colors">
        <span className="truncate pr-8">{command}</span>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 p-2 hover:bg-white/10 rounded-md transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
};

const IDEDownloadSection = () => (
  <section id="ide-install" className="section-padding pt-0">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Install for <span className="text-muted-foreground">IDE</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
            Bring PrivacyGuard AI directly into your development workflow with our official extensions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {idePlatforms.map((ide, i) => (
          <motion.div
            key={ide.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-8 text-left h-full flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ide.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-primary/60 px-2 py-1 bg-primary/5 rounded border border-primary/10">
                Extension
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2">{ide.name}</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-grow">{ide.desc}</p>
            
            <div className="mt-auto">
              {ide.type === "command" ? (
                <>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2 font-semibold">Install Command</p>
                  <IDECommandBox command={ide.command!} />
                </>
              ) : (
                <a
                  href={ide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-button w-full flex items-center justify-center gap-2 group"
                >
                  View on Marketplace
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default IDEDownloadSection;
