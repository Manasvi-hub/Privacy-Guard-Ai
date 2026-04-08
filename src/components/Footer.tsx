import { motion } from "framer-motion";
import { Github, Globe, Shield } from "lucide-react";

const Footer = () => (
  <footer className="relative overflow-hidden">
    {/* Top gradient divider */}
    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    
    <div className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-10"
        >
          {/* Brand */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <img loading="lazy" src="/logo.jpg" alt="PrivacyGuard AI Logo" className="w-12 h-12 rounded-2xl object-cover border border-white/10 shadow-xl" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <p className="font-black text-xl tracking-tighter text-white">
                PrivacyGuard <span className="text-white/40">AI</span>
              </p>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Industrial-Grade Privacy</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {[
              { label: "Privacy Policy", href: "#", icon: Shield },
              { label: "Terms", href: "#", icon: Globe },
              { label: "GitHub", href: "#", icon: Github },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 text-[12px] font-bold text-white/30 hover:text-white uppercase tracking-[0.15em] transition-all duration-300 group"
              >
                <link.icon className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-white/15 font-bold tracking-widest uppercase">
            © 2026 PrivacyGuard. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  </footer>
);

export default Footer;
