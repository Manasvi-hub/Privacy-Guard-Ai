import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
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
                background: "rgba(30,27,75,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 16,
                fontWeight: 600,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 8,
                backdropFilter: "blur(10px)",
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </div>
          );
        })}
      </div>

      {/* Final Logo */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: "50%",
          transform: `translateX(-50%) scale(${titleScale})`,
          width: 120,
          height: 120,
          background: "black",
          backdropFilter: "blur(8px)",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          overflow: "hidden",
          opacity: titleOpacity,
        }}
      >
        <img
          src={staticFile("logo.jpg")}
          alt="Logo"
          style={{ width: "110%", height: "110%", objectFit: "cover" }}
        />
      </div>

      {/* Main title */}
      <div
        style={{
          textAlign: "center",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginTop: 180,
        }}
      >
        <h1
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -3,
            margin: 0,
            lineHeight: 1.1,
            textShadow: "0 10px 40px rgba(0,0,0,0.4)",
          }}
        >
          Privacy
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #11114D, #2D1B4B)",
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
        <p style={{ fontSize: 28, color: "rgba(255,255,255,0.8)", fontWeight: 400 }}>
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
            background: "linear-gradient(135deg, #f084c7, #6e5ac4)",
            fontSize: 20,
            fontWeight: 700,
            color: "white",
            transform: `scale(${logoPulse})`,
            boxShadow: "0 8px 30px rgba(240,132,199,0.4)",
          }}
        >
          Available now — Free
        </span>
      </div>
    </AbsoluteFill>
  );
};
