import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Send } from "lucide-react";

const SENSITIVE_PATTERNS = [
  { regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, label: "Credit Card" },
  { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, label: "Email" },
  { regex: /\bsk[-_][A-Za-z0-9]{20,}\b/g, label: "API Key" },
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
      const matches = text.match(pattern.regex);
      if (matches) {
        detections.push(`${matches.length} ${pattern.label}${matches.length > 1 ? "s" : ""}`);
        redacted = redacted.replace(pattern.regex, (m) => "█".repeat(m.length));
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
    <section id="demo" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">Interactive Demo</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            See it in <span className="text-muted-foreground">action</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Type a message with sensitive data or try one of the examples below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {/* Chat window */}
          <div className="glass-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">PrivacyGuard Demo Chat</span>
              <span className="ml-auto text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Protected</span>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  Try typing sensitive data like a credit card number, email, or API key.
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-end">
                    <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-br-sm px-4 py-2.5 max-w-[85%]">
                      <p className="text-sm text-foreground">{msg.text}</p>
                    </div>
                  </div>
                  {msg.detections.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-start gap-2 bg-destructive/5 border border-destructive/20 rounded-xl p-3"
                    >
                      <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-destructive">Sensitive data detected</p>
                        <p className="text-xs text-muted-foreground">{msg.detections.join(", ")}</p>
                      </div>
                    </motion.div>
                  )}
                  {msg.detections.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex justify-end"
                    >
                      <div className="bg-primary/5 border border-primary/15 rounded-xl rounded-br-sm px-4 py-2.5 max-w-[85%]">
                        <p className="text-xs text-primary font-medium mb-1">✓ Redacted & Safe</p>
                        <p className="text-sm text-foreground">{msg.redacted}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              {isScanning && (
                <div className="flex items-center gap-2 text-primary text-sm">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Scanning for sensitive data...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message with sensitive data..."
                  className="flex-1 bg-accent rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
                />
                <button onClick={() => handleSend()} className="glow-button px-4 py-2.5 rounded-lg">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Example buttons */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {EXAMPLE_MESSAGES.map((msg, i) => (
              <button
                key={i}
                onClick={() => handleSend(msg)}
                className="text-xs text-muted-foreground hover:text-foreground glass-card px-3 py-1.5 hover:border-primary/20 transition-all cursor-pointer"
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
