"use client";
import { useEffect, useRef } from "react";

interface AsciiHalftoneCanvasProps {
  theme?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
  density?: "sparse" | "normal" | "dense";
  interactive?: boolean;
}

export default function AsciiHalftoneCanvas({
  theme = "light",
  className = "",
  style,
  density = "normal",
  interactive = true,
}: AsciiHalftoneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let isRunning = false;
    let isIntersecting = false;
    let width = 0;
    let height = 0;
    let time = 0;
    let lastFrameTime = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Character set ordered from empty/light to dense
    const CHARS = [" ", ".", "·", "+", "?", "*", "%", "@"];

    // Grid spacing based on density
    const step = density === "dense" ? 11 : density === "sparse" ? 16 : 13;

    // Precomputed center points and radius
    interface CenterPoint {
      x: number;
      y: number;
      radius: number;
      radiusSq: number;
      phase: number;
    }
    let centers: CenterPoint[] = [];

    const handleResize = () => {
      const parent = container.parentElement || container;
      const rect = parent.getBoundingClientRect();
      // Cap DPR to 1.5 for performance
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;

      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Precompute font and text settings
      ctx.font = '500 9px "IBM Plex Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Precalculate starburst centers and squared radii outside frame loop
      const baseR = Math.min(width, height);
      centers = [
        {
          x: width * 0.18,
          y: height * 0.5,
          radius: baseR * 0.75,
          radiusSq: (baseR * 0.75) * (baseR * 0.75),
          phase: 0,
        },
        {
          x: width * 0.5,
          y: height * 0.5,
          radius: baseR * 0.85,
          radiusSq: (baseR * 0.85) * (baseR * 0.85),
          phase: Math.PI * 0.5,
        },
        {
          x: width * 0.82,
          y: height * 0.5,
          radius: baseR * 0.75,
          radiusSq: (baseR * 0.75) * (baseR * 0.75),
          phase: Math.PI,
        },
      ];

      if (prefersReducedMotion) {
        drawFrame();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const color =
      theme === "dark"
        ? "rgba(255, 255, 255, 0.16)"
        : "rgba(20, 20, 20, 0.18)";

    const accentColor =
      theme === "dark"
        ? "rgba(215, 253, 65, 0.35)"
        : "rgba(232, 162, 92, 0.35)";

    const centerCrosshairColor =
      theme === "dark"
        ? "rgba(255, 255, 255, 0.4)"
        : "rgba(20, 20, 20, 0.4)";

    // Core draw execution
    const drawFrame = () => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      }

      if (!prefersReducedMotion) {
        time += 0.02;
      }

      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);
      const numCenters = centers.length;

      for (let c = 0; c <= cols; c++) {
        const px = c * step;

        for (let r = 0; r <= rows; r++) {
          const py = r * step;

          let maxIntensity = 0;
          let isNearCenter = false;

          for (let i = 0; i < numCenters; i++) {
            const center = centers[i];
            const dx = px - center.x;
            const dy = py - center.y;
            const distSq = dx * dx + dy * dy;

            // SQUARED DISTANCE EARLY OUT (avoids sqrt and atan2 for distant cells)
            if (distSq > center.radiusSq) continue;

            // Near-center crosshair check (18^2 = 324)
            if (distSq < 324) {
              isNearCenter = true;
            }

            const dist = Math.sqrt(distSq);
            const angle = Math.atan2(dy, dx);
            const starMod = 0.7 + 0.35 * Math.pow(Math.abs(Math.cos(2 * angle)), 1.4);
            const effDist = dist / starMod;

            if (effDist >= center.radius) continue;

            // Radial falloff from center (skip if <= 0)
            const falloff = 1 - effDist / center.radius;
            if (falloff <= 0) continue;

            // Concentric wave ripple
            const wave = Math.sin(effDist * 0.045 - time * 0.7 + center.phase);
            const intensity = wave * falloff;

            if (intensity > maxIntensity) {
              maxIntensity = intensity;
            }
          }

          // Mouse ripple interaction (180^2 = 32400)
          if (mouse.active) {
            const mdx = px - mouse.x;
            const mdy = py - mouse.y;
            const mDistSq = mdx * mdx + mdy * mdy;
            if (mDistSq < 32400) {
              const mDist = Math.sqrt(mDistSq);
              const mWave = Math.sin(mDist * 0.08 - time * 2) * (1 - mDist / 180);
              maxIntensity = Math.max(maxIntensity, maxIntensity + mWave * 0.4);
            }
          }

          if (isNearCenter) {
            ctx.fillStyle = centerCrosshairColor;
            ctx.fillText("┼", px, py);
            continue;
          }

          if (maxIntensity > 0.08) {
            const normalized = Math.min(1, Math.max(0, (maxIntensity - 0.08) / 0.82));
            const charIdx = Math.floor(normalized * (CHARS.length - 1));
            const char = CHARS[charIdx];

            if (char !== " ") {
              if (charIdx >= CHARS.length - 2 && maxIntensity > 0.65) {
                ctx.fillStyle = accentColor;
              } else {
                ctx.fillStyle = color;
              }
              ctx.fillText(char, px, py);
            }
          }
        }
      }
    };

    // Animation loop capped at ~30fps (delta >= 33ms)
    const renderLoop = (timestamp: number) => {
      if (!isRunning) return;

      const elapsed = timestamp - lastFrameTime;
      if (elapsed >= 33) {
        lastFrameTime = timestamp - (elapsed % 33);
        drawFrame();
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const startAnimation = () => {
      if (isRunning || prefersReducedMotion) return;
      isRunning = true;
      lastFrameTime = performance.now();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const stopAnimation = () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    // Attach mouse listeners only when visible
    const attachMouse = () => {
      const parent = container.parentElement;
      if (parent && interactive) {
        parent.addEventListener("mousemove", handleMouseMove, { passive: true });
        parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      }
    };

    const detachMouse = () => {
      const parent = container.parentElement;
      if (parent && interactive) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    // IntersectionObserver: run loop ONLY while canvas is in the viewport (+100px margin)
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry.isIntersecting;

        if (isIntersecting && !document.hidden) {
          attachMouse();
          startAnimation();
        } else {
          detachMouse();
          stopAnimation();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(container);

    // Pause when document is hidden (tab switch or background window)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else if (isIntersecting) {
        startAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    if (prefersReducedMotion) {
      drawFrame();
    }

    return () => {
      stopAnimation();
      detachMouse();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, density, interactive]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        contain: "strict",
      }}
    >
      <canvas
        ref={canvasRef}
        className={className}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          contain: "strict",
          ...style,
        }}
      />
    </div>
  );
}
