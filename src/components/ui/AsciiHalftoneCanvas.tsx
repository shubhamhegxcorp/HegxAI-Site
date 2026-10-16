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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

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

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

    handleResize();
    window.addEventListener("resize", handleResize);

    const parent = canvas.parentElement;
    if (parent && interactive) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const color =
      theme === "dark"
        ? "rgba(255, 255, 255, 0.16)"
        : "rgba(20, 20, 20, 0.18)";

    const accentColor =
      theme === "dark"
        ? "rgba(215, 253, 65, 0.35)"
        : "rgba(232, 162, 92, 0.35)";

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      if (!prefersReducedMotion) {
        time += 0.015;
      }

      ctx.font = '500 9px "IBM Plex Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Centers for the 4-point starburst astroids
      // We position 3 main starburst centers across the width
      const centers = [
        { x: width * 0.18, y: height * 0.5, radius: Math.min(width, height) * 0.75, phase: 0 },
        { x: width * 0.5, y: height * 0.5, radius: Math.min(width, height) * 0.85, phase: Math.PI * 0.5 },
        { x: width * 0.82, y: height * 0.5, radius: Math.min(width, height) * 0.75, phase: Math.PI },
      ];

      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      for (let c = 0; c <= cols; c++) {
        const px = c * step;

        for (let r = 0; r <= rows; r++) {
          const py = r * step;

          // Compute distance and astroid factor for each center
          let maxIntensity = 0;
          let isNearCenter = false;

          for (let i = 0; i < centers.length; i++) {
            const center = centers[i];
            const dx = px - center.x;
            const dy = py - center.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > center.radius) continue;

            // 4-point star astroid equation:
            // An astroid pinches at angles 45, 135, 225, 315 deg and expands along axes
            const angle = Math.atan2(dy, dx);
            // shape factor: cos(4*angle) modulates the radius
            const starMod = 0.7 + 0.35 * Math.pow(Math.abs(Math.cos(2 * angle)), 1.4);
            const effDist = dist / starMod;

            // Concentric wave ripple
            const freq = 0.045;
            const wave = Math.sin(effDist * freq - time * 0.7 + center.phase);

            // Radial falloff from center
            const falloff = Math.max(0, 1 - effDist / center.radius);
            const intensity = wave * falloff;

            if (intensity > maxIntensity) {
              maxIntensity = intensity;
            }

            if (dist < 18) {
              isNearCenter = true;
            }
          }

          // Mouse ripple interaction
          if (mouse.active) {
            const mdx = px - mouse.x;
            const mdy = py - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 180) {
              const mWave = Math.sin(mDist * 0.08 - time * 2) * (1 - mDist / 180);
              maxIntensity = Math.max(maxIntensity, maxIntensity + mWave * 0.4);
            }
          }

          if (isNearCenter) {
            // Draw center coordinate crosshair
            ctx.fillStyle = theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(20,20,20,0.4)";
            ctx.fillText("┼", px, py);
            continue;
          }

          if (maxIntensity > 0.08) {
            // Quantize intensity into character index
            const normalized = Math.min(1, Math.max(0, (maxIntensity - 0.08) / 0.82));
            const charIdx = Math.floor(normalized * (CHARS.length - 1));
            const char = CHARS[charIdx];

            if (char !== " ") {
              // Highlight dense peaks subtly
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

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    if (prefersReducedMotion) {
      draw();
    } else {
      animationFrameId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (parent && interactive) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [theme, density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  );
}
