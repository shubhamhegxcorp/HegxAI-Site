"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBar, Button, LimeTag } from "@/components/ui/shared";
import { useBooking } from "@/components/ui/BookingProvider";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { openBooking, preloadBooking, bookingUrl } = useBooking();
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
              start: () => window.innerWidth < 768 ? "top 95%" : "top 80%",
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
                start: () => window.innerWidth < 768 ? "top 95%" : "top 80%",
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
                start: () => window.innerWidth < 768 ? "top 95%" : "top 82%",
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
              start: () => window.innerWidth < 768 ? "top 95%" : "top 88%",
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
              start: () => window.innerWidth < 768 ? "top 95%" : "top 75%",
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
              start: () => window.innerWidth < 768 ? "top 95%" : "top 75%",
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
              start: () => window.innerWidth < 768 ? "top 95%" : "top 75%",
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
              start: () => window.innerWidth < 768 ? "top 95%" : "top 80%",
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
        padding: "var(--section-py, 96px) 0",
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
            marginBottom: "64px",
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
        {/* ─── 1. SECTION BAR: black #0f0f0f, height 34px, inset 24px from both column lines, with top line + nodes ─── */}
        <SectionBar
          label="ABOUT US"
          sectionId="about"
          inset={24}
          height={34}
          padding="0 12px"
          marginBottom={16}
        />

        {/* ─── 3. CONTENT AREA (Height 632px starting at horizontal line, absolute coordinate grid desktop) ─── */}
        <div className="about-content-area">
          {/* ─── a) LIME TAG: size 102x144, bg #d7fd41, sans 14px BOOK / AUDIT ─── */}
          <LimeTag
            tagRef={tagRef}
            href={bookingUrl || "#contact"}
            onClick={(e) => {
              if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                openBooking();
              }
            }}
            onPointerEnter={preloadBooking}
            onFocus={preloadBooking}
          />

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
              href={bookingUrl || "#contact"}
              variant="primary"
              style={{
                height: "50px",
                padding: "0 28px",
                display: "inline-flex",
                alignItems: "center",
              }}
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

          {/* ─── e) TWO TEXT COLUMNS (bottom right): col 1 @ x=938px (71.1%), col 2 @ x=1119px (84.8%), top 391px, height 217px ─── */}
          <div className="about-cols-wrap">
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
                    fontSize: "16px",
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
                    fontSize: "15px",
                    lineHeight: 1.55,
                    color: "#6f6c64",
                    maxWidth: "260px",
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
                    fontSize: "16px",
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
                    fontSize: "15px",
                    lineHeight: 1.55,
                    color: "#6f6c64",
                    maxWidth: "260px",
                    margin: 0,
                  }}
                >
                  From audit to custom agents and integrations, every system is mapped, tested and connected to your stack.
                </p>
              </div>
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
        .about-headline-wrap h2 { text-wrap: balance; }
        .headline-reveal-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.14em;
          margin-bottom: -0.14em;
        }
        .headline-reveal-line {
          display: inline-block;
          will-change: transform;
        }

        /* Below 1024px: Stack everything cleanly without absolute positioning */
        @media (max-width: 1199px) {
          .about-content-area {
            position: relative !important;
            height: auto !important;
            padding: 24px 16px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          .about-lime-tag {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 102px !important;
            height: 144px !important;
            align-self: flex-start !important;
          }
          .about-headline-wrap {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .about-headline-wrap h2 {
            font-size: 34px !important;
            line-height: 1 !important;
            letter-spacing: -0.03em !important;
          }
          .about-founder-wrap {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            align-self: flex-start !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .about-cta-wrap {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
          }
          .about-cta-wrap a {
            width: 100% !important;
            justify-content: center !important;
            min-height: 52px !important;
          }
          .about-cols-wrap {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
            width: 100% !important;
          }
          @media (min-width: 400px) {
            .about-cols-wrap {
              flex-direction: row !important;
              gap: 24px !important;
            }
            .about-col-1, .about-col-2 {
              flex: 1 !important;
            }
          }
          .about-col-1, .about-col-2 {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            min-height: 140px !important;
          }
        }
      `}</style>
    </section>
  );
}
