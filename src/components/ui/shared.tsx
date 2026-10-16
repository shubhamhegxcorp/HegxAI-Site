"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionLabelProps {
  label: string;
  number: string;
  theme?: "light" | "dark";
}

export function SectionLabel({ label, number, theme = "light" }: SectionLabelProps) {
  const isDark = theme === "dark";
  const borderColor = isDark ? "rgba(255,255,255,0.12)" : "var(--line)";
  const textColor = isDark ? "rgba(255,255,255,0.5)" : "var(--muted)";
  const anchorColor = isDark ? "#ffffff" : "var(--ink)";

  return (
    <div
      className="w-full flex items-center justify-between py-[14px] border-t border-b relative"
      style={{ borderColor }}
    >
      {/* Left technical anchor square [▪] */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "-3px",
          width: "6px",
          height: "6px",
          background: anchorColor,
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: "-3px",
          width: "6px",
          height: "6px",
          background: anchorColor,
        }}
      />

      {/* Right technical anchor square [▪] */}
      <span
        style={{
          position: "absolute",
          right: 0,
          top: "-3px",
          width: "6px",
          height: "6px",
          background: anchorColor,
        }}
      />
      <span
        style={{
          position: "absolute",
          right: 0,
          bottom: "-3px",
          width: "6px",
          height: "6px",
          background: anchorColor,
        }}
      />

      <span
        style={{
          fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: textColor,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "8px" }}>■</span> {label}
      </span>
      <span
        style={{
          fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: textColor,
        }}
      >
        {number}
      </span>
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
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
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
