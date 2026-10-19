"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionBarProps {
  label: string;
  num?: string;
  number?: string;
  theme?: "light" | "dark";
}

export function SectionBar({ label, num, number, theme = "light" }: SectionBarProps) {
  const displayNum = num || number || "";
  const barRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

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
      {/* Full-width thin horizontal line with 8px square nodes at ends */}
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
        {/* Left 8px node */}
        <span
          style={{
            position: "absolute",
            left: "24px",
            top: "-3.5px",
            width: "8px",
            height: "8px",
            background: isDark ? "#ffffff" : "var(--ink)",
          }}
        />
        {/* Right 8px node */}
        <span
          style={{
            position: "absolute",
            right: "24px",
            top: "-3.5px",
            width: "8px",
            height: "8px",
            background: isDark ? "#ffffff" : "var(--ink)",
          }}
        />
      </div>

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
              fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.04em",
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

interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "dark" | "outline";
  className?: string;
  onClick?: () => void;
}

export function PillButton({
  children,
  href = "#",
  variant = "dark",
  className = "",
  onClick,
}: PillButtonProps) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 28px",
    borderRadius: "9999px",
    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    whiteSpace: "nowrap" as const,
    border: "none",
  };

  const variants = {
    dark: {
      background: "var(--ink)",
      color: "var(--bg)",
    },
    outline: {
      background: "transparent",
      color: "var(--ink)",
      border: "1px solid var(--line)",
    },
  };

  const style = { ...base, ...variants[variant] };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    if (variant === "dark") {
      el.style.background = "#2a2a2a";
      el.style.transform = "translateY(-2px)";
    } else {
      el.style.background = "var(--ink)";
      el.style.color = "var(--bg)";
    }
    const arrow = el.querySelector(".arrow-icon") as HTMLElement;
    if (arrow) arrow.style.transform = "translateX(4px)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.background = variants[variant].background;
    el.style.color = variants[variant].color || "var(--ink)";
    el.style.transform = "translateY(0px)";
    const arrow = el.querySelector(".arrow-icon") as HTMLElement;
    if (arrow) arrow.style.transform = "translateX(0px)";
  };

  return (
    <a
      href={href}
      style={style as React.CSSProperties}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
      <span
        className="arrow-icon"
        style={{ transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", display: "inline-block" }}
      >
        →
      </span>
    </a>
  );
}
