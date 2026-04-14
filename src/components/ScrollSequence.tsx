"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLenis } from "lenis/react";

/**
 * ─────────────────────────────────────────────────────────
 *  CONFIGURATION
 * ─────────────────────────────────────────────────────────
 *
 *  HOW TO USE YOUR OWN FRAMES:
 *
 *  1. Place your PNG sequence in the project root folder
 *     (or update getFramePath below).
 *
 *  2. Files should be named:
 *     ezgif-frame-001.png ... ezgif-frame-240.png
 *
 *  3. Update FRAME_COUNT below to match your total frame count.
 *
 * ─────────────────────────────────────────────────────────
 */

const FRAME_COUNT = 240;

/**
 * Base lerp speed per second for the frame index animation.
 * Lower = smoother/slower glide, higher = snappier.
 * 0.03–0.06 is ultra-smooth, 0.08–0.12 is Apple-standard.
 */
const FRAME_LERP_SPEED = 4.5;

/** Target frame rate for delta-time normalization */
const TARGET_FPS = 60;

/** Build the path to a specific frame (1-indexed) */
function getFramePath(index: number): string {
  const paddedIndex = String(index).padStart(3, "0");
  return `/api/frames/ezgif-frame-${paddedIndex}.png`;
}

/**
 * Delta-time aware lerp — ensures identical smoothness
 * regardless of screen refresh rate (60Hz, 120Hz, 144Hz).
 */
function dtLerp(current: number, target: number, speed: number, dt: number): number {
  // Exponential decay: factor = 1 - e^(-speed * dt)
  const factor = 1 - Math.exp(-speed * dt);
  return current + (target - current) * factor;
}

interface ScrollSequenceProps {
  onProgress?: (progress: number) => void;
  onLoadingProgress?: (loaded: number, total: number) => void;
  onLoaded?: () => void;
}

export default function ScrollSequence({
  onProgress,
  onLoadingProgress,
  onLoaded,
}: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // ── Smooth animation state (kept outside React render cycle) ──
  const targetFrameRef = useRef(0); // The "goal" frame based on scroll
  const currentFrameRef = useRef(0); // The smoothly-interpolated frame
  const lastDrawnFrameRef = useRef(-1); // Last actually rendered integer frame
  const rafIdRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const lastTimeRef = useRef(0); // For delta-time calculation

  // Store callbacks in refs so the RAF loop doesn't re-create
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  // ── Preload all frames ──────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    const onImageLoad = () => {
      loadedCount++;
      onLoadingProgress?.(loadedCount, FRAME_COUNT);

      if (loadedCount === FRAME_COUNT) {
        imagesRef.current = images;
        setIsReady(true);
        onLoaded?.();
      }
    };

    // Load in batches to avoid network congestion
    const BATCH_SIZE = 20;
    let batchIndex = 0;

    function loadBatch() {
      const start = batchIndex * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);

      for (let i = start; i < end; i++) {
        const img = new Image();
        img.src = getFramePath(i + 1);
        img.onload = onImageLoad;
        img.onerror = () => {
          console.warn(`Failed to load frame: ${getFramePath(i + 1)}`);
          onImageLoad();
        };
        images[i] = img;
      }

      batchIndex++;
      if (end < FRAME_COUNT) {
        setTimeout(loadBatch, 50);
      }
    }

    loadBatch();

    return () => {
      images.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [onLoadingProgress, onLoaded]);

  // ── Draw a frame onto the canvas with cover-fit logic ───
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (
      canvas.width !== displayWidth * dpr ||
      canvas.height !== displayHeight * dpr
    ) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Object-fit: cover
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawWidth: number,
      drawHeight: number,
      offsetX: number,
      offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // ── Calculate target frame from scroll position ─────────
  const updateTargetFrame = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = rect.height;
    const viewportHeight = window.innerHeight;

    const scrollableDistance = containerHeight - viewportHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    onProgressRef.current?.(progress);

    targetFrameRef.current = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(progress * (FRAME_COUNT - 1)))
    );
  }, []);

  // ── Lenis scroll listener — updates target on each smooth tick ──
  useLenis(() => {
    if (isReady) {
      updateTargetFrame();
    }
  });

  // ── Continuous RAF loop that lerps toward the target frame ──
  useEffect(() => {
    if (!isReady) return;

    // Draw first frame right away
    drawFrame(0);
    currentFrameRef.current = 0;
    lastDrawnFrameRef.current = 0;
    lastTimeRef.current = 0;
    isRunningRef.current = true;

    // Also compute initial target
    updateTargetFrame();

    function tick(timestamp: number) {
      if (!isRunningRef.current) return;

      // Delta time in seconds (clamped to avoid huge jumps on tab switch)
      const dt = lastTimeRef.current
        ? Math.min((timestamp - lastTimeRef.current) / 1000, 0.1)
        : 1 / TARGET_FPS;
      lastTimeRef.current = timestamp;

      // Lerp the current frame toward the target (delta-time aware)
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      // Smooth exponential interpolation
      const next = dtLerp(current, target, FRAME_LERP_SPEED, dt);

      // Snap when very close to avoid infinite micro-drift
      currentFrameRef.current =
        Math.abs(next - target) < 0.1 ? target : next;

      // Only redraw when the integer frame actually changes
      const intFrame = Math.round(currentFrameRef.current);
      if (intFrame !== lastDrawnFrameRef.current) {
        lastDrawnFrameRef.current = intFrame;
        drawFrame(intFrame);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    }

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      isRunningRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isReady, drawFrame, updateTargetFrame]);

  // ── Resize handler ──────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;

    const handleResize = () => {
      drawFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady, drawFrame]);

  return (
    <div
      ref={containerRef}
      id="animation-section"
      /*
       * The container height controls how many scroll pixels map to frames.
       * h-[500vh] = 5 full viewports of scrolling = 240 frames.
       * Increase for slower animation, decrease for faster.
       */
      className="relative h-[500vh]"
    >
      {/* Sticky canvas stays fixed while container scrolls */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center canvas-container">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            display: isReady ? "block" : "none",
            willChange: "contents",
          }}
        />
      </div>
    </div>
  );
}
