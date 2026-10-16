"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TechnicalGridOverlayProps {
  theme?: "light" | "dark";
}

export default function TechnicalGridOverlay({
  theme = "light",
}: TechnicalGridOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Slow continuous rotation of the center reticle
    if (reticleRef.current) {
      gsap.to(reticleRef.current, {
        rotation: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }

    // Animate path dash drawing
    if (pathRef.current) {
      gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const badgeBorder =
    theme === "dark"
      ? "1px solid rgba(255, 255, 255, 0.15)"
      : "1px solid rgba(20, 20, 20, 0.2)";
  const badgeBg = "var(--ink)";
  const badgeColor = "#ffffff";
  const lineColor = theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(20, 20, 20, 0.2)";
  const anchorBg = theme === "dark" ? "#ffffff" : "var(--ink)";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* SVG Blueprint Dashed Guide Line with Anchor Nodes */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {/* Upper dashed connector guide */}
        <path
          ref={pathRef}
          d="M 30 320 L 400 320 C 460 320, 500 480, 560 480 L 880 480 C 940 480, 980 320, 1040 320 L 1410 320"
          fill="none"
          stroke={lineColor}
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />

        {/* Lower horizontal alignment line */}
        <line
          x1="30"
          y1="720"
          x2="1410"
          y2="720"
          stroke={lineColor}
          strokeWidth="1"
          strokeDasharray="4 8"
        />

        {/* Terminal Anchor Squares [▪] */}
        {/* Top-left anchor */}
        <rect x="26" y="316" width="8" height="8" fill={anchorBg} />
        {/* Top-right anchor */}
        <rect x="1406" y="316" width="8" height="8" fill={anchorBg} />
        {/* Bottom-left anchor */}
        <rect x="26" y="716" width="8" height="8" fill={anchorBg} />
        {/* Bottom-right anchor */}
        <rect x="1406" y="716" width="8" height="8" fill={anchorBg} />
      </svg>

      {/* Floating Technical Badge 1: Action arrow ↗ */}
      <div
        className="float-badge"
        style={{
          position: "absolute",
          left: "24%",
          top: "43%",
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: badgeBg,
          border: badgeBorder,
          color: badgeColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          animation: "float-y 5s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      {/* Floating Technical Badge 2: Workflow Nodes ☍ */}
      <div
        className="float-badge-reverse"
        style={{
          position: "absolute",
          left: "29%",
          top: "60%",
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: badgeBg,
          border: badgeBorder,
          color: badgeColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          animation: "float-y-reverse 6s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </div>

      {/* Center Technical Crosshair Reticle ┼ */}
      <div
        ref={reticleRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "52%",
          width: "68px",
          height: "68px",
          marginLeft: "-34px",
          marginTop: "-34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          opacity: 0.8,
        }}
      >
        <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
          <circle cx="34" cy="34" r="28" stroke={lineColor} strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="34" cy="34" r="14" stroke={lineColor} strokeWidth="1" />
          <line x1="34" y1="4" x2="34" y2="64" stroke={theme === "dark" ? "#ffffff" : "var(--ink)"} strokeWidth="1.5" />
          <line x1="4" y1="34" x2="64" y2="34" stroke={theme === "dark" ? "#ffffff" : "var(--ink)"} strokeWidth="1.5" />
          <rect x="30" y="30" width="8" height="8" fill="none" stroke={theme === "dark" ? "#d7fd41" : "var(--accent)"} strokeWidth="1" />
        </svg>
      </div>

      {/* Floating Technical Badge 3: Asterisk / Spark ❇ */}
      <div
        className="float-badge"
        style={{
          position: "absolute",
          right: "28%",
          top: "43%",
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: badgeBg,
          border: badgeBorder,
          color: badgeColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          animation: "float-y 5.5s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line>
        </svg>
      </div>

      {/* Floating Technical Badge 4: Wireframe Cube / Hexagon ⬡ */}
      <div
        className="float-badge-reverse"
        style={{
          position: "absolute",
          right: "23%",
          top: "60%",
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: badgeBg,
          border: badgeBorder,
          color: badgeColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          animation: "float-y-reverse 6.5s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>
    </div>
  );
}
