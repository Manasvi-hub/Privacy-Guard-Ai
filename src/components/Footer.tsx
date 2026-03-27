

const Footer = () => (
  <footer className="border-t border-white/30 py-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src="/logo.jpg" alt="PrivacyGuard AI Logo" className="w-6 h-6 rounded-md object-cover" />
        <span className="font-semibold text-foreground underline-offset-4 decoration-primary/30">PrivacyGuard AI</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
      </div>
      <p className="text-xs text-muted-foreground">© 2026 PrivacyGuard. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
