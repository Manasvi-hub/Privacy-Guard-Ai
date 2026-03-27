import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

const ORIGINAL = "My credit card is 4242 4242 4242 4242 and email is john@secret.com";
const REDACTED = "My credit card is ████████████████████ and email is ████████████████";

export const Scene4Redaction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Redaction animation - sweep from left to right
  const redactProgress = interpolate(frame, [30, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Show the message transitioning from original to redacted
  const showRedacted = frame > 30;

  // Checkmark animation
  const checkAppear = frame > 100;
  const checkScale = checkAppear ? spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 120 } }) : 0;

  // Safe badge
  const safeOpacity = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const safeY = interpolate(frame, [120, 140], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Send animation
  const sendProgress = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sendY = interpolate(sendProgress, [0, 1], [0, -40]);
  const sendOpacity = interpolate(frame, [165, 180], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Step label */}
      <div style={{ position: "absolute", top: 80, width: "100%", textAlign: "center", opacity: labelOpacity }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: "#00b482", textTransform: "uppercase", letterSpacing: 3 }}>
          Steps 3 & 4
        </span>
        <h2 style={{ fontSize: 52, fontWeight: 700, color: "#1a2e1a", marginTop: 8 }}>
          Redact & send safely
        </h2>
      </div>

      {/* Card */}
      <div
        style={{
          width: 900,
          marginTop: 60,
          background: "rgba(255,255,255,0.7)",
          borderRadius: 20,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          padding: 40,
          transform: `translateY(${sendY}px)`,
          opacity: sendOpacity > 0 ? 1 : sendOpacity,
        }}
      >
        {/* Before / After labels */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#e74c3c", textTransform: "uppercase", letterSpacing: 2 }}>
            Original (Unsafe)
          </span>
        </div>

        {/* Original message with redaction overlay */}
        <div style={{ position: "relative", marginBottom: 30 }}>
          <div
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              color: "#1a2e1a",
              padding: "16px 20px",
              borderRadius: 12,
              background: "rgba(231,76,60,0.05)",
              border: "1px solid rgba(231,76,60,0.15)",
            }}
          >
            {showRedacted
              ? ORIGINAL.split("").map((char, i) => {
                  const isRedactedChar = REDACTED[i] === "█";
                  const charProgress = interpolate(
                    redactProgress,
                    [i / ORIGINAL.length, (i + 1) / ORIGINAL.length],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  const shouldRedact = isRedactedChar && charProgress > 0.5;

                  return (
                    <span
                      key={i}
                      style={{
                        color: shouldRedact ? "transparent" : "#1a2e1a",
                        background: shouldRedact ? "#1a2e1a" : "transparent",
                        borderRadius: 2,
                        transition: "none",
                      }}
                    >
                      {shouldRedact ? "█" : char}
                    </span>
                  );
                })
              : ORIGINAL}
          </div>
        </div>

        {/* Arrow */}
        {frame > 90 && (
          <div style={{ textAlign: "center", marginBottom: 20, opacity: interpolate(frame, [90, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00b482" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        )}

        {/* Redacted version */}
        {frame > 90 && (
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#00b482", textTransform: "uppercase", letterSpacing: 2, display: "block", marginBottom: 10 }}>
              Redacted (Safe) ✓
            </span>
            <div
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: "#1a2e1a",
                padding: "16px 20px",
                borderRadius: 12,
                background: "rgba(0,180,130,0.05)",
                border: "1px solid rgba(0,180,130,0.2)",
              }}
            >
              {REDACTED}
            </div>
          </div>
        )}

        {/* Checkmark */}
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#00b482",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${checkScale})`,
            boxShadow: "0 4px 20px rgba(0,180,130,0.4)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      {/* Safe badge */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          textAlign: "center",
          opacity: safeOpacity,
          transform: `translateY(${safeY}px)`,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: 50,
            background: "rgba(0,180,130,0.12)",
            border: "1px solid rgba(0,180,130,0.3)",
            fontSize: 16,
            fontWeight: 600,
            color: "#00805a",
          }}
        >
          ✅ Message sent securely — your data stays private
        </span>
      </div>
    </AbsoluteFill>
  );
};
