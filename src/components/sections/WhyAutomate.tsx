"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionBar, SectionColumn, Button, LimeTag } from "@/components/ui/shared";
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
        padding: "var(--section-py, 96px) 0",
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

        <div className="why-content-wrap" style={{ paddingTop: "var(--heading-content-gap, 40px)" }}>
          {/* Header Row: Headline (left) + Right side empty so glyph texture shows at full strength */}
          <div
            className="why-header-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "end",
              marginBottom: "var(--heading-content-gap, 40px)",
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
            className="why-items-grid"
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
                className="why-item-col"
                style={{
                  padding: "48px 32px",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Masked big word (fixed 2-line title block min-height: 84px desktop, single line 28px mobile) */}
                <div className="why-title-wrap" style={{ overflow: "hidden", marginBottom: "16px", paddingBottom: "0.14em", minHeight: "84px", display: "flex", alignItems: "flex-end" }}>
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

          {/* Bottom CTAs: lime tag + secondary button */}
          <div className="why-ctas-wrap" style={{ marginTop: "64px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
            <LimeTag href="#contact" />

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

      <style>{`
        @media (max-width: 767px) {
          .why-content-wrap {
            padding-top: var(--heading-content-gap, 24px) !important;
          }
          .why-header-row {
            margin-bottom: var(--heading-content-gap, 24px) !important;
          }
          #why-title {
            font-size: 30px !important;
            line-height: 1.08 !important;
          }
          .why-items-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            border-top: 1px solid rgba(255,255,255,0.12) !important;
          }
          .why-item-col {
            padding: 20px 0 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.12) !important;
          }
          .why-title-wrap {
            min-height: auto !important;
            margin-bottom: 6px !important;
          }
          .why-phrase {
            font-size: 22px !important;
            white-space: nowrap !important;
            line-height: 1.1 !important;
          }
          .why-line {
            display: none !important;
          }
          .why-copy {
            font-size: 14px !important;
            line-height: 1.5 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            margin: 0 !important;
          }
          .why-ctas-wrap {
            margin-top: var(--heading-content-gap, 24px) !important;
            flex-direction: column !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .why-ctas-wrap a,
          .why-ctas-wrap button,
          .why-ctas-wrap .chamfer-tag {
            width: 100% !important;
            justify-content: center !important;
            min-height: 52px !important;
          }
        }
      `}</style>
    </section>
  );
}
