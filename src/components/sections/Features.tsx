"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/shared";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    tag: "AI AGENT",
    title: "Deploy an AI Agent in hours, not months",
    body: "Configure intelligent agents that handle repetitive tasks, answer customer queries, qualify leads, and escalate edge cases — all without human intervention.",
    agentType: "Customer Support Agent",
    tasks: ["Respond to FAQs", "Route complex tickets", "Log to CRM"],
    status: "ACTIVE",
  },
  {
    tag: "WORKFLOW",
    title: "Automate multi-step workflows end to end",
    body: "Connect your tools into seamless pipelines. From inbound lead to closed deal — every step can be mapped, automated, and monitored in real-time.",
    agentType: "Sales Pipeline Workflow",
    tasks: ["Enrich lead data", "Schedule outreach", "Update Sheets"],
    status: "ACTIVE",
  },
  {
    tag: "INTEGRATION",
    title: "One source of truth, zero data entry",
    body: "Sync data across your stack automatically. No more copy-pasting between tools — every system stays in sync without manual effort.",
    agentType: "Data Sync Integration",
    tasks: ["Bi-directional sync", "Conflict resolution", "Audit trail"],
    status: "ACTIVE",
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const goTo = (idx: number) => {
    if (!cardRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setActive(idx);
      return;
    }
    gsap.to(cardRef.current, {
      opacity: 0, x: 20, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
        );
      }
    });
  };

  const f = FEATURES[active];

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px 120px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        opacity: 0,
      }}
    >
      {/* Background ASCII Halftone Matrix */}
      <AsciiHalftoneCanvas theme="light" density="sparse" interactive={true} />

      <SectionLabel label="THE FEATURES" number="002" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: "48px",
          marginTop: "56px",
          alignItems: "start",
        }}
      >
        {/* Left: agent card mockup */}
        <div
          ref={cardRef}
          style={{
            background: "var(--ink)",
            borderRadius: "28px",
            padding: "40px",
            minHeight: "440px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Background grid dots */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
              pointerEvents: "none",
            }}
          />

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", position: "relative" }}>
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}>
              DEPLOY AN AI AGENT
            </span>
            <div style={{
              background: "var(--accent)",
              borderRadius: "9999px",
              padding: "3px 10px",
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "10px",
              color: "var(--ink)",
              fontWeight: 500,
              letterSpacing: "0.06em",
            }}>
              {f.status}
            </div>
          </div>

          {/* Orbiting circles */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <div style={{ position: "relative", width: "120px", height: "120px" }}>
              {/* Center circle */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(232,162,92,0.4)",
                zIndex: 2,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.8 8.2H20L14.8 11.8L16.6 18L12 14.4L7.4 18L9.2 11.8L4 8.2H10.2L12 2Z" fill="var(--ink)" />
                </svg>
              </div>

              {/* Orbital ring */}
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px dashed rgba(255,255,255,0.1)",
              }} />

              {/* Orbiting mini avatars */}
              {[
                { left: "100px", top: "48px", bg: "hsl(30, 60%, 65%)" },
                { left: "22px", top: "93px", bg: "hsl(70, 60%, 65%)" },
                { left: "22px", top: "3px", bg: "hsl(110, 60%, 65%)" },
              ].map((avatar, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: avatar.left,
                    top: avatar.top,
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: avatar.bg,
                    border: "2px solid var(--ink)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Agent info */}
          <div style={{ position: "relative" }}>
            <div style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "22px",
              fontWeight: 500,
              color: "#fff",
              marginBottom: "8px",
            }}>
              {f.agentType}
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              {f.tasks.map((task) => (
                <span key={task} style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "9999px",
                  padding: "4px 10px",
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}>
                  {task}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px 24px",
                width: "100%",
                borderRadius: "14px",
                background: "var(--lime)",
                color: "var(--ink)",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.25s var(--ease-out)",
                boxShadow: "0 4px 20px var(--lime-glow)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 28px var(--lime-glow)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px var(--lime-glow)";
              }}
            >
              Deploy Agent ››
            </a>
          </div>
        </div>

        {/* Right: Feature copy + navigation */}
        <div style={{ paddingTop: "12px" }}>
          <span style={{
            display: "inline-block",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "9999px",
            padding: "5px 14px",
            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "20px",
          }}>
            {f.tag}
          </span>

          <h2
            style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "clamp(24px, 2.5vw, 36px)",
              fontWeight: 500,
              lineHeight: 1.2,
              color: "var(--ink)",
              marginBottom: "20px",
            }}
          >
            {f.title}
          </h2>

          <p
            style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "var(--muted)",
              marginBottom: "40px",
            }}
          >
            {f.body}
          </p>

          {/* Pager */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--muted)",
            }}>
              ▶ NEXT FEATURE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => goTo((active - 1 + FEATURES.length) % FEATURES.length)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "sans-serif",
                  fontSize: "14px",
                  color: "var(--muted)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bg)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--muted)"; }}
                aria-label="Previous feature"
              >
                ‹
              </button>
              <span style={{
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "12px",
                color: "var(--muted)",
                letterSpacing: "0.08em",
              }}>
                0{active + 1} / 0{FEATURES.length}
              </span>
              <button
                onClick={() => goTo((active + 1) % FEATURES.length)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "sans-serif",
                  fontSize: "14px",
                  color: "var(--muted)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bg)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--muted)"; }}
                aria-label="Next feature"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee word strip */}
      <div
        style={{
          marginTop: "80px",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <div style={{
            display: "flex",
            gap: "60px",
            animation: "marquee-scroll 25s linear infinite",
            width: "max-content",
          }}>
            {Array(8).fill("INTELLIGENT AUTOMATION").map((w, i) => (
              <span key={i} style={{
                fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                fontSize: "clamp(40px, 5vw, 72px)",
                fontWeight: 400,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? "var(--ink)" : "var(--line)",
                whiteSpace: "nowrap",
              }}>
                {w}
              </span>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          style={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            borderRadius: "9999px",
            background: "var(--ink)",
            color: "var(--bg)",
            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            marginLeft: "32px",
            transition: "all 0.3s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#2a2a2a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Get Started →
        </a>
      </div>
    </section>
  );
}
