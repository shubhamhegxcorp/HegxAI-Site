"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSectionNumber } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

interface SectionBarProps {
  label: string;
  num?: string;
  number?: string;
  sectionId?: string;
  theme?: "light" | "dark";
  showLine?: boolean;
}

export function SectionBar({
  label,
  num,
  number,
  sectionId,
  theme = "light",
  showLine,
}: SectionBarProps) {
  const autoNum = sectionId ? getSectionNumber(sectionId) : "";
  const displayNum = num || number || autoNum;
  const barRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";
  const shouldShowLine = showLine ?? (sectionId === "about");

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.clipPath = "inset(0 0% 0 0)";
      return;
    }

    gsap.fromTo(
      el,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", marginBottom: "40px" }}>
      {/* Full-width thin horizontal line with 8px square nodes at ends (rendered ONLY at top of About) */}
      {shouldShowLine && (
        <div
          style={{
            position: "relative",
            width: "100vw",
            left: "50%",
            transform: "translateX(-50%)",
            height: "1px",
            background: isDark ? "rgba(255,255,255,0.18)" : "rgba(20,20,20,0.25)",
            marginBottom: "12px",
          }}
        >
          {/* Left 8px node (at x=40px from viewport edge) */}
          <span
            style={{
              position: "absolute",
              left: "40px",
              top: "-3.5px",
              width: "8px",
              height: "8px",
              background: isDark ? "#ffffff" : "var(--ink)",
            }}
          />
          {/* Right 8px node (at x=40px from viewport edge) */}
          <span
            style={{
              position: "absolute",
              right: "40px",
              top: "-3.5px",
              width: "8px",
              height: "8px",
              background: isDark ? "#ffffff" : "var(--ink)",
            }}
          />
        </div>
      )}

      {/* Full-width black bar (36px high inside column) */}
      <div
        ref={barRef}
        style={{
          width: "100%",
          height: "36px",
          background: isDark ? "rgba(255,255,255,0.08)" : "#0f0f0f",
          border: isDark ? "1px solid rgba(255,255,255,0.12)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          clipPath: "inset(0 100% 0 0)",
          willChange: "clip-path",
        }}
      >
        <span
          style={{
            fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
            fontWeight: 500,
            fontSize: "13px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          {label}
        </span>
        {displayNum && (
          <span
            style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "#ffffff",
            }}
          >
            {displayNum}
          </span>
        )}
      </div>
    </div>
  );
}

// Keep SectionLabel backwards compatibility mapping to SectionBar
export const SectionLabel = SectionBar;

