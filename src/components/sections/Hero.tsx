"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroWorkflowCard from "./HeroWorkflowCard";
import { Button } from "@/components/ui/shared";
import { useBooking } from "@/components/ui/BookingProvider";
import Marquee from "@/components/ui/Marquee";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

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

export default function Hero() {
  const { openBooking, preloadBooking, bookingUrl } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLDivElement>(null);
  const headlineLine2Ref = useRef<HTMLDivElement>(null);
  const limeBoxRef = useRef<HTMLSpanElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);

  // Dashed connector SVG refs
  const connectorPathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const leftNodeRef = useRef<SVGRectElement>(null);
  const rightNodeRef = useRef<SVGRectElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        if (limeBoxRef.current) limeBoxRef.current.style.clipPath = "inset(0 0% 0 0)";
        if (maskPathRef.current) maskPathRef.current.style.strokeDashoffset = "0";
        return;
      }

      // 1. Text entrance & Lime box clip-path reveal
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        headlineLine1Ref.current,
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out", clearProps: "transform" }
      )
        .fromTo(
          headlineLine2Ref.current,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out", clearProps: "transform" },
          "-=0.7"
        )
        .to(
          limeBoxRef.current,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .fromTo(
          dashRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ctaWrapRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          [leftNodeRef.current, rightNodeRef.current],
          { scale: 0, transformOrigin: "center center" },
          { scale: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.1 },
          "-=0.5"
        );

      // 2. Dashed connector line progressive reveal using mask
      if (maskPathRef.current) {
        gsap.fromTo(
          maskPathRef.current,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.8,
            delay: 0.4,
            ease: "power2.inOut",
          }
        );
      }
    },
    { scope: sectionRef }
  );

  // 6. Connector lime dot traveling along the path (gsap.ticker, paused when offscreen)
  useEffect(() => {
    const path = connectorPathRef.current;
    const dot = dotRef.current;
    const hero = sectionRef.current;
    if (!path || !dot || !hero) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let totalLength = 0;
    try {
      totalLength = path.getTotalLength();
    } catch {
      return;
    }
    if (totalLength <= 0) return;

    let isVisible = false;
    let loopProgress = 0;
    const loopDuration = 12; // 12-second full traversal loop

    const tickHandler = (_time: number, deltaTime: number) => {
      if (!isVisible) return;
      loopProgress += deltaTime / 1000 / loopDuration;
      if (loopProgress > 1) loopProgress -= 1;

      const currentDistance = loopProgress * totalLength;
      const pt = path.getPointAtLength(currentDistance);
      dot.setAttribute("cx", pt.x.toString());
      dot.setAttribute("cy", pt.y.toString());
    };

    gsap.ticker.add(tickHandler);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    observer.observe(hero);

    return () => {
      gsap.ticker.remove(tickHandler);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      ref={sectionRef}
      style={{
        display: "block",
        minHeight: "100svh",
        paddingTop: "calc(var(--header-h, 92px) + var(--hero-pt-gap, 72px))",
        paddingBottom: 0,
        background: "var(--bg, #F4EFE6)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* ─── FULL-WIDTH HERO WRAPPER (No column vertical lines) ─── */}
      <div
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* ─── 3. DASHED CONNECTOR SVG (Wraps subtitle + CTA, does NOT cross headline/lime box) ─── */}
        <div
          style={{
            position: "absolute",
            top: "188px",
            left: 0,
            width: "100%",
            height: "220px",
            pointerEvents: "none",
            zIndex: 2,
          }}
          className="hidden min-[900px]:block"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 220"
            width="100%"
            height="100%"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <mask id="hero-connector-mask" maskUnits="userSpaceOnUse">
                <path
                  ref={maskPathRef}
                  d="M 40 10 L 280 10 C 360 10, 380 190, 460 190 L 740 190 C 820 190, 840 10, 920 10 L 1160 10"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="8"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={1}
                />
              </mask>
            </defs>

            {/* Left 10px square node at x=40, y=10 */}
            <rect
              ref={leftNodeRef}
              x="35"
              y="5"
              width="10"
              height="10"
              fill="var(--ink)"
            />

            {/* Right 10px square node at x=1160, y=10 */}
            <rect
              ref={rightNodeRef}
              x="1155"
              y="5"
              width="10"
              height="10"
              fill="var(--ink)"
            />

            {/* Dashed connector path revealed through mask */}
            <path
              ref={connectorPathRef}
              d="M 40 10 L 280 10 C 360 10, 380 190, 460 190 L 740 190 C 820 190, 840 10, 920 10 L 1160 10"
              fill="none"
              stroke="rgba(20, 20, 20, 0.55)"
              strokeWidth="1"
              strokeDasharray="6 8"
              mask="url(#hero-connector-mask)"
            />

            {/* Traveling 6px lime dot */}
            <circle
              ref={dotRef}
              cx="40"
              cy="10"
              r="3"
              fill="#d7fd41"
              stroke="var(--ink)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* ─── 1. HEADLINE (Single H1, 2 lines, Inter Tight 500, tight lime box on AUTOMATED.) ─── */}
        <h1
          id="hero-title"
          className="hero-headline-h1"
          style={{
            fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
            fontSize: "clamp(40px, 12.5vw, 88px)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            textTransform: "uppercase",
            color: "var(--ink)",
            margin: 0,
            position: "relative",
            zIndex: 10,
          }}
        >
          <span style={{ display: "block", overflow: "hidden", marginBottom: "4px" }}>
            <span
              ref={headlineLine1Ref}
              style={{ display: "block" }}
            >
              EVERY TASK.
            </span>
          </span>

          <span style={{ display: "block", overflow: "hidden" }}>
            <span
              ref={headlineLine2Ref}
              style={{ display: "block" }}
            >
              {/* Tight lime box with 4 tiny 6px ink squares on corners */}
              <span
                ref={limeBoxRef}
                style={{
                  background: "#d7fd41",
                  color: "#141414",
                  padding: "0 0.12em",
                  display: "inline-block",
                  position: "relative",
                  whiteSpace: "nowrap",
                  clipPath: "inset(0 100% 0 0)",
                  willChange: "clip-path",
                }}
              >
                AUTOMATED.
                {/* 4 tiny 6px ink squares on box corners */}
                <span
                  style={{
                    position: "absolute",
                    top: "-3px",
                    left: "-3px",
                    width: "6px",
                    height: "6px",
                    background: "var(--ink)",
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    position: "absolute",
                    top: "-3px",
                    right: "-3px",
                    width: "6px",
                    height: "6px",
                    background: "var(--ink)",
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "-3px",
                    left: "-3px",
                    width: "6px",
                    height: "6px",
                    background: "var(--ink)",
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "-3px",
                    right: "-3px",
                    width: "6px",
                    height: "6px",
                    background: "var(--ink)",
                  }}
                  aria-hidden="true"
                />
              </span>
            </span>
          </span>
        </h1>

        {/* ─── 2. THIN INK DASH & SUBTITLE (Gap: 24px -> dash -> 20px -> sub -> 36px -> CTA) ─── */}
        <div
          ref={dashRef}
          style={{
            width: "24px",
            height: "1.5px",
            background: "var(--ink)",
            margin: "24px auto 20px",
            opacity: 0,
          }}
        />

        <p
          ref={subRef}
          style={{
            fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
            fontSize: "15px",
            color: "#5f5b52",
            maxWidth: "300px",
            margin: "0 auto 36px",
            lineHeight: 1.55,
            opacity: 0,
          }}
        >
          {siteContent.hero.subtitle}
        </p>

        {/* ─── 3. CTA WITH CORNER BRACKETS ─── */}
        <div
          ref={ctaWrapRef}
          className="hero-cta-wrapper"
          style={{
            position: "relative",
            zIndex: 10,
            marginBottom: "64px",
            opacity: 0,
            overflow: "hidden",
            display: "inline-block",
            padding: "4px",
            width: "100%",
            maxWidth: "320px",
          }}
        >
          <Button
            href={bookingUrl || "#contact"}
            variant="primary"
            brackets={true}
            style={{ width: "100%", justifyContent: "center" }}
            onClick={(e) => {
              if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                openBooking();
              }
            }}
            onPointerEnter={preloadBooking}
            onFocus={preloadBooking}
          >
            Book a free audit
          </Button>
        </div>

        {/* ─── 5. TWO THIN HORIZONTAL LINES WITH MONO LABELS ─── */}
        <div style={{ width: "100%", position: "relative", zIndex: 3 }}>
          {/* Top Line 1 (1px ink at 25%) with 10px square nodes at both ends */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "1px",
              background: "rgba(20,20,20,0.25)",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "-4.5px",
                width: "10px",
                height: "10px",
                background: "var(--ink)",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: 0,
                top: "-4.5px",
                width: "10px",
                height: "10px",
                background: "var(--ink)",
              }}
            />
          </div>

          {/* Strip between lines */}
          <div
            className="hero-strip-bar"
            style={{
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "#5f5b52",
                textTransform: "uppercase",
              }}
            >
              RELIABLE — SCALABLE — MEASURABLE
            </span>
            <span
              className="hero-strip-item-2"
              style={{
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "#5f5b52",
                textTransform: "uppercase",
              }}
            >
              BUILT FOR OPERATORS
            </span>
          </div>

          {/* Bottom Line 2 (1px ink at 25%) with 10px square nodes at both ends */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "1px",
              background: "rgba(20,20,20,0.25)",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "-4.5px",
                width: "10px",
                height: "10px",
                background: "var(--ink)",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: 0,
                top: "-4.5px",
                width: "10px",
                height: "10px",
                background: "var(--ink)",
              }}
            />
          </div>
        </div>

        {/* ─── 6. LIVE WORKFLOW DASHBOARD CARD ─── */}
        <HeroWorkflowCard />

        {/* ─── 8. BIG CROSSHAIR (+) MARK (1px ink, 90px) CENTERED BELOW PANEL ─── */}
        <div
          className="hero-crosshair"
          style={{
            position: "relative",
            width: "90px",
            height: "90px",
            margin: "36px auto 44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          {/* Horizontal arm */}
          <div
            style={{
              position: "absolute",
              width: "90px",
              height: "1px",
              background: "rgba(20,20,20,0.4)",
            }}
          />
          {/* Vertical arm */}
          <div
            style={{
              position: "absolute",
              width: "1px",
              height: "90px",
              background: "rgba(20,20,20,0.4)",
            }}
          />
        </div>

        {/* ─── 5. STATIC HALFTONE BAND (Dots 3px, spacing 9px, two soft arch shapes with ink at 38% opacity, fading at top, with 8 small glyphs) ─── */}
        <div
          aria-hidden="true"
          className="hero-halftone-band"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "240px",
            pointerEvents: "none",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 35%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 35%, transparent 100%)",
            zIndex: 1,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 240"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <defs>
              <pattern id="hero-halftone-pattern" width="9" height="9" patternUnits="userSpaceOnUse">
                <circle cx="4.5" cy="4.5" r="1.5" fill="#141414" opacity="0.4" />
              </pattern>
            </defs>
            {/* Left large arch/blob shape flanking dashboard */}
            <path
              d="M -40 240 L -40 70 C 80 50, 240 40, 360 90 C 470 130, 500 180, 520 240 Z"
              fill="url(#hero-halftone-pattern)"
            />
            {/* Right large arch/blob shape flanking dashboard */}
            <path
              d="M 920 240 C 940 180, 970 130, 1080 90 C 1200 40, 1360 50, 1480 70 L 1480 240 Z"
              fill="url(#hero-halftone-pattern)"
            />
            {/* Scattered glyph characters like Avande */}
            <text x="120" y="115" fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)" fontSize="11" fill="rgba(20,20,20,0.7)" fontWeight="600">?</text>
            <text x="260" y="90" fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)" fontSize="11" fill="rgba(20,20,20,0.7)" fontWeight="600">@</text>
            <text x="380" y="155" fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)" fontSize="11" fill="rgba(20,20,20,0.7)" fontWeight="600">?</text>
            <text x="180" y="175" fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)" fontSize="11" fill="rgba(20,20,20,0.7)" fontWeight="600">@</text>
            <text x="1060" y="155" fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)" fontSize="11" fill="rgba(20,20,20,0.7)" fontWeight="600">@</text>
            <text x="1180" y="90" fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)" fontSize="11" fill="rgba(20,20,20,0.7)" fontWeight="600">?</text>
            <text x="1320" y="115" fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)" fontSize="11" fill="rgba(20,20,20,0.7)" fontWeight="600">@</text>
            <text x="1260" y="175" fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)" fontSize="11" fill="rgba(20,20,20,0.7)" fontWeight="600">?</text>
          </svg>
        </div>
      </div>

      {/* ─── 6. MARQUEE STRIP UNDER HERO (11px mono, 40% opacity) ─── */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "16px 0",
          overflow: "hidden",
          background: "var(--bg)",
          position: "relative",
          zIndex: 4,
        }}
      >
        <Marquee speed={0.8} gap={48}>
          {MARQUEE_WORDS.map((word, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: word === "•" ? "var(--accent)" : "var(--ink)",
                opacity: 0.7,
              }}
            >
              {word}
            </span>
          ))}
        </Marquee>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .hero-headline-h1 {
            font-size: clamp(40px, 12.5vw, 56px) !important;
          }
        }
        @media (max-width: 767px) {
          .hero-strip-bar {
            flex-direction: column !important;
            height: auto !important;
            padding: 8px 12px !important;
            gap: 4px !important;
            text-align: center !important;
            justify-content: center !important;
          }
          .hero-halftone-band {
            height: 120px !important;
          }
          .hero-crosshair {
            margin: 16px auto 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
