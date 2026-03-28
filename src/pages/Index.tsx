import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import InteractiveDemo from "@/components/InteractiveDemo";
import DownloadSection from "@/components/DownloadSection";
import ProcessStepGuide from "@/components/ProcessStepGuide";
import IDEDownloadSection from "@/components/IDEDownloadSection";
import Footer from "@/components/Footer";

const SectionDivider = () => (
  <div className="section-divider mx-auto max-w-4xl" />
);

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
      <InteractiveDemo />
      <SectionDivider />
      <DownloadSection />
      <SectionDivider />
      <ProcessStepGuide />
      <SectionDivider />
      <IDEDownloadSection />
      <Footer />
    </div>
  );
};

export default Index;