export function SectionColumn({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        maxWidth: "1320px",
        margin: "0 auto",
        position: "relative",
        borderLeft: "1px solid rgba(20,20,20,0.25)",
        borderRight: "1px solid rgba(20,20,20,0.25)",
        padding: "0 var(--col-pad, 24px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "inverse" | "dark" | "outline" | "invert-lime" | "invert-outline";
  size?: "sm" | "md";
  brackets?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
}

export function Button({
  children,
  href = "#",
  variant = "primary",
  size = "md",
  brackets = false,
  className = "",
  onClick,
  style: propStyle,
}: ButtonProps) {
  // Normalize legacy names to the 3 canonical variants
  const v: "primary" | "secondary" | "inverse" =
    variant === "secondary" || variant === "outline" || variant === "invert-outline"
      ? "secondary"
      : variant === "inverse" || variant === "invert-lime"
      ? "inverse"
      : "primary";

  const isSmall = size === "sm";

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const wipe = el.querySelector(".btn-wipe") as HTMLElement;
    const arrow = el.querySelector(".btn-arrow") as HTMLElement;
    const text = el.querySelector(".btn-text") as HTMLElement;

    if (wipe) wipe.style.transform = "translateY(0%)";
    if (arrow) {
      arrow.style.transform = "translateX(4px)";
      if (v === "secondary") arrow.style.color = "#ffffff";
    }
    if (text && v === "secondary") {
      text.style.color = "#ffffff";
    }

    if (brackets) {
      const btl = el.querySelector(".bracket-tl") as HTMLElement;
      const btr = el.querySelector(".bracket-tr") as HTMLElement;
      const bbl = el.querySelector(".bracket-bl") as HTMLElement;
      const bbr = el.querySelector(".bracket-br") as HTMLElement;
      if (btl) btl.style.transform = "translate(-5px, -5px)";
      if (btr) btr.style.transform = "translate(5px, -5px)";
      if (bbl) bbl.style.transform = "translate(-5px, 5px)";
      if (bbr) bbr.style.transform = "translate(5px, 5px)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const wipe = el.querySelector(".btn-wipe") as HTMLElement;
    const arrow = el.querySelector(".btn-arrow") as HTMLElement;
    const text = el.querySelector(".btn-text") as HTMLElement;

    if (wipe) wipe.style.transform = "translateY(100%)";
    if (arrow) {
      arrow.style.transform = "translateX(0px)";
      arrow.style.color = v === "primary" ? "#ffffff" : "#141414";
    }
    if (text) {
      text.style.color = v === "primary" ? "#ffffff" : "#141414";
    }

    if (brackets) {
      const btl = el.querySelector(".bracket-tl") as HTMLElement;
      const btr = el.querySelector(".bracket-tr") as HTMLElement;
      const bbl = el.querySelector(".bracket-bl") as HTMLElement;
      const bbr = el.querySelector(".bracket-br") as HTMLElement;
      if (btl) btl.style.transform = "translate(-2px, -2px)";
      if (btr) btr.style.transform = "translate(2px, -2px)";
      if (bbl) bbl.style.transform = "translate(-2px, 2px)";
      if (bbr) bbr.style.transform = "translate(2px, 2px)";
    }
  };

  const bgDefault =
    v === "primary"
      ? "var(--ink)"
      : v === "inverse"
      ? "var(--lime)"
      : "transparent";

  const textColorDefault =
    v === "primary" ? "#ffffff" : "#141414";

  const borderColorDefault =
    v === "primary"
      ? "var(--ink)"
      : v === "inverse"
      ? "var(--lime)"
      : "var(--ink)";

  const wipeBg =
    v === "primary"
      ? "#262626"
      : v === "inverse"
      ? "#e4ff6b"
      : "var(--ink)";

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`btn-square ${className}`}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: isSmall ? "10px 18px" : "16px 24px",
        borderRadius: "0px",
        background: bgDefault,
        border: `1px solid ${borderColorDefault}`,
        color: textColorDefault,
        fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        overflow: brackets ? "visible" : "hidden",
        transition: "border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        ...propStyle,
      }}
    >
      {/* Ink Wipe from bottom (0.35s) */}
      <span
        className="btn-wipe"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: wipeBg,
          transform: "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Button Content */}
      <span
        className="btn-text"
        style={{
          position: "relative",
          zIndex: 1,
          color: propStyle?.color || (v === "primary" ? "#ffffff" : "#141414"),
          transition: "color 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </span>

      <span
        className="btn-arrow"
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          color: propStyle?.color || (v === "primary" ? "#ffffff" : "#141414"),
          transition:
            "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          lineHeight: 1,
        }}
      >
        →
      </span>

      {/* 4 Corner Brackets (Hero CTA) */}
      {brackets && (
        <>
          <span
            className="bracket-corner bracket-tl"
            style={{
              position: "absolute",
              top: "-2px",
              left: "-2px",
              width: "10px",
              height: "10px",
              borderTop: "1.5px solid var(--ink)",
              borderLeft: "1.5px solid var(--ink)",
              pointerEvents: "none",
              transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: "translate(-2px, -2px)",
            }}
          />
          <span
            className="bracket-corner bracket-tr"
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "10px",
              height: "10px",
              borderTop: "1.5px solid var(--ink)",
              borderRight: "1.5px solid var(--ink)",
              pointerEvents: "none",
              transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: "translate(2px, -2px)",
            }}
          />
          <span
            className="bracket-corner bracket-bl"
            style={{
              position: "absolute",
              bottom: "-2px",
              left: "-2px",
              width: "10px",
              height: "10px",
              borderBottom: "1.5px solid var(--ink)",
              borderLeft: "1.5px solid var(--ink)",
              pointerEvents: "none",
              transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: "translate(-2px, 2px)",
            }}
          />
          <span
            className="bracket-corner bracket-br"
            style={{
              position: "absolute",
              bottom: "-2px",
              right: "-2px",
              width: "10px",
              height: "10px",
              borderBottom: "1.5px solid var(--ink)",
              borderRight: "1.5px solid var(--ink)",
              pointerEvents: "none",
              transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: "translate(2px, 2px)",
            }}
          />
        </>
      )}
    </a>
  );
}

// Keep PillButton mapped to the new square Button
export const PillButton = Button;
