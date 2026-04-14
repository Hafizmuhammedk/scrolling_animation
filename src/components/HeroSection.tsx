"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animations after a short delay
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,0.06)_0%,transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Eyebrow */}
        <p
          className={`text-[#0071e3] text-sm md:text-base font-medium tracking-widest uppercase mb-4 transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          Introducing
        </p>

        {/* Main Headline */}
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-bold tracking-tight leading-[0.95] mb-6 transition-all duration-1000 delay-200 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-white">iPhone Air.</span>
          <span className="block gradient-text mt-2">
            Lightness reimagined.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg sm:text-xl md:text-2xl text-[#86868b] font-light max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-500 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          Impossibly thin. Unbelievably powerful. <br className="hidden sm:block" />
          The thinnest iPhone ever made.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#"
            id="hero-learn-more"
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-lg font-normal 
                       px-8 py-3.5 rounded-full transition-all duration-300"
          >
            Learn more
          </a>
          <a
            href="#"
            id="hero-buy"
            className="text-[#0071e3] hover:text-[#40a9ff] text-lg font-normal 
                       flex items-center gap-1.5 transition-colors duration-300"
          >
            Buy
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
          Scroll to explore
        </p>
        <div className="scroll-indicator">
          <svg
            className="w-5 h-5 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
