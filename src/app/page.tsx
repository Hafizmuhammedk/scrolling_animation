"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollSequence from "@/components/ScrollSequence";
import FeatureOverlays from "@/components/FeatureOverlays";
import LoadingScreen from "@/components/LoadingScreen";
import SpecsSection from "@/components/SpecsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInAnimationZone, setIsInAnimationZone] = useState(false);

  const handleProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
    setIsInAnimationZone(progress > 0 && progress < 1);
  }, []);

  const handleLoadingProgress = useCallback(
    (loaded: number, total: number) => {
      setLoadingProgress((loaded / total) * 100);
    },
    []
  );

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-black">
      {/* Loading Screen — covers everything until frames are preloaded */}
      <LoadingScreen progress={loadingProgress} isLoaded={isLoaded} />

      {/* Navigation */}
      <Navbar />

      {/* Hero — full screen intro */}
      <HeroSection />

      {/* Divider: subtle gradient line */}
      <div className="max-w-[600px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Scroll Animation Section */}
      <div className="relative">
        <ScrollSequence
          onProgress={handleProgress}
          onLoadingProgress={handleLoadingProgress}
          onLoaded={handleLoaded}
        />

        {/* Feature text overlays appear during animation */}
        {isInAnimationZone && <FeatureOverlays progress={scrollProgress} />}
      </div>

      {/* Divider */}
      <div className="max-w-[600px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Specs Section */}
      <SpecsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
