import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Typing } from "./scenes/Scene2Typing";
import { Scene3Detection } from "./scenes/Scene3Detection";
import { Scene4Redaction } from "./scenes/Scene4Redaction";
import { Scene5Outro } from "./scenes/Scene5Outro";

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Persistent animated gradient background
  const gradAngle = interpolate(frame, [0, 900], [135, 225]);
  const bg = `linear-gradient(${gradAngle}deg, #B6F6E8 0%, #80A345 40%, #5a8a30 70%, #B6F6E8 100%)`;

  // Subtle grid overlay opacity
  const gridOpacity = interpolate(frame, [0, 30], [0, 0.06], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: bg }}>
      {/* Grid overlay */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating accent orbs */}
      <FloatingOrbs frame={frame} />

      {/* Scenes */}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene1Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={200}>
          <Scene2Typing />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={200}>
          <Scene3Detection />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={200}>
          <Scene4Redaction />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene5Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

const FloatingOrbs: React.FC<{ frame: number }> = ({ frame }) => {
  const y1 = Math.sin(frame * 0.02) * 30;
  const y2 = Math.cos(frame * 0.015) * 40;
  const x1 = Math.cos(frame * 0.01) * 20;

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 200 + y1,
          left: 300 + x1,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,150,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 150 + y2,
          right: 200,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(128,163,69,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </>
  );
};
