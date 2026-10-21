"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBar, Button } from "@/components/ui/shared";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLAnchorElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const graySpanRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const col1LineRef = useRef<HTMLDivElement>(null);
  const col1NodeRef = useRef<HTMLDivElement>(null);
  const col1TextRef = useRef<HTMLDivElement>(null);
  const col2LineRef = useRef<HTMLDivElement>(null);
  const col2NodeRef = useRef<HTMLDivElement>(null);
  const col2TextRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Lime Tag entrance
      if (tagRef.current) {
        gsap.fromTo(
          tagRef.current,
          { x: -24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Chevrons stagger in
        const chevrons = tagRef.current.querySelectorAll(".chevron-arrow");
        if (chevrons.length > 0) {
          gsap.fromTo(
            chevrons,
            { x: -8, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: "power2.out",
              delay: 0.3,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 2. Headline line-by-line reveal & gray span color transition
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".headline-reveal-line");
        if (lines.length > 0) {
          gsap.fromTo(
            lines,
            { y: "110%" },
            {
              y: "0%",
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 82%",
                toggleActions: "play none none none",
              },
              onComplete: () => {
                if (graySpanRef.current) {
                  gsap.fromTo(
                    graySpanRef.current,
                    { color: "#e0ded6" },
                    { color: "#b3b1a9", duration: 0.6, ease: "power2.out" }
                  );
                }
              },
            }
          );
        }
      }

      // 3. CTA fade up
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Text Columns: lines scaleY from top, nodes scale, text fades up
      const lines = [col1LineRef.current, col2LineRef.current].filter(Boolean);
      const nodes = [col1NodeRef.current, col2NodeRef.current].filter(Boolean);
      const textBlocks = [col1TextRef.current, col2TextRef.current].filter(Boolean);

      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (nodes.length > 0) {
        gsap.fromTo(
          nodes,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (textBlocks.length > 0) {
        gsap.fromTo(
          textBlocks,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 5. Founder avatar (if present)
      if (founderRef.current) {
        gsap.fromTo(
          founderRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: founderRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      ref={sectionRef}
      style={{
        background: "var(--bg, #F4EFE6)",
        position: "relative",
        width: "100%",
        paddingBottom: "8px",
      }}
    >
      {/* ─── 5. TOP LOGO STRIP (rendered ONLY if logos array has items) ─── */}
      {siteContent.logos && siteContent.logos.length > 0 && (
        <div
          style={{
            height: "77px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "48px",
            opacity: 0.4,
            filter: "grayscale(100%)",
            borderBottom: "2px solid rgba(20,20,20,0.25)",
            padding: "0 24px",
          }}
        >
          {siteContent.logos.map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={logo.url}
              alt={logo.name}
              style={{ maxHeight: "24px", objectFit: "contain" }}
            />
          ))}
        </div>
      )}

      {/* ─── MAIN COLUMN WRAPPER (1320px wide, centered, 1px vertical lines at 25% ink) ─── */}
      <div
        style={{
          maxWidth: "1320px",
          width: "100%",
          margin: "0 auto",
          position: "relative",
          borderLeft: "1px solid rgba(20,20,20,0.25)",
          borderRight: "1px solid rgba(20,20,20,0.25)",
        }}
      >
        {/* ─── 1. SECTION BAR: black #0f0f0f, height 34px, inset 8px from both column lines ─── */}
        <SectionBar
          label="ABOUT US"
          sectionId="about"
          inset={8}
          height={34}
          padding="0 12px"
          marginBottom={8}
          showLine={false}
        />

        {/* ─── 2. 8px BELOW BAR: 1px full-viewport-width horizontal line (ink 25%) with 10px square nodes (#2b2b2b) at x=40px ─── */}
        <div
          style={{
            position: "relative",
            width: "100vw",
            left: "50%",
            transform: "translateX(-50%)",
            height: "1px",
            background: "rgba(20,20,20,0.25)",
          }}
        >
          {/* Left node (at x=40px from viewport edge) */}
          <span
            style={{
              position: "absolute",
              left: "40px",
              top: "-4.5px",
              width: "10px",
              height: "10px",
              background: "#2b2b2b",
            }}
          />
          {/* Right node (at x=40px from viewport edge) */}
          <span
            style={{
              position: "absolute",
              right: "40px",
              top: "-4.5px",
              width: "10px",
              height: "10px",
              background: "#2b2b2b",
            }}
          />
        </div>

        {/* ─── 3. CONTENT AREA (Height 632px starting at horizontal line, absolute coordinate grid desktop) ─── */}
        <div className="about-content-area">
          {/* ─── a) LIME TAG: left 24px, top 25px, size 102x144, bg #d7fd41, chamfer on bottom-left (~20px) ─── */}
          <a
            ref={tagRef}
            href="#contact"
            className="about-lime-tag"
            style={{
              background: "#d7fd41",
              color: "#141414",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {/* Top-left: 10px black square at (12px, 20px) inside tag */}
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "20px",
                width: "10px",
                height: "10px",
                background: "#000000",
              }}
            />

            {/* To its right: 3 thin chevrons ">>>" (1.5px stroke, 14px tall, spaced 8px) */}
            <div
              className="about-chevrons"
              style={{
                position: "absolute",
                left: "30px",
                top: "18px",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="chevron-arrow">
                <path d="M1.5 1.5L6.5 7L1.5 12.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="chevron-arrow">
                <path d="M1.5 1.5L6.5 7L1.5 12.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="chevron-arrow">
                <path d="M1.5 1.5L6.5 7L1.5 12.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Bottom-right text: 2 lines, Inter Tight 500 14px uppercase: "BOOK" / "AUDIT" */}
            <div
              style={{
                position: "absolute",
                right: "12px",
                bottom: "18px",
                textAlign: "right",
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: 1.15,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#000000",
              }}
            >
              BOOK
              <br />
              AUDIT
            </div>
          </a>

          {/* ─── b) HEADLINE: left 537px, top 25px, width 560px, Inter Tight 500, 52px, lh 0.92, ls -0.03em ─── */}
          <div ref={headlineRef} className="about-headline-wrap">
            <h2
              id="about-title"
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontWeight: 500,
                fontSize: "52px",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              <span className="headline-reveal-mask">
                <span className="headline-reveal-line" style={{ color: "#0f0f0f" }}>
                  Innovative automation
                </span>
              </span>
              <span className="headline-reveal-mask">
                <span className="headline-reveal-line" style={{ color: "#0f0f0f" }}>
                  agency building intelligent
                </span>
              </span>
              <span className="headline-reveal-mask">
                <span className="headline-reveal-line" style={{ color: "#0f0f0f" }}>
                  workflows powered by
                </span>
              </span>
              <span className="headline-reveal-mask">
                <span
                  ref={graySpanRef}
                  className="headline-reveal-line"
                  style={{ color: "#b3b1a9", transition: "color 0.4s ease" }}
                >
                  advanced AI for modern,
                </span>
              </span>
              <span className="headline-reveal-mask">
                <span
                  className="headline-reveal-line"
                  style={{ color: "#b3b1a9", transition: "color 0.4s ease" }}
                >
                  high-growth businesses.
                </span>
              </span>
            </h2>
          </div>

          {/* ─── c) FOUNDER (top-right): right 23px, top 25px, right-aligned (only if real data exists) ─── */}
          {siteContent.founder.name && siteContent.founder.photo && (
            <div ref={founderRef} className="about-founder-wrap">
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid rgba(20,20,20,0.15)",
                  background: "#e8c89c",
                  marginBottom: "12px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteContent.founder.photo}
                  alt={siteContent.founder.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontWeight: 500,
                  fontSize: "15px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  lineHeight: 1.2,
                }}
              >
                {siteContent.founder.name}
              </div>

              <div
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "12px",
                  color: "#6f6c64",
                  marginTop: "2px",
                }}
              >
                {siteContent.founder.role}
              </div>
            </div>
          )}

          {/* ─── d) CTA: left 537px, top 386px, Button variant primary height 50px ─── */}
          <div ref={ctaRef} className="about-cta-wrap">
            <Button
              href="#contact"
              variant="primary"
              style={{
                height: "50px",
                padding: "0 28px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Book a free audit
            </Button>
          </div>

          {/* ─── e) TWO TEXT COLUMNS (bottom right): col 1 @ x=938px (71.1%), col 2 @ x=1119px (84.8%), top 391px, height 217px ─── */}
          {/* Column 1 */}
          <div className="about-col-1">
            {/* 1px vertical line (ink 30%) on left edge */}
            <div
              ref={col1LineRef}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "1px",
                background: "rgba(20,20,20,0.3)",
              }}
            />
            {/* 10px square node (#2b2b2b) centered on line at top */}
            <div
              ref={col1NodeRef}
              style={{
                position: "absolute",
                left: "-4.5px",
                top: "-5px",
                width: "10px",
                height: "10px",
                background: "#2b2b2b",
                zIndex: 2,
              }}
            />
            {/* Content: padding-left 22px, padding-top 22px */}
            <div ref={col1TextRef} style={{ paddingLeft: "22px", paddingTop: "22px" }}>
              <div
                style={{
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#0f0f0f",
                  marginBottom: "8px",
                  lineHeight: 1.2,
                }}
              >
                What we build
              </div>
              <p
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#6f6c64",
                  maxWidth: "150px",
                  margin: 0,
                }}
              >
                Intelligent AI agents and workflow systems that remove repetitive work and keep your team moving.
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="about-col-2">
            {/* 1px vertical line (ink 30%) on left edge */}
            <div
              ref={col2LineRef}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "1px",
                background: "rgba(20,20,20,0.3)",
              }}
            />
            {/* 10px square node (#2b2b2b) centered on line at top */}
            <div
              ref={col2NodeRef}
              style={{
                position: "absolute",
                left: "-4.5px",
                top: "-5px",
                width: "10px",
                height: "10px",
                background: "#2b2b2b",
                zIndex: 2,
              }}
            />
            {/* Content: padding-left 22px, padding-top 22px */}
            <div ref={col2TextRef} style={{ paddingLeft: "22px", paddingTop: "22px" }}>
              <div
                style={{
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#0f0f0f",
                  marginBottom: "8px",
                  lineHeight: 1.2,
                }}
              >
                How we build
              </div>
              <p
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#6f6c64",
                  maxWidth: "150px",
                  margin: 0,
                }}
              >
                From audit to custom agents and integrations, every system is mapped, tested and connected to your stack.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 4. BOTTOM 1px LINE (at bottom of content area, y=632px) ─── */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(20,20,20,0.25)",
          }}
        />
      </div>

      {/* ─── SCOPED RESPONSIVE CSS & HOVER STYLES ─── */}
      <style>{`
        /* Desktop (>= 1200px) exact pixel layout */
        @media (min-width: 1200px) {
          .about-content-area {
            position: relative;
            height: 632px;
            width: 100%;
          }

          .about-lime-tag {
            position: absolute;
            left: 24px;
            top: 25px;
            width: 102px;
            height: 144px;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .about-lime-tag:hover {
            transform: translateX(4px);
          }
          .about-lime-tag:hover .about-chevrons {
            transform: translateX(4px);
          }
          .about-chevrons {
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .about-headline-wrap {
            position: absolute;
            left: 537px;
            top: 25px;
            width: 560px;
          }

          .about-founder-wrap {
            position: absolute;
            right: 23px;
            top: 25px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            text-align: right;
          }

          .about-cta-wrap {
            position: absolute;
            left: 537px;
            top: 386px;
          }

          .about-col-1 {
            position: absolute;
            left: 938px;
            top: 391px;
            width: 181px;
            height: 217px;
          }

          .about-col-2 {
            position: absolute;
            left: 1119px;
            top: 391px;
            width: 201px;
            height: 217px;
          }
        }

        /* Line reveal wrappers */
        .headline-reveal-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.12em;
          margin-bottom: -0.12em;
        }
        .headline-reveal-line {
          display: inline-block;
          will-change: transform;
        }

        /* Tablet (768px - 1199px) */
        @media (min-width: 768px) and (max-width: 1199px) {
          .about-content-area {
            position: relative;
            padding: 32px 24px 64px;
            display: flex;
            flex-direction: column;
            gap: 40px;
          }
          .about-lime-tag {
            width: 102px;
            height: 144px;
            display: inline-block;
            position: relative;
          }
          .about-headline-wrap {
            max-width: 680px;
            width: 100%;
          }
          .about-headline-wrap h2 {
            font-size: 42px !important;
          }
          .about-founder-wrap {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 16px;
          }
          .about-cta-wrap {
            margin-top: 12px;
          }
          .about-col-1, .about-col-2 {
            position: relative;
            min-height: 180px;
            flex: 1;
          }
          .about-cols-container {
            display: flex;
            gap: 32px;
            margin-top: 32px;
          }
        }

        /* Mobile (< 768px) */
        @media (max-width: 767px) {
          .about-content-area {
            padding: 32px 16px 48px;
            display: flex;
            flex-direction: column;
            gap: 32px;
          }
          .about-lime-tag {
            width: 102px;
            height: 144px;
            display: inline-block;
            position: relative;
          }
          .about-headline-wrap {
            width: 100%;
          }
          .about-headline-wrap h2 {
            font-size: 36px !important;
            line-height: 0.96 !important;
          }
          .about-cta-wrap {
            width: 100%;
          }
          .about-cta-wrap a {
            width: 100%;
            justify-content: center;
          }
          .about-col-1, .about-col-2 {
            position: relative;
            min-height: 160px;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
