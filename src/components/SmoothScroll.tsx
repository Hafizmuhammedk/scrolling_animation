"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Global smooth scroll provider using Lenis.
 * Ultra-smooth settings — lower lerp = more glide, higher duration = more inertia.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        duration: 1.8,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.04,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
