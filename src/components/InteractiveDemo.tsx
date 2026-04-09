import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Send, ShieldAlert, CheckCircle2 } from "lucide-react";

const SENSITIVE_PATTERNS = [
  { regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, label: "Credit Card" },
  // Match email case-insensitively and avoid stray '|' inside character class
  { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi, label: "Email" },
  // Allow underscores/hyphens and shorter API key tails for demo purposes
  { regex: /\bsk[-_][A-Za-z0-9_-]{16,}\b/gi, label: "API Key" },
  { regex: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g, label: "SSN" },
];

const EXAMPLE_MESSAGES = [
  "My credit card is 4242 4242 4242 4242 and my email is john@secret.com",
  "Here's my API key: sk-proj_abc123def456ghi789jkl",
  "My SSN is 123-45-6789, please help me file taxes",
];

const InteractiveDemo = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; redacted: string; detections: string[] }[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const redactText = (text: string) => {
    let redacted = text;
    const detections: string[] = [];
    for (const pattern of SENSITIVE_PATTERNS) {
      // Use a fresh RegExp instance to avoid stateful side-effects
      const re = new RegExp(pattern.regex.source, pattern.regex.flags);
      const matches = text.match(re);
      if (matches && matches.length > 0) {
        detections.push(`${matches.length} ${pattern.label}${matches.length > 1 ? "s" : ""}`);
        redacted = redacted.replace(re, (m) => "█".repeat(m.length));
      }
    }
    return { redacted, detections };
  };

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setIsScanning(true);

    setTimeout(() => {
      const { redacted, detections } = redactText(msg);
      setMessages((prev) => [...prev, { text: msg, redacted, detections }]);
      setIsScanning(false);
      setInput("");
    }, 800);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section id="demo" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <p className="text-primary text-[13px] font-bold tracking-[0.3em] uppercase mb-4">Live Playground</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            See it in <span className="premium-gradient">action</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mt-6 font-medium text-lg">
            Type a message with sensitive data or try one of the examples below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Chat window */}
          <div className="glass-card overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] relative group">
            {/* Ambient glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur-xl relative z-10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <img loading="lazy" src="/logo.jpg" alt="" className="w-5 h-5 rounded-lg object-cover border border-white/10" />
                <span className="text-sm font-bold text-white/80 tracking-tight">PrivacyGuard Terminal</span>
              </div>
              <span className="ml-auto text-[10px] text-primary bg-primary/10 px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] border border-primary/20">
                Live
              </span>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-6 relative z-10">
              {messages.length === 0 && (
                <div className="text-center text-white/30 text-sm py-12 font-medium">
                  <ShieldAlert className="w-8 h-8 mx-auto mb-4 text-white/10" />
                  Try typing sensitive data like a credit card number, email, or API key.
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className="space-y-3">
                  {/* User message */}
                  <div className="flex justify-end">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="bg-primary/80 backdrop-blur-sm rounded-3xl rounded-br-lg px-5 py-3 max-w-[85%] shadow-lg shadow-primary/20"
                    >
                      <p className="text-sm text-white font-medium leading-relaxed">{msg.text}</p>
                    </motion.div>
                  </div>

                  {/* Detection alert */}
                  {msg.detections.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="flex items-start gap-3 bg-red-500/5 border border-red-500/10 rounded-2xl p-4 backdrop-blur-sm"
                    >
                      <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-red-400 uppercase tracking-widest">Threat Detected</p>
                        <p className="text-xs text-white/40 mt-1 font-medium">{msg.detections.join(" · ")}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Safe redacted version */}
                  {msg.detections.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/3 border border-white/5 backdrop-blur-xl rounded-3xl rounded-bl-lg px-5 py-3 max-w-[85%]">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                          <p className="text-[10px] text-green-400 font-black uppercase tracking-[0.2em]">Redacted & Safe</p>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed font-mono">{msg.redacted}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 text-primary text-sm font-bold"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  <span className="tracking-wide">Scanning for sensitive data...</span>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/5 p-5 bg-black/20 backdrop-blur-xl relative z-10">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message with sensitive data..."
                  className="flex-1 bg-white/5 border border-white/5 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300 font-medium"
                />
                <button
                  onClick={() => handleSend()}
                  data-ripple
                  className="glow-button px-5 py-3.5 rounded-xl group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Example buttons */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {EXAMPLE_MESSAGES.map((msg, i) => (
              <button
                key={i}
                onClick={() => handleSend(msg)}
                data-ripple
                className="text-[11px] font-bold text-white/30 hover:text-white glass-card-hover px-5 py-2.5 transition-all cursor-pointer uppercase tracking-[0.15em]"
              >
                Example {i + 1}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
