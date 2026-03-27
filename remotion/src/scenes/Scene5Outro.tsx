import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["400", "600", "700", "800"], subsets: ["latin"] });

const FEATURES = [
  { icon: "⚡", label: "Real-Time" },
  { icon: "🔒", label: "Local AI" },
  { icon: "🛡️", label: "Zero Storage" },
  { icon: "✅", label: "GDPR Ready" },
];

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Logo breathing
  const logoPulse = 1 + Math.sin(frame * 0.05) * 0.03;

  return (
    <AbsoluteFill style={{ fontFamily, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Features pills */}
      <div style={{ position: "absolute", top: 200, display: "flex", gap: 16, justifyContent: "center", width: "100%" }}>
        {FEATURES.map((f, i) => {
          const s = spring({ frame: frame - i * 8, fps, config: { damping: 15 } });
          return (
            <div
              key={f.label}
              style={{
                transform: `scale(${s})`,
                padding: "12px 24px",
                borderRadius: 50,
                background: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(0,180,130,0.2)",
                fontSize: 16,
                fontWeight: 600,
                color: "#2a4a2a",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </div>
          );
        })}
      </div>

      {/* Main title */}
      <div
        style={{
          textAlign: "center",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <h1
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: "#1a2e1a",
            letterSpacing: -3,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Privacy
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00b482, #5a8a30)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Guard AI
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          width: "100%",
          textAlign: "center",
          opacity: subtitleOpacity,
        }}
      >
        <p style={{ fontSize: 28, color: "#3a5a3a", fontWeight: 400 }}>
          Protect your data. Use AI freely.
        </p>
      </div>

      {/* CTA-like badge */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          width: "100%",
          textAlign: "center",
          opacity: subtitleOpacity,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "16px 40px",
            borderRadius: 16,
            background: "linear-gradient(135deg, #00b482, #5a8a30)",
            fontSize: 20,
            fontWeight: 700,
            color: "white",
            transform: `scale(${logoPulse})`,
            boxShadow: "0 8px 30px rgba(0,180,130,0.3)",
          }}
        >
          Available now — Free
        </span>
      </div>
    </AbsoluteFill>
  );
};
