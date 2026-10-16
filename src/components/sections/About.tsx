"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, PillButton } from "@/components/ui/shared";
import { useIsMobile } from "@/lib/useIsMobile";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLSpanElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Headline entrance
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Text illumination scrubber on scroll (matches Avande Section 001)
    if (scrubRef.current) {
      gsap.fromTo(
        scrubRef.current,
        { color: "rgba(20, 20, 20, 0.25)" },
        {
          color: "rgba(20, 20, 20, 1)",
          ease: "none",
          scrollTrigger: {
            trigger: scrubRef.current,
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px 100px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Background ASCII Halftone Matrix */}
      <AsciiHalftoneCanvas theme="light" density="sparse" interactive={true} />

      <SectionLabel label="ABOUT US" number="001" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "130px 1fr 240px",
          gap: isMobile ? "32px" : "40px",
          marginTop: "56px",
          alignItems: "start",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Left: Chamfered Neon Lime Tag (Exact Avande Badge) */}
        {!isMobile && (
          <div
            className="chamfer-tag"
            style={{
              background: "#d7fd41",
              color: "#141414",
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
              boxShadow: "0 6px 24px rgba(215, 253, 65, 0.4)",
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "140px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "10px", lineHeight: 1 }}>■</span>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>›››</span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  lineHeight: 1.3,
                }}
              >
                GET<br />STARTED
              </div>
            </div>
          </div>
        )}

        {/* Center: Main Statement with Scroll Text Scrubber */}
        <div ref={textRef} style={{ opacity: 0 }}>
          <p
            style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "clamp(26px, 3.2vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.25,
              color: "var(--ink)",
              marginBottom: "32px",
            }}
          >
            Innovative automation agency building intelligent workflow systems powered by{" "}
            <span
              ref={scrubRef}
              style={{
                color: "rgba(20, 20, 20, 0.25)",
                transition: "color 0.2s ease",
                fontWeight: 500,
              }}
            >
              advanced AI technology for modern high-growth businesses.
            </span>
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "28px",
              marginTop: "40px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "var(--muted)",
                }}
              >
                HEGXAI was built for operators who are tired of duct-taping tools together.
                We design automation from first principles — mapping your real workflows
                before deploying reliable AI agents.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "var(--muted)",
                }}
              >
                Every deployment is engineered to last: clean architecture, deterministic guardrails,
                and seamless integration across your CRM, communications, and database stack.
              </p>
            </div>
          </div>
        </div>

        {/* Founder card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "28px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 4px 32px rgba(20,20,20,0.06)",
          }}
        >
          {/* Avatar placeholder */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e8c89c 0%, var(--accent) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid var(--bg)",
              boxShadow: "0 4px 16px rgba(20,20,20,0.12)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* CSS silhouette */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="18" r="9" fill="rgba(20,20,20,0.3)" />
              <path d="M6 42c0-10 8-16 18-16s18 6 18 16" fill="rgba(20,20,20,0.3)" />
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                fontSize: "20px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "var(--ink)",
                textTransform: "uppercase",
              }}
            >
              [FOUNDER NAME]
            </div>
            <div
              style={{
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginTop: "4px",
              }}
            >
              FOUNDER & CEO
            </div>
          </div>

          <p
            style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "var(--muted)",
              textAlign: "center",
              marginTop: "4px",
            }}
          >
            Operator, builder, automation obsessive. Built to help teams escape
            the manual work trap.
          </p>

          <PillButton href="#contact" variant="dark">
            Work with us
          </PillButton>
        </div>
      </div>
    </section>
  );
}
