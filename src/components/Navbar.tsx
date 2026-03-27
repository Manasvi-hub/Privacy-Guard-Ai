import { Shield } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-foreground">PrivacyGuard</span>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
          <a href="#demo" className="hover:text-foreground transition-colors">Demo</a>
          <a href="#download" className="hover:text-foreground transition-colors">Download</a>
        </div>
        <a href="#download" className="glow-button text-sm px-4 py-2">Get Started</a>
      </div>
    </nav>
  );
};

export default Navbar;
