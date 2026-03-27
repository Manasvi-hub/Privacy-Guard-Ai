import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });

const MESSAGE = "My credit card is 4242 4242 4242 4242 and email is john@secret.com";

export const Scene2Typing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Chat UI entrance
  const chatScale = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const chatOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Typewriter effect
  const charsToShow = Math.min(
    Math.floor(interpolate(frame, [30, 140], [0, MESSAGE.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })),
    MESSAGE.length
  );
  const typedText = MESSAGE.slice(0, charsToShow);

  // Cursor blink
  const cursorOpacity = Math.sin(frame * 0.3) > 0 ? 1 : 0;

  // Label
  const labelOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Step label */}
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          opacity: labelOpacity,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600, color: "#00b482", textTransform: "uppercase", letterSpacing: 3 }}>
          Step 1
        </span>
        <h2 style={{ fontSize: 52, fontWeight: 700, color: "#1a2e1a", marginTop: 8 }}>
          User types a message
        </h2>
      </div>

      {/* Chat window */}
      <div
        style={{
          width: 900,
          marginTop: 80,
          opacity: chatOpacity,
          transform: `scale(${chatScale})`,
          background: "rgba(30,27,75,0.4)",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          overflow: "hidden",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ marginLeft: 12, fontSize: 14, fontWeight: 500, color: "#555" }}>AI Chat Assistant</span>
        </div>

        {/* Message area */}
        <div style={{ padding: 30, minHeight: 200 }}>
          {/* AI message */}
          <div style={{ display: "flex", marginBottom: 20 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "16px 16px 16px 4px",
                padding: "14px 20px",
                maxWidth: 500,
                fontSize: 16,
                color: "#ffffff",
              }}
            >
              How can I help you today?
            </div>
          </div>

          {/* User message */}
          {charsToShow > 0 && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #6e5ac4, #6452b3)",
                  borderRadius: "16px 16px 4px 16px",
                  padding: "14px 20px",
                  maxWidth: 600,
                  fontSize: 16,
                  color: "#ffffff",
                  lineHeight: 1.5,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
              >
                {typedText}
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 18,
                    background: "#f084c7",
                    marginLeft: 2,
                    opacity: cursorOpacity,
                    verticalAlign: "text-bottom",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 40,
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "#f084c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
