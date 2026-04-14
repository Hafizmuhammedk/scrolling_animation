"use client";

import { useMemo } from "react";

/**
 * Feature text overlays that appear at specific scroll progress points
 * during the frame animation.
 *
 * Each overlay has:
 *  - startProgress / endProgress: range of scroll progress [0–1] when visible
 *  - position: screen quadrant for the text
 *  - content: the text to display
 */

interface FeatureOverlay {
  id: string;
  startProgress: number;
  endProgress: number;
  position: "left" | "right" | "center" | "bottom-center";
  title: string;
  subtitle: string;
  detail?: string;
  accent?: boolean;
}

const OVERLAYS: FeatureOverlay[] = [
  {
    id: "feature-thinness",
    startProgress: 0.02,
    endProgress: 0.15,
    position: "left",
    title: "5.5mm",
    subtitle: "Thinner than ever.",
    detail:
      "The thinnest iPhone we've ever created. Precision-milled from a single block of aerospace-grade titanium.",
  },
  {
    id: "feature-chip",
    startProgress: 0.18,
    endProgress: 0.32,
    position: "right",
    title: "A20 Pro chip.",
    subtitle: "Engineered to outperform.",
    detail:
      "The fastest chip ever in a smartphone. 6-core GPU with hardware-accelerated ray tracing.",
    accent: true,
  },
  {
    id: "feature-camera",
    startProgress: 0.35,
    endProgress: 0.50,
    position: "left",
    title: "48MP Fusion.",
    subtitle: "Capture the impossible.",
    detail:
      "An advanced quad-pixel sensor with 2× optical zoom and next-generation Smart HDR.",
  },
  {
    id: "feature-battery",
    startProgress: 0.53,
    endProgress: 0.67,
    position: "right",
    title: "All-day battery.",
    subtitle: "Power that keeps going.",
    detail:
      "Up to 26 hours of video playback. Optimized with an entirely new thermal architecture.",
    accent: true,
  },
  {
    id: "feature-display",
    startProgress: 0.70,
    endProgress: 0.82,
    position: "center",
    title: "Super Retina XDR.",
    subtitle: "Edge to edge. Pixel perfect.",
    detail:
      "6.1-inch OLED display with ProMotion 120Hz and 2000 nits peak HDR brightness.",
  },
  {
    id: "feature-finale",
    startProgress: 0.86,
    endProgress: 0.98,
    position: "bottom-center",
    title: "iPhone Air.",
    subtitle: "Lightness reimagined.",
    accent: true,
  },
];

interface FeatureOverlaysProps {
  progress: number;
}

export default function FeatureOverlays({ progress }: FeatureOverlaysProps) {
  const activeOverlays = useMemo(() => {
    return OVERLAYS.map((overlay) => {
      const isActive =
        progress >= overlay.startProgress && progress <= overlay.endProgress;

      // Calculate local progress within the overlay's range
      const range = overlay.endProgress - overlay.startProgress;
      const localProgress = isActive
        ? (progress - overlay.startProgress) / range
        : progress < overlay.startProgress
        ? 0
        : 1;

      // Fade in for first 20%, full for middle, fade out for last 20%
      let opacity = 0;
      if (isActive) {
        if (localProgress < 0.2) {
          opacity = localProgress / 0.2;
        } else if (localProgress > 0.8) {
          opacity = (1 - localProgress) / 0.2;
        } else {
          opacity = 1;
        }
      }

      // Vertical slide (subtle)
      const translateY = isActive
        ? localProgress < 0.2
          ? 30 * (1 - localProgress / 0.2)
          : localProgress > 0.8
          ? -30 * ((localProgress - 0.8) / 0.2)
          : 0
        : 40;

      return { ...overlay, isActive, opacity, translateY };
    });
  }, [progress]);

  const getPositionClasses = (position: FeatureOverlay["position"]) => {
    switch (position) {
      case "left":
        return "left-6 sm:left-12 lg:left-20 top-1/2 -translate-y-1/2 text-left max-w-sm lg:max-w-md";
      case "right":
        return "right-6 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2 text-right max-w-sm lg:max-w-md";
      case "center":
        return "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-lg";
      case "bottom-center":
        return "left-1/2 bottom-20 sm:bottom-28 -translate-x-1/2 text-center max-w-lg";
    }
  };

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {activeOverlays.map((overlay) => (
        <div
          key={overlay.id}
          id={overlay.id}
          className={`absolute ${getPositionClasses(overlay.position)} px-4`}
          style={{
            opacity: overlay.opacity,
            transform: `${
              overlay.position === "center" || overlay.position === "bottom-center"
                ? `translateX(-50%) `
                : ""
            }${
              overlay.position !== "bottom-center" &&
              overlay.position !== "center"
                ? `translateY(calc(-50% + ${overlay.translateY}px))`
                : overlay.position === "center"
                ? `translateY(calc(-50% + ${overlay.translateY}px))`
                : `translateY(${overlay.translateY}px)`
            }`,
            transition: "opacity 0.15s ease-out",
            willChange: "opacity, transform",
          }}
        >
          {/* Glass background card */}
          <div className="glass-light rounded-2xl p-6 sm:p-8">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2 ${
                overlay.accent ? "gradient-text-blue" : "text-white text-glow"
              }`}
            >
              {overlay.title}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 font-medium mb-3">
              {overlay.subtitle}
            </p>
            {overlay.detail && (
              <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-xs sm:max-w-sm">
                {overlay.detail}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
