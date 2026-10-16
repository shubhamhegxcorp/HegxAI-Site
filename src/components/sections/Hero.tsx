"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";
import TechnicalGridOverlay from "@/components/ui/TechnicalGridOverlay";

const MARQUEE_WORDS = [
  "WORKFLOWS",
  "•",
  "AI AGENTS",
  "•",
  "INTEGRATIONS",
  "•",
  "PROCESS DESIGN",
  "•",
  "WORKFLOWS",
  "•",
  "AI AGENTS",
  "•",
  "INTEGRATIONS",
  "•",
  "PROCESS DESIGN",
  "•",
];

const TOOLS = [
  "Gmail",
  "Slack",
  "Google Sheets",
  "Notion",
  "HubSpot",
  "Airtable",
  "Salesforce",
  "Zapier-compatible",
  "Make",
];

export default function Hero() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
      // Page load: headline mask reveal
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(line1Ref.current, { y: "0%", duration: 1.1, ease: "power4.out" })
        .to(line2Ref.current, { y: "0%", duration: 1.1, ease: "power4.out" }, "-=0.8")
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .to(card1Ref.current, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .to(card2Ref.current, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.7")
        .to(toolsRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .to(marqueeRef.current, { opacity: 1, duration: 0.5 }, "-=0.3");
    } else {
      // If reduced motion, show everything instantly
      [line1Ref, line2Ref, subRef, ctaRef, card1Ref, card2Ref, toolsRef, marqueeRef].forEach(r => {
        if (r.current) r.current.style.opacity = "1";
      });
    }
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "120px",
        paddingBottom: "0",
      }}
    >
      {/* ─── EXACT REPLICATED ASCII HALFTONE MATRIX BACKGROUND ─── */}
      <AsciiHalftoneCanvas theme="light" density="normal" interactive={true} />

      {/* ─── BLUEPRINT VECTOR GUIDES & FLOATING BADGES ─── */}
      <TechnicalGridOverlay theme="light" />

      {/* Headline */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
        <div style={{ overflow: "hidden", marginBottom: "-4px" }}>
          <div
            ref={line1Ref}
            style={{
              fontFamily: "var(--ff-display, 'Anton', sans-serif)",
              fontSize: "clamp(64px, 13vw, 190px)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "var(--ink)",
              transform: "translateY(110%)",
              willChange: "transform",
            }}
          >
            EVERY TASK.
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            ref={line2Ref}
            style={{
              fontFamily: "var(--ff-display, 'Anton', sans-serif)",
              fontSize: "clamp(64px, 13vw, 190px)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "var(--ink)",
              transform: "translateY(110%)",
              willChange: "transform",
            }}
          >
            <span
              className="highlight-lime"
              style={{
                background: "#d7fd41",
                color: "#141414",
                padding: "2px 22px",
                display: "inline-block",
                boxShadow: "0 6px 28px rgba(215, 253, 65, 0.45)",
              }}
            >
              AUTOMATED.
            </span>
          </div>
        </div>

        {/* Subtext */}
        <div
          ref={subRef}
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            marginTop: "28px",
            marginBottom: "36px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "18px",
              fontWeight: 400,
              color: "var(--muted)",
              letterSpacing: "0.01em",
            }}
          >
            Automation built for growth.
          </p>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{ opacity: 0, transform: "translateY(16px)", display: "flex", justifyContent: "center" }}
        >
          <div className="corner-brackets">
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 36px",
                borderRadius: "9999px",
                background: "var(--ink)",
                color: "var(--bg)",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#2a2a2a";
                el.style.transform = "translateY(-2px)";
                const arr = el.querySelector(".arr") as HTMLElement;
                if (arr) arr.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "var(--ink)";
                el.style.transform = "translateY(0px)";
                const arr = el.querySelector(".arr") as HTMLElement;
                if (arr) arr.style.transform = "translateX(0px)";
              }}
            >
              Book a Free Audit
              <span className="arr" style={{ transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", display: "inline-block" }}>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating UI Cards */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "960px",
          marginTop: "60px",
          minHeight: "260px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          zIndex: 2,
        }}
      >
        {/* Task list card - left */}
        <div
          ref={card1Ref}
          style={{
            opacity: 0,
            transform: "translate(-30px, 20px)",
            position: "absolute",
            left: "0",
            top: "20px",
            width: "220px",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "20px",
            padding: "16px",
            boxShadow: "0 8px 40px rgba(20,20,20,0.08)",
            animation: "float-y 5s ease-in-out infinite",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}>
              ACTIVE TASKS
            </span>
          </div>
          {[
            { label: "Lead routed", done: true },
            { label: "Invoice sent", done: true },
            { label: "Report generated", done: true },
            { label: "Follow-up queued", done: false },
          ].map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 0",
                borderBottom: i < 3 ? "1px solid var(--line)" : "none",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: t.done ? "var(--accent)" : "var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {t.done && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "12px",
                color: t.done ? "var(--ink)" : "var(--muted)",
              }}>
                {t.label}
              </span>
            </div>
          ))}
        </div>

        {/* Center dashboard mock with signature lime backing card */}
        <div style={{ position: "relative" }}>
          {/* Lime highlight backdrop */}
          <div
            style={{
              position: "absolute",
              inset: "-14px",
              background: "var(--lime)",
              borderRadius: "36px",
              zIndex: 1,
              boxShadow: "0 12px 48px var(--lime-glow)",
            }}
          />
          <div
            style={{
              width: "360px",
              background: "var(--ink)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
              padding: "20px",
              boxShadow: "0 20px 80px rgba(20,20,20,0.3)",
              position: "relative",
              zIndex: 3,
            }}
          >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}>
              AI AUTOMATIONS
            </span>
            <div style={{
              background: "var(--accent)",
              borderRadius: "9999px",
              padding: "3px 10px",
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "10px",
              fontWeight: 500,
              color: "var(--ink)",
              letterSpacing: "0.06em",
            }}>
              LIVE
            </div>
          </div>

          {/* Circular gauge placeholder */}
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
            <div style={{ position: "relative", width: "100px", height: "100px" }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="276.5"
                  strokeDashoffset="80"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.04em",
                }}>
                  Automations
                </span>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  marginTop: "4px",
                  animation: "pulse-dot 1.6s ease-in-out infinite",
                }} />
              </div>
            </div>
          </div>

          {/* Bottom tags */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            {["Lead Routing", "Reporting", "Outreach"].map((tag) => (
              <span key={tag} style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "9999px",
                padding: "4px 10px",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "9px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

        {/* Status card - right */}
        <div
          ref={card2Ref}
          style={{
            opacity: 0,
            transform: "translate(30px, 20px)",
            position: "absolute",
            right: "0",
            top: "10px",
            width: "200px",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "20px",
            padding: "16px",
            boxShadow: "0 8px 40px rgba(20,20,20,0.08)",
            animation: "float-y-reverse 6s ease-in-out infinite",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--accent)",
              animation: "pulse-dot 1.6s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}>
              Automations Running
            </span>
          </div>
          <div style={{
            fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
            fontSize: "13px",
            color: "var(--muted)",
            lineHeight: 1.5,
          }}>
            Workflows active across all connected systems.
          </div>
          <div style={{ marginTop: "12px", display: "flex", gap: "6px" }}>
            {["CRM", "Email", "Sheets"].map((t) => (
              <span key={t} style={{
                background: "var(--accent-light)",
                border: "1px solid var(--accent)",
                borderRadius: "9999px",
                padding: "2px 8px",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "9px",
                color: "var(--accent)",
                fontWeight: 500,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee row */}
      <div
        ref={marqueeRef}
        style={{
          opacity: 0,
          width: "100%",
          overflow: "hidden",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "18px 0",
          marginTop: "64px",
          background: "var(--bg)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "48px",
            whiteSpace: "nowrap",
            animation: "marquee-scroll 18s linear infinite",
            width: "max-content",
          }}
        >
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: w === "•" ? "sans-serif" : "var(--ff-display, 'Anton', sans-serif)",
                fontSize: w === "•" ? "14px" : "15px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: w === "•" ? "var(--accent)" : "var(--muted)",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* TRUSTED BY strip */}
      <div
        ref={toolsRef}
        style={{
          opacity: 0,
          transform: "translateY(16px)",
          width: "100%",
          padding: "36px 0 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          TRUSTED BY INNOVATIVE TEAMS
        </span>

        {/* Infinite Logo Marquee - 6 neutral placeholder pill boxes (greyscale) */}
        {/* TODO: replace with real client logos */}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              width: "max-content",
              animation: "marquee-scroll 24s linear infinite",
            }}
          >
            {/* Duplicated 6 neutral placeholders */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  boxShadow: "0 2px 8px rgba(20,20,20,0.02)",
                  color: "var(--muted)",
                  minWidth: "140px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "2px",
                    background: "rgba(20,20,20,0.25)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(20,20,20,0.55)",
                  }}
                >
                  Client logo
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
