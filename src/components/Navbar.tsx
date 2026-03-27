const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/40 backdrop-blur-xl border-b border-white/10 rounded-none">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="PrivacyGuard AI Logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-bold text-lg text-foreground">PrivacyGuard AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
          <a href="#demo" className="hover:text-foreground transition-colors">Demo</a>
          <a href="#download" className="hover:text-foreground transition-colors">Download</a>
        </div>
        <a href="#download" className="glow-button text-sm px-4 py-2 rounded-lg">Get Started</a>
      </div>
    </nav>
  );
};

export default Navbar;
