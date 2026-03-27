import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
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
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 960,
              top: 400,
              width: 2,
              height: len,
              background: `linear-gradient(to bottom, rgba(110,90,196,${0.4 * streamProgress}), transparent)`,
              transformOrigin: "top center",
              transform: `rotate(${angle}deg)`,
            }}
          />
        );
      })}

      {/* Center Logo Visual matches the black square look of the provided image */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: "50%",
          transform: `translateX(-50%) scale(${shieldScale}) rotate(${shieldRotate}deg)`,
          width: 256,
          height: 256,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, rgba(17, 17, 77, 0.2), rgba(110, 90, 196, 0.1), transparent)",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: 176,
            height: 176,
            background: "black",
            backdropFilter: "blur(12px)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <img src={staticFile("logo.jpg")} alt="Logo" style={{ width: "110%", height: "110%", objectFit: "cover" }} />
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 520,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -4,
            margin: 0,
            lineHeight: 1,
          }}
        >
          Your AI Privacy{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #11114D, #2D1B4B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "block",
              marginTop: 10
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
          top: 740,
          width: "100%",
          textAlign: "center",
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        <p style={{ fontSize: 24, color: "rgba(255, 255, 255, 0.8)", fontWeight: 400, margin: "0 auto", maxWidth: 700, lineHeight: 1.5 }}>
          Prevent sensitive data leaks before they happen. PrivacyGuard intercepts,
          detects, and redacts private information in real-time — directly in your browser.
        </p>
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: "absolute",
          top: 860,
          width: "100%",
          textAlign: "center",
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 32px",
            borderRadius: 12,
            background: "#11114D",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            fontSize: 18,
            color: "#ffffff",
            fontWeight: 600,
          }}
        >
          <img src={staticFile("logo.jpg")} alt="" style={{ width: 24, height: 24, borderRadius: 4 }} />
          Add to Chrome — Free
        </div>
      </div>
    </AbsoluteFill>
  );
};
