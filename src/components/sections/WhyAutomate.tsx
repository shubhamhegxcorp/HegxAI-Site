"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";
import { SectionBar, SectionColumn } from "@/components/ui/shared";

gsap.registerPlugin(ScrollTrigger);

const WHY_ITEMS = [
  {
    phrase: "LESS MANUAL WORK",
    copy: "Remove the repetitive, error-prone tasks that consume your team's time. Free them to focus on the work that actually moves the business forward.",
  },
  {
    phrase: "FEWER ERRORS",
    copy: "Automation follows rules precisely, every time. Eliminate data entry mistakes, missed steps, and inconsistent handoffs between tools and people.",
  },
  {
    phrase: "FASTER TEAMS",
    copy: "When processes run automatically, decisions happen in real-time. Your team acts faster, responds sooner, and closes more with less effort.",
  },
];

export default function WhyAutomate() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Headline entrance
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // The 3 big words reveal line by line with a mask (y 110% -> 0, stagger 0.1),
      // and a thin line under each draws (scaleX 0 -> 1, origin left)
      if (gridRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          ".why-phrase",
          { y: "110%" },
          {
            y: "0%",
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
          }
        )
          .fromTo(
            ".why-line",
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left",
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            },
            "-=0.7"
          )
          .fromTo(
            ".why-copy",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
            },
            "-=0.6"
          );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="why"
      ref={sectionRef}
      style={{
        background: "var(--ink)",
        padding: "0 0 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ─── DARK ASCII HALFTONE MATRIX BACKGROUND ─── */}
      <AsciiHalftoneCanvas theme="dark" density="normal" interactive={true} />

      <SectionColumn style={{ borderLeftColor: "rgba(255,255,255,0.12)", borderRightColor: "rgba(255,255,255,0.12)", padding: "0 24px" }}>
        <SectionBar label="WHY AUTOMATE" num="003" theme="dark" />

        <div style={{ padding: "48px 0 0" }}>
          {/* Headline */}
          <div ref={headlineRef} style={{ marginBottom: "64px" }}>
            <h2
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "clamp(32px, 3.6vw, 56px)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
                color: "#fff",
                maxWidth: "680px",
              }}
            >
              Businesses replacing repetitive workflows with AI — and the fastest teams are already ahead.
            </h2>
          </div>

          {/* Three big items */}
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {WHY_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "48px 32px",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                {/* Masked big word */}
                <div style={{ overflow: "hidden", marginBottom: "16px" }}>
                  <div
                    className="why-phrase"
                    style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "clamp(32px, 3.6vw, 56px)",
                      fontWeight: 500,
                      lineHeight: 0.92,
                      textTransform: "uppercase",
                      letterSpacing: "-0.04em",
                      color: "#fff",
                      transform: "translateY(110%)",
                    }}
                  >
                    {item.phrase}
                  </div>
                </div>

              {/* Drawing thin line */}
              <div
                className="why-line"
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.12)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  marginBottom: "24px",
                }}
              />

              <p
                className="why-copy"
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {item.copy}
              </p>
            </div>
          ))}
        </div>

        {/* CTA with Avande chamfer tag */}
        <div style={{ marginTop: "64px", display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            className="chamfer-tag"
            style={{
              background: "#d7fd41",
              color: "#141414",
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
              boxShadow: "0 6px 24px rgba(215, 253, 65, 0.4)",
              padding: "18px 24px",
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "100px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "10px", lineHeight: 1 }}>■</span>
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                BOOK A CALL
              </span>
            </div>
            <div style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "3px", textAlign: "right" }}>
              ›››
            </div>
          </div>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 36px",
              borderRadius: "9999px",
              background: "#ffffff",
              color: "var(--ink)",
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Schedule Consultation →
          </a>
        </div>
        </div>
      </SectionColumn>
    </section>
  );
}
