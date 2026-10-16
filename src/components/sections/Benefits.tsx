"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/shared";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    tag: "(strategy)",
    num: "01",
    title: "Audit",
    copy:
      "We map your current workflows, identify the biggest automation opportunities, and define the exact scope of what to build.",
  },
  {
    tag: "(development)",
    num: "02",
    title: "Build",
    copy:
      "We design and build your automation stack — AI agents, integrations, triggers — fully tested before going live.",
  },
  {
    tag: "(deployment)",
    num: "03",
    title: "Run",
    copy:
      "We deploy, monitor, and maintain your systems. Your team gets a full handoff with documentation so you own everything.",
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;

    gsap.fromTo(
      leftRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );

    // Stacked cards scroll effect
    if (!isMobile) {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Scale down earlier cards as later ones come in
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          end: "bottom 20%",
          onEnter: () => {
            if (i > 0) {
              cardsRef.current.slice(0, i).forEach((prev, pi) => {
                if (!prev) return;
                gsap.to(prev, {
                  scale: 0.97 - (i - pi - 1) * 0.02,
                  duration: 0.5,
                  ease: "power3.out",
                });
              });
            }
            gsap.fromTo(card,
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
            );
          },
        });
      });
    } else {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });
    }
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ASCII Halftone Matrix */}
      <AsciiHalftoneCanvas theme="light" density="sparse" interactive={true} />
      {/* Marquee above */}
      <div style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "20px 0",
        marginBottom: "0",
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex",
          gap: "60px",
          animation: "marquee-scroll 20s linear infinite",
          width: "max-content",
        }}>
          {Array(10).fill("SCALE YOUR TEAM").map((w, i) => (
            <span key={i} style={{
              fontFamily: "var(--ff-display, 'Anton', sans-serif)",
              fontSize: "clamp(32px, 4vw, 56px)",
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

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel label="BENEFITS" number="004" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            marginTop: "64px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "block",
              marginBottom: "20px",
            }}>
              Scale your team
            </span>

            <h2
              style={{
                fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                fontSize: "clamp(44px, 5vw, 72px)",
                fontWeight: 400,
                lineHeight: 0.95,
                textTransform: "uppercase",
                color: "var(--ink)",
                marginBottom: "28px",
                letterSpacing: "0.01em",
              }}
            >
              AUTOMATION THAT GROWS WITH YOU
            </h2>

            <p
              style={{
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "var(--muted)",
                marginBottom: "36px",
              }}
            >
              Every system we build is designed to scale alongside your team —
              whether you grow from five to fifty, or fifty to five hundred.
              No rework, no surprises.
            </p>

            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
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
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2a2a2a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get Started →
            </a>
          </div>

          {/* Right: stacked cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                style={{
                  background: i === 1 ? "var(--ink)" : "var(--surface)",
                  border: `1px solid ${i === 1 ? "rgba(255,255,255,0.06)" : "var(--line)"}`,
                  borderRadius: "24px",
                  padding: "28px 32px",
                  boxShadow: "0 4px 24px rgba(20,20,20,0.06)",
                  opacity: 0,
                  transformOrigin: "top center",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: i === 1 ? "var(--accent)" : "var(--muted)",
                  }}>
                    {card.tag}
                  </span>
                  <span style={{
                    fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                    fontSize: "48px",
                    fontWeight: 400,
                    lineHeight: 0.9,
                    color: i === 1 ? "rgba(255,255,255,0.1)" : "var(--line)",
                    letterSpacing: "0.02em",
                  }}>
                    {card.num}
                  </span>
                </div>
                <div style={{
                  fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                  fontSize: "32px",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: i === 1 ? "#fff" : "var(--ink)",
                  marginBottom: "12px",
                }}>
                  {card.title}
                </div>
                <p style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  color: i === 1 ? "rgba(255,255,255,0.5)" : "var(--muted)",
                }}>
                  {card.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
