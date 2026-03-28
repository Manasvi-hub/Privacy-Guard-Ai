import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import InteractiveDemo from "@/components/InteractiveDemo";
import DownloadSection from "@/components/DownloadSection";
import ExtensionGuide from "@/components/ExtensionGuide";
import IDEDownloadSection from "@/components/IDEDownloadSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <TrustBar />
    <FeaturesSection />
    <HowItWorks />
    <InteractiveDemo />
    <DownloadSection />
    <ExtensionGuide />
    <IDEDownloadSection />
    <Footer />
  </div>
);

export default Index;
