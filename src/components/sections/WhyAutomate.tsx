"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionBar, SectionColumn, Button } from "@/components/ui/shared";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";

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

      // The 3 big stat phrases reveal
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
      aria-labelledby="why-title"
      ref={sectionRef}
      style={{
        background: "var(--ink)",
        padding: "128px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ─── FULL-BLEED ASCII HALFTONE CANVAS (THEME DARK, MASKED TO QUIET UNDER CONTENT) ─── */}
      <AsciiHalftoneCanvas
        theme="dark"
        density="normal"
        interactive={true}
        fontSize={11}
        color="rgba(255, 255, 255, 0.14)"
        accentColor="rgba(215, 253, 65, 0.22)"
        wrapperStyle={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          WebkitMaskImage: `linear-gradient(to bottom, #000 0px, #000 120px, transparent 180px, transparent calc(100% - 180px), #000 calc(100% - 120px), #000 100%), linear-gradient(to right, #000 0px, #000 calc(50% - 660px), rgba(0,0,0,0.3) calc(50% - 580px), rgba(0,0,0,0.3) calc(50% + 580px), #000 calc(50% + 660px), #000 100%)`,
          maskImage: `linear-gradient(to bottom, #000 0px, #000 120px, transparent 180px, transparent calc(100% - 180px), #000 calc(100% - 120px), #000 100%), linear-gradient(to right, #000 0px, #000 calc(50% - 660px), rgba(0,0,0,0.3) calc(50% - 580px), rgba(0,0,0,0.3) calc(50% + 580px), #000 calc(50% + 660px), #000 100%)`,
          WebkitMaskComposite: "source-over, destination-over",
          maskComposite: "add",
        }}
      />

      <SectionColumn
        style={{
          position: "relative",
          zIndex: 1,
          borderLeftColor: "rgba(255,255,255,0.12)",
          borderRightColor: "rgba(255,255,255,0.12)",
          padding: "0 var(--col-pad, 24px)",
        }}
      >
        <SectionBar label="WHY AUTOMATE" sectionId="why-automate" theme="dark" />

        <div style={{ padding: "48px 0 0" }}>
          {/* Header Row: Headline (left) + Right side empty so glyph texture shows at full strength */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "end",
              marginBottom: "64px",
            }}
          >
            {/* Left: Headline */}
            <div ref={headlineRef}>
              <h2
                id="why-title"
                style={{
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(32px, 3.6vw, 56px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.04,
                  color: "#ffffff",
                  maxWidth: "640px",
                }}
              >
                Businesses replacing repetitive workflows with AI — and the fastest teams are already ahead.
              </h2>
            </div>

            {/* Right: Empty space so the ASCII glyph texture shows at full strength */}
            <div aria-hidden="true" className="hidden md:block" />
          </div>

          {/* Three big items */}
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {WHY_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "48px 32px",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Masked big word (Inter Tight 500, uppercase, 40px, tracking -0.01em) */}
                <div style={{ overflow: "hidden", marginBottom: "16px", paddingBottom: "0.14em" }}>
                  <div
                    className="why-phrase"
                    style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "40px",
                      fontWeight: 500,
                      lineHeight: 1.04,
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                      color: "#ffffff",
                      transform: "translateY(110%)",
                      marginBottom: "16px",
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

                {/* Body text rgba(255,255,255,.72), 16px/1.6 */}
                <p
                  className="why-copy"
                  style={{
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  {item.copy}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTAs: lime square tag "BOOK A FREE AUDIT" + secondary button "See how it works" */}
          <div style={{ marginTop: "64px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            {/* Lime square chamfer tag */}
            <a
              href="#contact"
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
                minWidth: "160px",
                cursor: "pointer",
                textDecoration: "none",
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
                    lineHeight: 1.3,
                  }}
                >
                  BOOK A<br />FREE AUDIT
                </span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "3px", textAlign: "right" }}>
                ›››
              </div>
            </a>

            {/* Secondary square outline button in white */}
            <Button
              href="#process"
              variant="secondary"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "#ffffff" }}
            >
              See how it works
            </Button>
          </div>
        </div>
      </SectionColumn>
    </section>
  );
}
