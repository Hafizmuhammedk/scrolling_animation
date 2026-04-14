"use client";

import { useEffect, useRef, useState } from "react";

interface SpecCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

function SpecCard({ icon, value, label, delay = 0 }: SpecCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`glass-light rounded-2xl p-8 text-center transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="text-[#0071e3] mb-4 flex justify-center">{icon}</div>
      <p className="text-3xl sm:text-4xl font-bold text-white mb-2">{value}</p>
      <p className="text-sm text-white/50">{label}</p>
    </div>
  );
}

export default function SpecsSection() {
  return (
    <section id="specs-section" className="relative py-32 px-6">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
          Under the surface.
        </h2>
        <p className="text-lg sm:text-xl text-[#86868b] font-light max-w-2xl mx-auto">
          Every component engineered with obsessive precision. 
          Every detail considered. Every gram accounted for.
        </p>
      </div>

      {/* Spec Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SpecCard
          delay={0}
          value="5.5mm"
          label="Ultra-thin profile"
          icon={
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          }
        />
        <SpecCard
          delay={100}
          value="170g"
          label="Incredibly light"
          icon={
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          }
        />
        <SpecCard
          delay={200}
          value="120Hz"
          label="ProMotion display"
          icon={
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 12V5.25" />
            </svg>
          }
        />
        <SpecCard
          delay={300}
          value="26hr"
          label="Video playback"
          icon={
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
            </svg>
          }
        />
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-20">
        <a
          href="#"
          id="specs-learn-more"
          className="text-[#0071e3] hover:text-[#40a9ff] text-lg transition-colors duration-300 inline-flex items-center gap-1.5"
        >
          See full specifications
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
