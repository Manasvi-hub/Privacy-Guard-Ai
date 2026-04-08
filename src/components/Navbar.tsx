import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-card/60 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl" 
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img loading="lazy" src="/logo.jpg" alt="PrivacyGuard AI Logo" className="w-10 h-10 rounded-xl object-cover relative z-10 border border-white/10 transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white group-hover:glow-text transition-all duration-300">
            PrivacyGuard <span className="text-white/60 group-hover:text-white transition-colors">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
          {["Features", "How it Works", "Demo", "Download"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="hover:text-white hover:glow-text active:scale-95 transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a data-ripple href="#download" className="glow-button text-[12px] py-2.5 px-6 rounded-full group overflow-hidden relative">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
