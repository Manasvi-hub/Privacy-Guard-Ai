import { motion } from "framer-motion";
import { Shield, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-purple/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 text-sm text-muted-foreground"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
            Now protecting 50,000+ users worldwide
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Your AI Privacy{" "}
            <span className="glow-text">Firewall</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Prevent sensitive data leaks before they happen. PrivacyGuard intercepts, 
            detects, and redacts private information in real-time — directly in your browser.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#download" className="glow-button flex items-center gap-2 text-base px-8 py-4 rounded-xl">
              <Shield className="w-5 h-5" />
              Add to Chrome — Free
            </a>
            <a
              href="#demo"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-6 py-4 glass-card rounded-xl hover:border-muted-foreground/30"
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </a>
          </motion.div>
        </div>

        {/* Floating shield visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary/20 via-glow-purple/10 to-transparent flex items-center justify-center animate-float">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-primary/30 to-glow-purple/20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                <Shield className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            {/* Data flow lines */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 w-1 h-20 md:h-28 origin-bottom"
                style={{ transform: `rotate(${deg}deg) translateY(-80px)` }}
              >
                <div className="w-0.5 h-full bg-gradient-to-t from-primary/40 to-transparent mx-auto animate-pulse-glow" style={{ animationDelay: `${deg * 5}ms` }} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
