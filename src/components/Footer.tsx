import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <span className="font-semibold text-foreground">PrivacyGuard AI</span>
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
