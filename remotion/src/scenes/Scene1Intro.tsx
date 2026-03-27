import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["400", "700", "800"], subsets: ["latin"] });

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shield icon scale + rotation
  const shieldScale = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const shieldRotate = interpolate(frame, [0, 60], [-10, 0], { extrapolateRight: "clamp" });

  // Title entrance
  const titleY = interpolate(spring({ frame: frame - 20, fps, config: { damping: 20 } }), [0, 1], [60, 0]);
  const titleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtitle
  const subOpacity = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY = interpolate(frame, [45, 70], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Badge
  const badgeOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeScale = spring({ frame: frame - 70, fps, config: { damping: 12 } });

  // Data stream lines
  const streamProgress = interpolate(frame, [30, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Exit fade
  const exitOpacity = interpolate(frame, [180, 210], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, fontFamily }}>
      {/* Data stream lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = i * 60;
        const len = streamProgress * 200;
        const x = 960 + Math.cos((angle * Math.PI) / 180) * len;
        const y = 400 + Math.sin((angle * Math.PI) / 180) * len;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 960,
              top: 400,
              width: 2,
              height: len,
              background: `linear-gradient(to bottom, rgba(0,180,130,${0.4 * streamProgress}), transparent)`,
              transformOrigin: "top center",
              transform: `rotate(${angle}deg)`,
            }}
          />
        );
      })}

      {/* Shield */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: "50%",
          transform: `translateX(-50%) scale(${shieldScale}) rotate(${shieldRotate}deg)`,
          width: 120,
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 24 24" width="120" height="140" fill="none" stroke="rgba(0,100,70,0.8)" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(0,180,130,0.15)" />
          <path d="M9 12l2 2 4-4" stroke="rgba(0,180,130,0.9)" strokeWidth="2" />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 460,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 82,
            fontWeight: 800,
            color: "#1a2e1a",
            letterSpacing: -2,
            margin: 0,
          }}
        >
          Your AI Privacy{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00b482, #5a8a30)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Firewall
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 580,
          width: "100%",
          textAlign: "center",
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        <p style={{ fontSize: 28, color: "#3a5a3a", fontWeight: 400, margin: 0 }}>
          Prevent sensitive data leaks before they happen
        </p>
      </div>

      {/* Badge */}
      <div
        style={{
          position: "absolute",
          top: 660,
          width: "100%",
          textAlign: "center",
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: 50,
            background: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(0,180,130,0.3)",
            fontSize: 16,
            color: "#2a4a2a",
            fontWeight: 600,
          }}
        >
          🛡️ Real-time protection for AI chats
        </span>
      </div>
    </AbsoluteFill>
  );
};
