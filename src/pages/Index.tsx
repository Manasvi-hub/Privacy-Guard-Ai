import React, { Suspense, lazy, useEffect } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import ProcessStepGuide from "@/components/ProcessStepGuide";
import Footer from "@/components/Footer";

const InteractiveDemo = lazy(() => import("@/components/InteractiveDemo"));
const DownloadSection = lazy(() => import("@/components/DownloadSection"));
const IDEDownloadSection = lazy(() => import("@/components/IDEDownloadSection"));

import SkeletonDemo from "@/components/Skeletons";

const SectionDivider = () => (
  <div className="section-divider mx-auto max-w-4xl" />
);

const Index = () => {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, reduceMotion ? {
    // fast, near-instant mapping when user requests reduced motion
    stiffness: 1000,
    damping: 1000,
    restDelta: 0.001,
  } : {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    const handler = (e: any) => {
      try {
        const el = (e.target as HTMLElement).closest?.('[data-ripple]') as HTMLElement | null;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX ?? 0) - rect.left;
        const y = (e.clientY ?? 0) - rect.top;
        const ripple = document.createElement('span');
        ripple.className = 'ripple-el';
        const size = Math.max(rect.width, rect.height) * 1.4;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        el.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 700);
      } catch (err) {
        // ignore
      }
    };
    document.addEventListener('pointerdown', handler, { passive: true });
    return () => document.removeEventListener('pointerdown', handler as any);
  }, []);

  // Ensure we start at the top of the page after hydration to avoid
  // mid-page landing caused by browser restore or in-page anchors.
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX,
          backgroundImage: "linear-gradient(90deg, #a78bfa, #ec4899, #f97316)",
        }}
      />

      <Navbar />
      <HeroSection />
      <TrustBar />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <Suspense fallback={<SkeletonDemo />}>
        <InteractiveDemo />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SkeletonDemo />}>
        <DownloadSection />
      </Suspense>
      <SectionDivider />
      <ProcessStepGuide />
      <SectionDivider />
      <Suspense fallback={<SkeletonDemo />}>
        <IDEDownloadSection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
