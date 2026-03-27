import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

const MESSAGE = "My credit card is 4242 4242 4242 4242 and email is john@secret.com";

interface Detection {
  start: number;
  end: number;
  label: string;
  color: string;
}

const DETECTIONS: Detection[] = [
  { start: 18, end: 37, label: "Credit Card", color: "#e74c3c" },
  { start: 51, end: 66, label: "Email", color: "#e67e22" },
];

export const Scene3Detection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scanning animation
  const scanProgress = interpolate(frame, [20, 80], [0, MESSAGE.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scanLineX = interpolate(frame, [20, 80], [0, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Detection alerts appear
  const det1Appear = frame > 50;
  const det2Appear = frame > 70;
  const det1Scale = det1Appear ? spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 150 } }) : 0;
  const det2Scale = det2Appear ? spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 150 } }) : 0;

  // Alert banner
  const alertOpacity = interpolate(frame, [85, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alertShake = frame > 85 && frame < 100 ? Math.sin(frame * 2) * 3 : 0;

  return (
    <AbsoluteFill style={{ fontFamily, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Step label */}
      <div style={{ position: "absolute", top: 80, width: "100%", textAlign: "center", opacity: labelOpacity }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: "#f084c7", textTransform: "uppercase", letterSpacing: 3 }}>
          Step 2
        </span>
        <h2 style={{ fontSize: 52, fontWeight: 700, color: "#ffffff", marginTop: 8 }}>
          AI detects sensitive data
        </h2>
      </div>

      {/* Message with highlights */}
      <div
        style={{
          width: 900,
          marginTop: 60,
          background: "rgba(30,27,75,0.4)",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: 40,
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Scanning indicator */}
        {frame >= 20 && frame <= 80 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "rgba(240,132,199,0.1)",
            }}
          >
            <div
              style={{
                width: 100,
                height: "100%",
                background: "linear-gradient(90deg, transparent, #f084c7, transparent)",
                transform: `translateX(${scanLineX}px)`,
              }}
            />
          </div>
        )}

        {/* Scanning label */}
        {frame >= 20 && frame <= 85 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#f084c7",
                opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0.3,
              }}
            />
            <span style={{ fontSize: 14, color: "#f084c7", fontWeight: 600 }}>Scanning for sensitive data...</span>
          </div>
        )}

        {/* Message text with highlights */}
        <div style={{ fontSize: 20, lineHeight: 1.8, color: "#ffffff", position: "relative" }}>
          {MESSAGE.split("").map((char, i) => {
            const det = DETECTIONS.find((d) => i >= d.start && i < d.end);
            const isScanned = i < scanProgress;
            const isDetected = det && isScanned && ((det === DETECTIONS[0] && det1Appear) || (det === DETECTIONS[1] && det2Appear));

            return (
              <span
                key={i}
                style={{
                  background: isDetected ? `${det!.color}20` : "transparent",
                  borderBottom: isDetected ? `2px solid ${det!.color}` : "none",
                  padding: isDetected ? "2px 0" : 0,
                  position: "relative",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Detection badges */}
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          {DETECTIONS.map((det, i) => {
            const s = i === 0 ? det1Scale : det2Scale;
            return (
              <div
                key={det.label}
                style={{
                  transform: `scale(${s})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 12,
                  background: `${det.color}10`,
                  border: `1px solid ${det.color}30`,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={det.color} strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span style={{ fontSize: 14, fontWeight: 600, color: det.color }}>{det.label} Detected</span>
              </div>
            );
          })}
        </div>

        {/* Alert banner */}
        <div
          style={{
            marginTop: 20,
            padding: "14px 20px",
            borderRadius: 12,
            background: "rgba(231,76,60,0.08)",
            border: "1px solid rgba(231,76,60,0.2)",
            opacity: alertOpacity,
            transform: `translateX(${alertShake}px)`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>⚠️</span>
          <span style={{ fontSize: 15, color: "#c0392b", fontWeight: 600 }}>
            2 sensitive items found — action required before sending
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
