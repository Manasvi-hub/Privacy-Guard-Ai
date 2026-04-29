import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { Edge } from "./brandIcons";
import STORE_LINKS from "@/config/storeLinks";

const EdgeAddonsSection = () => {
  const edgeUrl = STORE_LINKS.edge;

  if (!edgeUrl) return null;

  return (
    <section id="edge-addons" className="section-padding relative overflow-hidden bg-black/8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card p-8 md:p-10 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-400/5 pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative z-10">
              <div className="flex items-start gap-5 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-white/6 flex items-center justify-center border border-white/10 shrink-0">
                  <Edge className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-green-300 bg-green-400/10 border border-green-400/20 rounded-full px-3 py-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Officially Live
                    </span>
                    <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Microsoft Edge Add-ons
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                      PrivacyGuard AI Protector is now live on the Microsoft Edge Add-ons store.
                    </h3>
                    <p className="text-white/55 mt-3 max-w-2xl leading-relaxed">
                      Users can install the extension directly from Microsoft&apos;s official store. This is the public listing they can trust and visit anytime.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  data-ripple
                  href={edgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-button inline-flex items-center justify-center gap-3 min-w-[220px]"
                >
                  <span>Visit Edge Add-ons</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <p className="text-[11px] text-white/35 font-medium text-center lg:text-left">
                  Public listing: microsoftedge.microsoft.com/addons/detail/hnebmchhddgnfiipdahanfenmjnhnlbh
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EdgeAddonsSection;