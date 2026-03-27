import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
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

  // Persistent static sunset background gradient exactly matching the website screenshot
  const bg = `linear-gradient(135deg, #6452b3 0%, #6e5ac4 30%, #f084c7 70%, #eda1d0 100%)`;

  // Subtle grid overlay opacity
  const gridOpacity = interpolate(frame, [0, 30], [0, 0.04], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: bg }}>
      {/* Grid overlay */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
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
          background: "radial-gradient(circle, rgba(240,132,199,0.15) 0%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(110,90,196,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </>
  );
};
